'use server';

/**
 * @fileOverview AI-powered diagnostic suggestions flow for medical images.
 *
 * - generateDiagnosisSuggestions - A function that generates diagnostic suggestions for a medical image.
 * - GenerateDiagnosisSuggestionsInput - The input type for the generateDiagnosisSuggestions function.
 * - GenerateDiagnosisSuggestionsOutput - The return type for the generateDiagnosisSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiagnosisSuggestionsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A medical image (X-ray, ultrasound) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateDiagnosisSuggestionsInput = z.infer<
  typeof GenerateDiagnosisSuggestionsInputSchema
>;

const DiagnosisSuggestionSchema = z.object({
  diagnosis: z.string().describe('The diagnostic suggestion.'),
  confidence: z.number().describe('The confidence level (0-1) for the suggestion.'),
  abnormalityLocation: z.string().describe('Description of the location of the abnormality.'),
});

const GenerateDiagnosisSuggestionsOutputSchema = z.object({
  suggestions: z.array(DiagnosisSuggestionSchema).describe('An array of diagnostic suggestions.'),
  heatmapImage: z.string().optional().describe("A data URI of the heatmap image highlighting abnormalities. Expected format: 'data:image/...;base64,<encoded_data>'."),
});
export type GenerateDiagnosisSuggestionsOutput = z.infer<
  typeof GenerateDiagnosisSuggestionsOutputSchema
>;

export async function generateDiagnosisSuggestions(
  input: GenerateDiagnosisSuggestionsInput
): Promise<GenerateDiagnosisSuggestionsOutput> {
  return generateDiagnosisSuggestionsFlow(input);
}

const generateDiagnosisSuggestionsPrompt = ai.definePrompt({
  name: 'generateDiagnosisSuggestionsPrompt',
  input: {schema: GenerateDiagnosisSuggestionsInputSchema},
  output: {schema: z.object({suggestions: z.array(DiagnosisSuggestionSchema)})},
  prompt: `You are an AI assistant for radiologists. Analyze the medical image provided and generate diagnostic suggestions. If no abnormalities are found, return an empty suggestions array.

Image: {{media url=photoDataUri}}`,
});

const generateDiagnosisSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateDiagnosisSuggestionsFlow',
    inputSchema: GenerateDiagnosisSuggestionsInputSchema,
    outputSchema: GenerateDiagnosisSuggestionsOutputSchema,
  },
  async input => {
    const {output: diagnosisOutput} = await generateDiagnosisSuggestionsPrompt(input);
    
    if (!diagnosisOutput || diagnosisOutput.suggestions.length === 0) {
      return {suggestions: []};
    }

    const abnormalities = diagnosisOutput.suggestions
      .map(s => `${s.diagnosis} at ${s.abnormalityLocation}`)
      .join(', ');

    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: [
          {media: {url: input.photoDataUri}},
          {
            text: `Based on the provided medical image, create a new image that acts as a heatmap highlighting the areas related to these findings: ${abnormalities}. You MUST use a multi-color transparent overlay. Each distinct abnormality or area of concern should be highlighted with a different, vibrant color to be easily distinguishable. For example, you could use colors like yellow, orange, and red to signify areas of increasing concern. The original image must be clearly visible underneath the transparent heatmap overlay.`,
          },
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      return {
        suggestions: diagnosisOutput.suggestions,
        heatmapImage: media?.url,
      };
    } catch (error) {
      console.error('Heatmap generation failed:', error);
      // If heatmap fails, return suggestions only.
      return {
        suggestions: diagnosisOutput.suggestions,
      };
    }
  }
);
