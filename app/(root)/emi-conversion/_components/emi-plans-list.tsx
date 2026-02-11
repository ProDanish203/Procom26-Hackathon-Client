'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { GOLD } from './constants';
import type { EmiPlanSchema } from '@/schema/emi.schema';
import { Badge } from '@/components/ui/badge';

interface EmiPlansListProps {
  plans: EmiPlanSchema[];
  isLoading: boolean;
  onOpenSchedule: (planId: string) => void;
}

export function EmiPlansList({ plans, isLoading, onOpenSchedule }: EmiPlansListProps) {
  return (
    <Card style={{ borderColor: `${GOLD}33` }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <TrendingUp className="h-5 w-5" style={{ color: GOLD }} />
          EMI plans
        </CardTitle>
        <CardDescription>View schedule or pay next installment</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : plans.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No EMI plans yet. Create one from the Convert tab.</p>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => {
              const emiAmount = Number(plan.emiAmount);
              const nextDue = plan.nextDueDate ? new Date(plan.nextDueDate).toISOString().slice(0, 10) : null;
              return (
                <div
                  key={plan.id}
                  className="rounded-lg border p-4 space-y-3"
                  style={{ borderColor: `${GOLD}33` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold">{plan.productName || 'EMI Plan'}</h4>
                      <p className="text-sm text-muted-foreground">
                        PKR {Number(plan.principal).toLocaleString()} • {plan.tenureMonths} months
                      </p>
                    </div>
                    <Badge
                      className="text-black w-fit"
                      style={{ backgroundColor: plan.status === 'ACTIVE' || plan.status === 'OVERDUE' ? GOLD : undefined }}
                    >
                      PKR {emiAmount.toLocaleString()}/mo
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next due:</span>
                      <span className="font-medium">{nextDue || '—'}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{ borderColor: `${GOLD}80` }}
                      onClick={() => onOpenSchedule(plan.id)}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
