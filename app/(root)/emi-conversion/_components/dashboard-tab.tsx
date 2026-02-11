'use client';

import { EmiDashboardSummary } from './emi-dashboard-summary';
import { EmiPlansList } from './emi-plans-list';
import { UpcomingInstallmentsCard, type UpcomingInstallmentRow } from './upcoming-installments-card';
import type { EmiPlanSchema } from '@/schema/emi.schema';

interface DashboardTabProps {
  allPlans: EmiPlanSchema[];
  activePlans: EmiPlanSchema[];
  totalMonthlyObligation: number;
  nextDuePlan: EmiPlanSchema | null;
  emiPlansLoading: boolean;
  upcomingInstallments: UpcomingInstallmentRow[];
  installmentsLoading?: boolean;
  onOpenSchedule: (planId: string) => void;
}

export function DashboardTab({
  allPlans,
  activePlans,
  totalMonthlyObligation,
  nextDuePlan,
  emiPlansLoading,
  upcomingInstallments,
  installmentsLoading,
  onOpenSchedule,
}: DashboardTabProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <EmiDashboardSummary
        activePlansCount={activePlans.length}
        totalMonthlyObligation={totalMonthlyObligation}
        nextDuePlan={nextDuePlan ?? null}
        isLoading={emiPlansLoading}
      />
      <EmiPlansList plans={allPlans} isLoading={emiPlansLoading} onOpenSchedule={onOpenSchedule} />
      <UpcomingInstallmentsCard installments={upcomingInstallments} isLoading={installmentsLoading} />
    </div>
  );
}
