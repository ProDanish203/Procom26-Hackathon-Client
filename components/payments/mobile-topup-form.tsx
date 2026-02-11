'use client';

import { useState } from 'react';
import { Smartphone, DollarSign, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { mobileRecharge } from '@/API/payment.api';
import { AccountSchema } from '@/schema/account.schema';
import { toast } from 'sonner';

const OPERATORS = ['Jazz', 'Telenor', 'Zong', 'Ufone'];
const QUICK_AMOUNTS = [100, 200, 500, 1000];

export function MobileTopupForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    accountId: '',
    mobileOperator: '',
    mobileNumber: '',
    amount: '',
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];

  const rechargeMutation = useMutation({
    mutationFn: mobileRecharge,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Mobile recharge completed successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        setFormData({ accountId: '', mobileOperator: '', mobileNumber: '', amount: '' });
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to complete recharge');
      }
    },
    onError: () => {
      toast.error('An error occurred while processing the recharge');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.accountId || !formData.mobileOperator || !formData.mobileNumber || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^03\d{9}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      toast.error('Invalid mobile number format. Use 03XXXXXXXXX');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount < 10 || amount > 10000) {
      toast.error('Amount must be between Rs. 10 and Rs. 10,000');
      return;
    }

    rechargeMutation.mutate({
      accountId: formData.accountId,
      mobileOperator: formData.mobileOperator,
      mobileNumber: formData.mobileNumber,
      amount,
    });
  };

  return (
    <Card className="border-4 shadow-2xl rounded-[32px] overflow-hidden bg-card border-gold">
      <div className="bg-black p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gold/20">
            <Smartphone className="h-5 w-5 text-gold" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-gold">
            Mobile Top-up
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest mt-1">
          Recharge your talk time instantly.
        </CardDescription>
      </div>
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Select Operator
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {OPERATORS.map((operator) => (
                <Button
                  key={operator}
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, mobileOperator: operator })}
                  className={`h-14 md:h-16 font-black uppercase border-2 text-[10px] md:text-[11px] rounded-xl hover:border-gold hover:bg-gold/5 transition-all ${
                    formData.mobileOperator === operator ? 'border-gold bg-gold/10 text-gold' : 'border-gold/10'
                  }`}
                >
                  {operator}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Pay From Account
            </Label>
            <Select
              value={formData.accountId}
              onValueChange={(value) => setFormData({ ...formData, accountId: value })}
            >
              <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-gold/20 bg-card">
                {accounts.map((account: AccountSchema) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.nickname} - {account.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Mobile Number
            </Label>
            <Input
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              className="h-14 border-2 rounded-xl border-gold/10 focus-visible:ring-gold bg-muted"
              placeholder="03xx-xxxxxxx"
              maxLength={11}
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Recharge Amount
            </Label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {QUICK_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  className={`h-12 font-black border-2 rounded-xl hover:border-gold hover:bg-gold/5 transition-all ${
                    formData.amount === amount.toString() ? 'border-gold bg-gold/10 text-gold' : 'border-gold/10'
                  }`}
                >
                  Rs. {amount}
                </Button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gold" />
                <span className="text-lg font-black text-foreground">Rs.</span>
              </div>
              <Input
                type="number"
                step="1"
                min="10"
                max="10000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="h-16 pl-20 text-2xl font-black border-2 rounded-xl font-bold border-gold/10 focus-visible:ring-gold bg-muted"
                placeholder="100"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={rechargeMutation.isPending}
              className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold hover:bg-gold/90"
            >
              {rechargeMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Recharge Now <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">
                Instant Recharge • No Fee
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
