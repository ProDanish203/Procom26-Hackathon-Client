'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, DollarSign, Clock, Loader2 } from 'lucide-react';
import { GOLD } from './constants';
import type { EmiPlanSchema } from '@/schema/emi.schema';

interface EmiDashboardSummaryProps {
  activePlansCount: number;
  totalMonthlyObligation: number;
  nextDuePlan: EmiPlanSchema | null;
  isLoading: boolean;
}

export function EmiDashboardSummary({
  activePlansCount,
  totalMonthlyObligation,
  nextDuePlan,
  isLoading,
}: EmiDashboardSummaryProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active EMIs</CardTitle>
          <CreditCard className="h-4 w-4" style={{ color: GOLD }} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <>
              <div className="text-2xl font-bold">{activePlansCount}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card style={{ borderColor: `${GOLD}33` }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly obligation</CardTitle>
          <DollarSign className="h-4 w-4" style={{ color: GOLD }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            PKR {totalMonthlyObligation.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <p className="text-xs text-muted-foreground">Total monthly EMI</p>
        </CardContent>
      </Card>
      <Card style={{ borderColor: `${GOLD}33` }} className="sm:col-span-2 md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next payment</CardTitle>
          <Clock className="h-4 w-4" style={{ color: GOLD }} />
        </CardHeader>
        <CardContent>
          {nextDuePlan?.nextDueDate ? (
            <>
              <div className="text-2xl font-bold">
                {new Date(nextDuePlan.nextDueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </div>
              <p className="text-xs text-muted-foreground">
                {nextDuePlan.productName || 'EMI'} • PKR {Number(nextDuePlan.emiAmount).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming payments</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
