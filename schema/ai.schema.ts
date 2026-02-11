import { z } from 'zod';

export const EmiAffordabilityRequestSchema = z.object({
  principal: z.number().min(1000).max(50000000),
  tenureMonths: z.number().int().min(1).max(360),
  interestRateAnnual: z.number().min(0.1).max(50).optional(),
  accountId: z.string().uuid().optional(),
});

export const EmiAffordabilityAnalysisSchema = z.object({
  summary: z.string(),
  affordable: z.boolean(),
  recommendation: z.string(),
  maxSuggestedEmi: z.number().optional(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  hints: z.array(z.string()),
});

export type EmiAffordabilityRequestSchema = z.infer<typeof EmiAffordabilityRequestSchema>;
export type EmiAffordabilityAnalysisSchema = z.infer<typeof EmiAffordabilityAnalysisSchema>;
