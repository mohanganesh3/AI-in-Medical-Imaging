"use client";

import { useState, type ChangeEvent } from "react";
import { generateDiagnosisSuggestions } from "@/ai/flows/generate-diagnosis-suggestions";
import type { ScanResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import UploadPanel from "./upload-panel";
import ResultsPanel from "./results-panel";
import { BrainCircuit } from "lucide-react";

export default function ClarityScanApp() {
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = async (file: File) => {
    setIsLoading(true);
    setSelectedScan(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const photoDataUri = reader.result as string;
        const results = await generateDiagnosisSuggestions({ photoDataUri });
        const newScan: ScanResult = {
          id: new Date().toISOString(),
          originalImage: photoDataUri,
          results,
          timestamp: new Date(),
        };
        setScanHistory((prev) => [newScan, ...prev]);
        setSelectedScan(newScan);
      } catch (error) {
        console.error("AI analysis failed:", error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description:
            "There was an error processing the image. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = (error) => {
      console.error("File reading failed:", error);
      toast({
        variant: "destructive",
        title: "File Error",
        description: "Could not read the selected file. Please try again.",
      });
      setIsLoading(false);
    };
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      <header className="flex h-16 w-full items-center justify-between border-b px-4 md:hidden">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Clarity Scan</h1>
        </div>
      </header>

      <UploadPanel
        scanHistory={scanHistory}
        selectedScan={selectedScan}
        isLoading={isLoading}
        onFileChange={handleFileChange}
        onSelectScan={setSelectedScan}
      />

      <main className="flex-1 p-4 md:p-6">
        <ResultsPanel scanResult={selectedScan} isLoading={isLoading} />
      </main>
    </div>
  );
}
