"use client";

import type { ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ScanResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BrainCircuit, History, UploadCloud, Loader2 } from "lucide-react";

interface UploadPanelProps {
  scanHistory: ScanResult[];
  selectedScan: ScanResult | null;
  isLoading: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectScan: (scan: ScanResult) => void;
}

export default function UploadPanel({
  scanHistory,
  selectedScan,
  isLoading,
  onFileChange,
  onSelectScan,
}: UploadPanelProps) {
  return (
    <aside className="flex w-full flex-col border-r bg-card/20 md:w-80 lg:w-96">
      <div className="hidden h-16 items-center border-b px-6 md:flex">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Clarity Scan</h1>
        </div>
      </div>

      <div className="p-4">
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={onFileChange}
          disabled={isLoading}
        />
        <Button
          asChild
          size="lg"
          className="w-full"
          disabled={isLoading}
          variant="default"
        >
          <label htmlFor="imageUpload" className="cursor-pointer">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Analyzing..." : "Upload New Scan"}
          </label>
        </Button>
      </div>
      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h2 className="mb-4 flex items-center text-lg font-semibold">
            <History className="mr-2 h-5 w-5" />
            Scan History
          </h2>
          {scanHistory.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No scans yet.
            </p>
          ) : (
            <div className="space-y-2">
              {scanHistory.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => onSelectScan(scan)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-muted",
                    selectedScan?.id === scan.id && "bg-primary/10"
                  )}
                  disabled={isLoading}
                >
                  <Image
                    src={scan.originalImage}
                    alt={`Scan from ${scan.timestamp.toLocaleTimeString()}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-md border object-cover"
                    data-ai-hint="medical x-ray"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate font-medium">
                      {scan.results.suggestions[0]?.diagnosis ?? "Normal"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {scan.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
