'use client';

import { useState, useMemo } from 'react';
import { useQuery, useQueries, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { getAllAccounts } from '@/API/account.api';
import { getAccountTransactions } from '@/API/transaction.api';
import { createEmiPlan, getEmiPlans, getEmiSchedule, payEmiInstallment } from '@/API/emi.api';
import { analyzeEmiAffordability } from '@/API/ai.api';
import type { EmiPlanSchema, EmiInstallmentSchema } from '@/schema/emi.schema';
import type { EmiAffordabilityAnalysisSchema } from '@/schema/ai.schema';
import type { AccountSchema } from '@/schema/account.schema';
import {
  GOLD,
  MIN_ELIGIBLE_AMOUNT,
  calcEmi,
  ConvertTab,
  DashboardTab,
  CreatePlanDialog,
  ScheduleDialog,
  PayInstallmentDialog,
  type CandidateTransaction,
  type UpcomingInstallmentRow,
} from './_components';

export default function EMIConversionPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'convert' | 'dashboard'>('convert');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [principal, setPrincipal] = useState<number>(45000);
  const [tenure, setTenure] = useState<number>(6);
  const [interestRate, setInterestRate] = useState<number>(14);
  const [filterAmount, setFilterAmount] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createFormAccountId, setCreateFormAccountId] = useState('');
  const [createFormProductName, setCreateFormProductName] = useState('');

  const [affordabilityResult, setAffordabilityResult] = useState<EmiAffordabilityAnalysisSchema | null>(null);
  const [affordabilityLoading, setAffordabilityLoading] = useState(false);

  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [schedulePlanId, setSchedulePlanId] = useState<string | null>(null);

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [payingInstallment, setPayingInstallment] = useState<{
    plan: EmiPlanSchema;
    installment: EmiInstallmentSchema;
  } | null>(null);
  const [payAccountId, setPayAccountId] = useState('');

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts('ACTIVE'),
  });
  const accounts: AccountSchema[] = accountsResponse?.success ? accountsResponse.response : [];
  const activeAccounts = Array.isArray(accounts) ? accounts.filter((a: AccountSchema) => a.accountStatus === 'ACTIVE') : [];
  const firstAccountId = activeAccounts[0]?.id ?? '';

  const { data: transactionsResponse, isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions', selectedAccountId || firstAccountId],
    queryFn: () =>
      getAccountTransactions(selectedAccountId || firstAccountId, { limit: 30, page: 1 }),
    enabled: !!(selectedAccountId || firstAccountId),
  });
  const transactionsData = transactionsResponse?.success ? transactionsResponse.response : null;
  const rawTransactions = transactionsData?.transactions ?? [];
  type TxRow = { id: string; amount: number | string; description?: string; merchant?: string; category?: string; createdAt?: string };
  const candidateTransactions = useMemo(() => {
    return (rawTransactions as TxRow[]).map((t) => {
      const amt = Math.abs(Number(t.amount));
      const date = t.createdAt ? new Date(t.createdAt).toISOString().slice(0, 10) : '';
      return {
        id: t.id,
        merchant: t.merchant || t.description || 'Transaction',
        amount: amt,
        date,
        category: t.category || 'OTHER',
        eligible: amt >= MIN_ELIGIBLE_AMOUNT,
      } satisfies CandidateTransaction;
    });
  }, [rawTransactions]);

  const filteredTransactions = useMemo(() => {
    return candidateTransactions.filter((t) => {
      const amountMatch =
        filterAmount === 'all' ||
        (filterAmount === 'high' && t.amount > 50000) ||
        (filterAmount === 'medium' && t.amount >= 20000 && t.amount <= 50000) ||
        (filterAmount === 'low' && t.amount < 20000);
      const dateMatch =
        filterDate === 'all' ||
        (filterDate === 'week' && new Date(t.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (filterDate === 'month' && new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
      return amountMatch && dateMatch;
    });
  }, [candidateTransactions, filterAmount, filterDate]);

  const { data: emiPlansResponse, isLoading: emiPlansLoading } = useQuery({
    queryKey: ['emiPlans'],
    queryFn: () => getEmiPlans({ limit: 50 }),
  });
  const emiPlansData = emiPlansResponse?.success ? emiPlansResponse.response : null;
  const allPlans: EmiPlanSchema[] = emiPlansData?.plans ?? [];
  const activePlans = allPlans.filter((p) => p.status === 'ACTIVE' || p.status === 'OVERDUE');
  const totalMonthlyObligation = activePlans.reduce((sum, p) => sum + Number(p.emiAmount), 0);
  const nextDuePlan = [...activePlans].sort(
    (a, b) => new Date(a.nextDueDate || a.endDate).getTime() - new Date(b.nextDueDate || b.endDate).getTime(),
  )[0] ?? null;

  const { data: scheduleResponse, isLoading: scheduleLoading } = useQuery({
    queryKey: ['emiSchedule', schedulePlanId],
    queryFn: () => getEmiSchedule(schedulePlanId!),
    enabled: !!schedulePlanId && scheduleDialogOpen,
  });
  const scheduleData = scheduleResponse?.success ? scheduleResponse.response : null;

  const scheduleQueries = useQueries({
    queries: allPlans.map((plan) => ({
      queryKey: ['emiSchedule', plan.id] as const,
      queryFn: () => getEmiSchedule(plan.id),
      enabled: activeTab === 'dashboard' && allPlans.length > 0,
    })),
  });
  const allSchedulesData = useMemo(() => {
    return scheduleQueries
      .map((q) => q.data?.success ? q.data.response : null)
      .filter(Boolean) as Array<{ plan: EmiPlanSchema; installments: EmiInstallmentSchema[] }>;
  }, [scheduleQueries]);

  const createPlanMutation = useMutation({
    mutationFn: createEmiPlan,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('EMI plan created successfully');
        queryClient.invalidateQueries({ queryKey: ['emiPlans'] });
        setCreateDialogOpen(false);
        setCreateFormProductName('');
        setActiveTab('dashboard');
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to create EMI plan');
      }
    },
    onError: () => toast.error('Failed to create EMI plan'),
  });

  const payInstallmentMutation = useMutation({
    mutationFn: ({ installmentId, accountId }: { installmentId: string; accountId: string }) =>
      payEmiInstallment(installmentId, accountId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Installment paid successfully');
        queryClient.invalidateQueries({ queryKey: ['emiPlans'] });
        queryClient.invalidateQueries({ queryKey: ['emiSchedule'] });
        setPayDialogOpen(false);
        setPayingInstallment(null);
        setPayAccountId('');
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to pay installment');
      }
    },
    onError: () => toast.error('Failed to pay installment'),
  });

  const handleCheckAffordability = async () => {
    setAffordabilityLoading(true);
    setAffordabilityResult(null);
    const result = await analyzeEmiAffordability({
      principal,
      tenureMonths: tenure,
      interestRateAnnual: interestRate,
      accountId: selectedAccountId || firstAccountId || undefined,
    });
    setAffordabilityLoading(false);
    if (result.success && result.response) {
      setAffordabilityResult(result.response);
    } else {
      toast.error(typeof result.response === 'string' ? result.response : 'Affordability check failed');
    }
  };

  const handleOpenCreateDialog = () => {
    setCreateFormAccountId(selectedAccountId || firstAccountId || '');
    setCreateDialogOpen(true);
  };

  const handleSubmitCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createFormAccountId) {
      toast.error('Please select an account');
      return;
    }
    createPlanMutation.mutate({
      accountId: createFormAccountId,
      productName: createFormProductName || undefined,
      principal,
      interestRateAnnual: interestRate,
      tenureMonths: tenure,
    });
  };

  const handlePayInstallment = (plan: EmiPlanSchema, installment: EmiInstallmentSchema) => {
    setPayingInstallment({ plan, installment });
    setPayAccountId(plan.accountId);
    setScheduleDialogOpen(false);
    setPayDialogOpen(true);
  };

  const handleConfirmPay = () => {
    if (!payingInstallment || !payAccountId) return;
    payInstallmentMutation.mutate({ installmentId: payingInstallment.installment.id, accountId: payAccountId });
  };

  const allInstallments: UpcomingInstallmentRow[] = useMemo(() => {
    const rows: UpcomingInstallmentRow[] = [];
    const pastCutoff = new Date();
    pastCutoff.setMonth(pastCutoff.getMonth() - 6);
    const pastCutoffStr = pastCutoff.toISOString().slice(0, 10);
    const futureCutoff = new Date();
    futureCutoff.setMonth(futureCutoff.getMonth() + 12);
    const futureCutoffStr = futureCutoff.toISOString().slice(0, 10);
    for (const schedule of allSchedulesData) {
      const productName = schedule.plan?.productName || 'EMI';
      for (const inst of schedule.installments || []) {
        const dueDate = typeof inst.dueDate === 'string' ? inst.dueDate.slice(0, 10) : new Date(inst.dueDate).toISOString().slice(0, 10);
        if (dueDate < pastCutoffStr || dueDate > futureCutoffStr) continue;
        const paidAt = inst.paidAt ? (typeof inst.paidAt === 'string' ? inst.paidAt.slice(0, 10) : new Date(inst.paidAt).toISOString().slice(0, 10)) : null;
        rows.push({
          dueDate,
          productName,
          amount: Number(inst.amount),
          status: inst.status,
          paidAt: paidAt ?? undefined,
        });
      }
    }
    rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    return rows;
  }, [allSchedulesData]);

  return (
    <div className="w-full space-y-4 md:space-y-6 p-2 md:p-6 bg-background">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gold">
          EMI Conversion Center
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Create and manage easy monthly installments with AI-powered affordability insights
        </p>
      </div>

      <div className="flex gap-2 border-b border-gold/20 overflow-x-auto">
        <Button
          variant="ghost"
          className={cn('relative rounded-b-none whitespace-nowrap', activeTab === 'convert' && 'bg-gold/10')}
          style={activeTab === 'convert' ? { borderBottom: `2px solid ${GOLD}` } : {}}
          onClick={() => setActiveTab('convert')}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Convert to EMI
        </Button>
        <Button
          variant="ghost"
          className={cn('relative rounded-b-none whitespace-nowrap', activeTab === 'dashboard' && 'bg-gold/10')}
          style={activeTab === 'dashboard' ? { borderBottom: `2px solid ${GOLD}` } : {}}
          onClick={() => setActiveTab('dashboard')}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          EMI Dashboard
        </Button>
      </div>

      {activeTab === 'convert' && (
        <ConvertTab
          activeAccounts={activeAccounts}
          selectedAccountId={selectedAccountId}
          onAccountChange={setSelectedAccountId}
          filterAmount={filterAmount}
          filterDate={filterDate}
          onFilterAmountChange={setFilterAmount}
          onFilterDateChange={setFilterDate}
          filteredTransactions={filteredTransactions}
          selectedTransactionId={selectedTransactionId}
          onSelectTransaction={(tx) => {
            setSelectedTransactionId(tx.id);
            setPrincipal(tx.amount);
          }}
          transactionsLoading={transactionsLoading}
          principal={principal}
          tenure={tenure}
          interestRate={interestRate}
          onPrincipalChange={setPrincipal}
          onTenureChange={setTenure}
          onInterestRateChange={setInterestRate}
          affordabilityLoading={affordabilityLoading}
          affordabilityResult={affordabilityResult}
          onCheckAffordability={handleCheckAffordability}
          onOpenCreateDialog={handleOpenCreateDialog}
        />
      )}

      {activeTab === 'dashboard' && (
        <DashboardTab
          allPlans={allPlans}
          activePlans={activePlans}
          totalMonthlyObligation={totalMonthlyObligation}
          nextDuePlan={nextDuePlan}
          emiPlansLoading={emiPlansLoading}
          upcomingInstallments={allInstallments}
          installmentsLoading={scheduleQueries.some((q) => q.isLoading)}
          onOpenSchedule={(planId) => {
            setSchedulePlanId(planId);
            setScheduleDialogOpen(true);
          }}
        />
      )}

      <CreatePlanDialog
        open={createDialogOpen}
        onOpenChange={(open) => {
          setCreateDialogOpen(open);
          if (!open) setCreateFormProductName('');
        }}
        accounts={activeAccounts}
        formAccountId={createFormAccountId}
        formProductName={createFormProductName}
        onFormAccountIdChange={setCreateFormAccountId}
        onFormProductNameChange={setCreateFormProductName}
        principal={principal}
        tenure={tenure}
        interestRate={interestRate}
        monthlyPayment={calcEmi(principal, interestRate, tenure)}
        onSubmit={handleSubmitCreatePlan}
        isSubmitting={createPlanMutation.isPending}
      />

      <ScheduleDialog
        open={scheduleDialogOpen}
        onOpenChange={(open) => {
          setScheduleDialogOpen(open);
          if (!open) setSchedulePlanId(null);
        }}
        scheduleData={scheduleData}
        scheduleLoading={scheduleLoading}
        onPayInstallment={handlePayInstallment}
      />

      <PayInstallmentDialog
        open={payDialogOpen}
        onOpenChange={(open) => {
          setPayDialogOpen(open);
          if (!open) {
            setPayingInstallment(null);
            setPayAccountId('');
          }
        }}
        payingInstallment={payingInstallment}
        accounts={activeAccounts}
        payAccountId={payAccountId}
        onPayAccountIdChange={setPayAccountId}
        onConfirm={handleConfirmPay}
        isSubmitting={payInstallmentMutation.isPending}
      />
    </div>
  );
}
