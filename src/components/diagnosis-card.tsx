"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "./ui/badge";
import type { DiagnosisSuggestion } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

interface DiagnosisCardProps {
  suggestion: DiagnosisSuggestion;
}

export default function DiagnosisCard({ suggestion }: DiagnosisCardProps) {
  const confidencePercent = Math.round(suggestion.confidence * 100);

  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          {suggestion.diagnosis}
        </CardTitle>
        <Badge variant={confidencePercent > 80 ? "default" : "secondary"} className="bg-accent text-accent-foreground">
          {confidencePercent}% Confidence
        </Badge>
      </CardHeader>
      <CardContent>
        <Progress value={confidencePercent} className="mb-4 h-2" />
        <div className="flex items-center text-sm text-muted-foreground">
          <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {suggestion.abnormalityLocation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
