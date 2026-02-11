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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { GOLD } from './constants';
import type { AccountSchema } from '@/schema/account.schema';

interface CreatePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: AccountSchema[];
  formAccountId: string;
  formProductName: string;
  onFormAccountIdChange: (v: string) => void;
  onFormProductNameChange: (v: string) => void;
  principal: number;
  tenure: number;
  interestRate: number;
  monthlyPayment: number;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export function CreatePlanDialog({
  open,
  onOpenChange,
  accounts,
  formAccountId,
  formProductName,
  onFormAccountIdChange,
  onFormProductNameChange,
  principal,
  tenure,
  interestRate,
  monthlyPayment,
  onSubmit,
  isSubmitting,
}: CreatePlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create EMI plan</DialogTitle>
          <DialogDescription>Choose account and optional name. Installments will be debited from this account.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Account</Label>
            <Select value={formAccountId} onValueChange={onFormAccountIdChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.nickname || acc.accountNumber} — PKR {Number(acc.balance).toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Product / loan name (optional)</Label>
            <Input
              placeholder="e.g. Personal Loan"
              value={formProductName}
              onChange={(e) => onFormProductNameChange(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Principal PKR {principal.toLocaleString()}, {tenure} months, {interestRate}% p.a. — Monthly EMI: PKR {monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}.
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: GOLD }} className="text-black" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
