'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { GOLD } from './constants';

interface CreatePlanCardProps {
  monthlyPayment: number;
  tenure: number;
  onOpenCreateDialog: () => void;
  disabled: boolean;
}

export function CreatePlanCard({ monthlyPayment, tenure, onOpenCreateDialog, disabled }: CreatePlanCardProps) {
  return (
    <Card style={{ borderColor: `${GOLD}33` }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <DollarSign className="h-5 w-5" style={{ color: GOLD }} />
          Create EMI Plan
        </CardTitle>
        <CardDescription>Debit from your account each month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Monthly EMI: <strong style={{ color: GOLD }}>PKR {monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong> for {tenure} months.
        </p>
        <Button
          className="w-full text-black hover:opacity-90"
          size="lg"
          style={{ backgroundColor: GOLD }}
          onClick={onOpenCreateDialog}
          disabled={disabled}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Create EMI plan
        </Button>
      </CardContent>
    </Card>
  );
}
