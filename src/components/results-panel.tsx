"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ScanResult } from "@/lib/types";
import DiagnosisCard from "./diagnosis-card";
import { FileScan, BrainCircuit } from "lucide-react";

interface ResultsPanelProps {
  scanResult: ScanResult | null;
  isLoading: boolean;
}

const LoadingState = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analyzing...</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/30 p-12 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
      <FileScan className="h-8 w-8 text-primary" />
    </div>
    <h2 className="text-2xl font-semibold">Awaiting Scan</h2>
    <p className="mt-2 text-muted-foreground">
      Upload an X-ray or ultrasound image to begin the AI-powered analysis.
    </p>
  </div>
);

export default function ResultsPanel({
  scanResult,
  isLoading,
}: ResultsPanelProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!scanResult) {
    return <EmptyState />;
  }

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BrainCircuit className="h-6 w-6" /> Analysis Results
        </CardTitle>
        <span className="text-sm text-muted-foreground">
          {scanResult.timestamp.toLocaleString()}
        </span>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="relative aspect-square w-full max-w-full overflow-hidden rounded-lg border">
          <Image
            src={scanResult.originalImage}
            alt="Medical Scan"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            data-ai-hint="medical x-ray"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Diagnostic Suggestions</h3>
          {scanResult.results.suggestions.length > 0 ? (
            <div className="flex flex-col gap-4">
              {scanResult.results.suggestions.map((suggestion, index) => (
                <DiagnosisCard key={index} suggestion={suggestion} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No specific abnormalities were detected.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
