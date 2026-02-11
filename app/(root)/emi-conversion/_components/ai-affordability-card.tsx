'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { GOLD, MIN_ELIGIBLE_AMOUNT } from './constants';
import type { EmiAffordabilityAnalysisSchema } from '@/schema/ai.schema';

interface AiAffordabilityCardProps {
  loading: boolean;
  result: EmiAffordabilityAnalysisSchema | null;
  principal: number;
  onCheckAffordability: () => void;
  onRecheck: () => void;
}

export function AiAffordabilityCard({
  loading,
  result,
  principal,
  onCheckAffordability,
  onRecheck,
}: AiAffordabilityCardProps) {
  return (
    <Card
      className="border-2"
      style={{
        borderColor: result ? (result.affordable ? GOLD : '#666') : `${GOLD}33`,
        backgroundColor: result?.affordable ? `${GOLD}0d` : 'transparent',
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Sparkles className="h-5 w-5" style={{ color: GOLD }} />
          AI Affordability
        </CardTitle>
        <CardDescription>Check if this EMI fits your finances</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin" style={{ color: GOLD }} />
          </div>
        ) : result ? (
          <>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Verdict</span>
              <Badge
                className={result.affordable ? 'text-black' : ''}
                style={{ backgroundColor: result.affordable ? GOLD : '#666' }}
              >
                {result.affordable ? 'Affordable' : 'Caution'}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Risk</span>
              <span className="font-medium">{result.riskLevel}</span>
            </div>
            <p className="text-sm font-medium">Recommendation</p>
            <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            {result.maxSuggestedEmi != null && (
              <p className="text-xs text-muted-foreground">
                Suggested max EMI: PKR {result.maxSuggestedEmi.toLocaleString()}
              </p>
            )}
            <ul className="space-y-1">
              {result.hints.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                  {h}
                </li>
              ))}
            </ul>
            <Button variant="outline" size="sm" onClick={onRecheck} style={{ borderColor: GOLD }}>
              Re-check
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Use the calculator to set amount and tenure, then check affordability based on your account activity.
            </p>
            <Button
              className="w-full text-black hover:opacity-90"
              size="lg"
              style={{ backgroundColor: GOLD }}
              onClick={onCheckAffordability}
              disabled={principal < MIN_ELIGIBLE_AMOUNT}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Check affordability
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
