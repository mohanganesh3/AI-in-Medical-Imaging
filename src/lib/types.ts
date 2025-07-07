import type { GenerateDiagnosisSuggestionsOutput } from "@/ai/flows/generate-diagnosis-suggestions";

export type DiagnosisSuggestion = GenerateDiagnosisSuggestionsOutput["suggestions"][0];

export type ScanResult = {
  id: string;
  originalImage: string;
  results: GenerateDiagnosisSuggestionsOutput;
  timestamp: Date;
};
