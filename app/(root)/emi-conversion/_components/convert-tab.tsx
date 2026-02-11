'use client';

import { EligibleTransactionsCard } from './eligible-transactions-card';
import { EmiCalculatorCard } from './emi-calculator-card';
import { AiAffordabilityCard } from './ai-affordability-card';
import { CreatePlanCard } from './create-plan-card';
import { calcEmi, MIN_ELIGIBLE_AMOUNT } from './constants';
import type { CandidateTransaction } from './types';
import type { AccountSchema } from '@/schema/account.schema';
import type { EmiAffordabilityAnalysisSchema } from '@/schema/ai.schema';

interface ConvertTabProps {
  activeAccounts: AccountSchema[];
  selectedAccountId: string;
  onAccountChange: (id: string) => void;
  filterAmount: string;
  filterDate: string;
  onFilterAmountChange: (v: string) => void;
  onFilterDateChange: (v: string) => void;
  filteredTransactions: CandidateTransaction[];
  selectedTransactionId: string | null;
  onSelectTransaction: (tx: CandidateTransaction) => void;
  transactionsLoading: boolean;
  principal: number;
  tenure: number;
  interestRate: number;
  onPrincipalChange: (v: number) => void;
  onTenureChange: (v: number) => void;
  onInterestRateChange: (v: number) => void;
  affordabilityLoading: boolean;
  affordabilityResult: EmiAffordabilityAnalysisSchema | null;
  onCheckAffordability: () => void;
  onOpenCreateDialog: () => void;
}

export function ConvertTab({
  activeAccounts,
  selectedAccountId,
  onAccountChange,
  filterAmount,
  filterDate,
  onFilterAmountChange,
  onFilterDateChange,
  filteredTransactions,
  selectedTransactionId,
  onSelectTransaction,
  transactionsLoading,
  principal,
  tenure,
  interestRate,
  onPrincipalChange,
  onTenureChange,
  onInterestRateChange,
  affordabilityLoading,
  affordabilityResult,
  onCheckAffordability,
  onOpenCreateDialog,
}: ConvertTabProps) {
  const monthlyPayment = calcEmi(principal, interestRate, tenure);

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4 md:space-y-6">
        <EligibleTransactionsCard
          accounts={activeAccounts}
          selectedAccountId={selectedAccountId}
          onAccountChange={onAccountChange}
          filterAmount={filterAmount}
          filterDate={filterDate}
          onFilterAmountChange={onFilterAmountChange}
          onFilterDateChange={onFilterDateChange}
          filteredTransactions={filteredTransactions}
          selectedTransactionId={selectedTransactionId}
          onSelectTransaction={onSelectTransaction}
          isLoading={transactionsLoading}
        />
        <EmiCalculatorCard
          principal={principal}
          tenure={tenure}
          interestRate={interestRate}
          onPrincipalChange={onPrincipalChange}
          onTenureChange={onTenureChange}
          onInterestRateChange={onInterestRateChange}
        />
      </div>
      <div className="space-y-4 md:space-y-6">
        <AiAffordabilityCard
          loading={affordabilityLoading}
          result={affordabilityResult}
          principal={principal}
          onCheckAffordability={onCheckAffordability}
          onRecheck={onCheckAffordability}
        />
        <CreatePlanCard
          monthlyPayment={monthlyPayment}
          tenure={tenure}
          onOpenCreateDialog={onOpenCreateDialog}
          disabled={activeAccounts.length === 0 || principal < MIN_ELIGIBLE_AMOUNT}
        />
      </div>
    </div>
  );
}
