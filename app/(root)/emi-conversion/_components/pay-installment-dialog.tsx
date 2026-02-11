'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { GOLD } from './constants';
import type { EmiPlanSchema, EmiInstallmentSchema } from '@/schema/emi.schema';
import type { AccountSchema } from '@/schema/account.schema';

interface PayInstallmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payingInstallment: { plan: EmiPlanSchema; installment: EmiInstallmentSchema } | null;
  accounts: AccountSchema[];
  payAccountId: string;
  onPayAccountIdChange: (v: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function PayInstallmentDialog({
  open,
  onOpenChange,
  payingInstallment,
  accounts,
  payAccountId,
  onPayAccountIdChange,
  onConfirm,
  isSubmitting,
}: PayInstallmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay installment</DialogTitle>
          <DialogDescription>Amount will be debited from the selected account.</DialogDescription>
        </DialogHeader>
        {payingInstallment && (
          <div className="space-y-4">
            <p className="text-sm">
              Pay PKR {Number(payingInstallment.installment.amount).toLocaleString()} for {payingInstallment.plan.productName || 'EMI'} (installment #{payingInstallment.installment.installmentNumber}).
            </p>
            <div className="space-y-2">
              <Label>Debit from account (plan-linked account)</Label>
              <Select value={payAccountId} onValueChange={onPayAccountIdChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.filter((a) => a.id === payingInstallment.plan.accountId).map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.nickname || acc.accountNumber} — PKR {Number(acc.balance).toLocaleString()}
                    </SelectItem>
                  ))}
                  {accounts.every((a) => a.id !== payingInstallment.plan.accountId) && (
                    <SelectItem value={payingInstallment.plan.accountId}>Plan account (select to pay)</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: GOLD }}
                className="text-black"
                disabled={!payAccountId || isSubmitting}
                onClick={onConfirm}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay now'}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
