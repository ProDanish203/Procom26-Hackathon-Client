import type { EmiPlanSchema, EmiInstallmentSchema } from '@/schema/emi.schema';
import type { EmiAffordabilityAnalysisSchema } from '@/schema/ai.schema';
import type { AccountSchema } from '@/schema/account.schema';

export interface CandidateTransaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  eligible: boolean;
}

export type { EmiPlanSchema, EmiInstallmentSchema, EmiAffordabilityAnalysisSchema, AccountSchema };
