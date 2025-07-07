// 'use server';

/**
 * @fileOverview AI-powered diagnostic suggestions flow for medical images.
 *
 * - generateDiagnosisSuggestions - A function that generates diagnostic suggestions for a medical image.
 * - GenerateDiagnosisSuggestionsInput - The input type for the generateDiagnosisSuggestions function.
 * - GenerateDiagnosisSuggestionsOutput - The return type for the generateDiagnosisSuggestions function.
 */

'use server';

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
  output: {schema: GenerateDiagnosisSuggestionsOutputSchema},
  prompt: `You are an AI assistant for radiologists. Analyze the medical image provided and generate diagnostic suggestions with confidence percentages.

Image: {{media url=photoDataUri}}

Provide the output in the following JSON format:
{
  "suggestions": [
    {
      "diagnosis": "Diagnosis suggestion 1",
      "confidence": 0.85,
      "abnormalityLocation": "Location of abnormality 1"
    },
    {
      "diagnosis": "Diagnosis suggestion 2",
      "confidence": 0.70,
      "abnormalityLocation": "Location of abnormality 2"
    }
  ]
}`,
});

const generateDiagnosisSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateDiagnosisSuggestionsFlow',
    inputSchema: GenerateDiagnosisSuggestionsInputSchema,
    outputSchema: GenerateDiagnosisSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await generateDiagnosisSuggestionsPrompt(input);
    return output!;
  }
);
