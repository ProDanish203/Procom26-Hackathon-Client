'use client';

import { useState } from 'react';
import { Send, ArrowRight, ShieldCheck, DollarSign, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAccounts } from '@/API/account.api';
import { getAllBeneficiaries } from '@/API/beneficiary.api';
import { initiateIBFT, initiateRaast } from '@/API/payment.api';
import { AccountSchema } from '@/schema/account.schema';
import { BeneficiarySchema } from '@/schema/beneficiary.schema';
import { toast } from 'sonner';

export function ExternalTransferForm() {
  const queryClient = useQueryClient();
  const [transferType, setTransferType] = useState<'ibft' | 'raast'>('raast');
  const [formData, setFormData] = useState({
    accountId: '',
    beneficiaryId: '',
    recipientName: '',
    recipientAccount: '',
    recipientBank: '',
    recipientIban: '',
    amount: '',
    description: '',
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const { data: beneficiariesResponse } = useQuery({
    queryKey: ['beneficiaries'],
    queryFn: () => getAllBeneficiaries(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];
  const beneficiaries = beneficiariesResponse?.success ? beneficiariesResponse.response.beneficiaries : [];

  const ibftMutation = useMutation({
    mutationFn: initiateIBFT,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('IBFT transfer initiated successfully! Processing time: 1-2 business days');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        resetForm();
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to initiate transfer');
      }
    },
    onError: () => toast.error('An error occurred while processing the transfer'),
  });

  const raastMutation = useMutation({
    mutationFn: initiateRaast,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('RAAST transfer completed successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        resetForm();
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to complete transfer');
      }
    },
    onError: () => toast.error('An error occurred while processing the transfer'),
  });

  const resetForm = () => {
    setFormData({
      accountId: '',
      beneficiaryId: '',
      recipientName: '',
      recipientAccount: '',
      recipientBank: '',
      recipientIban: '',
      amount: '',
      description: '',
    });
  };

  const handleBeneficiarySelect = (beneficiaryId: string) => {
    const beneficiary = beneficiaries.find((b: BeneficiarySchema) => b.id === beneficiaryId);
    if (beneficiary) {
      setFormData({
        ...formData,
        beneficiaryId,
        recipientName: beneficiary.accountTitle || beneficiary.nickname,
        recipientAccount: beneficiary.accountNumber || '',
        recipientBank: beneficiary.bankName || '',
        recipientIban: beneficiary.iban || '',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.accountId || !formData.recipientName || !formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (transferType === 'ibft') {
      if (!formData.recipientAccount || !formData.recipientBank) {
        toast.error('Please provide recipient account and bank details');
        return;
      }
      ibftMutation.mutate({
        accountId: formData.accountId,
        beneficiaryId: formData.beneficiaryId || undefined,
        recipientAccount: formData.recipientAccount,
        recipientBank: formData.recipientBank,
        recipientName: formData.recipientName,
        amount,
        description: formData.description,
      });
    } else {
      if (!formData.recipientIban) {
        toast.error('Please provide recipient IBAN');
        return;
      }
      raastMutation.mutate({
        accountId: formData.accountId,
        beneficiaryId: formData.beneficiaryId || undefined,
        recipientIban: formData.recipientIban,
        recipientName: formData.recipientName,
        amount,
        description: formData.description,
      });
    }
  };

  const isPending = ibftMutation.isPending || raastMutation.isPending;

  return (
    <Card className="border-2 shadow-xl rounded-[32px] overflow-hidden bg-card border-gold/20">
      <div className="p-6 md:p-8 border-b-2 border-gold/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gold/10">
            <Send className="h-5 w-5 text-gold" />
          </div>
          <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter text-foreground">
            External Transfer
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">
          Transfer to other banks via IBFT or RAAST.
        </CardDescription>
      </div>
      <CardContent className="p-6 md:p-8">
        <Tabs value={transferType} onValueChange={(v) => setTransferType(v as 'ibft' | 'raast')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1.5 rounded-2xl border-2 border-gold/10">
            <TabsTrigger
              value="raast"
              className="font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black"
            >
              RAAST (Instant)
            </TabsTrigger>
            <TabsTrigger
              value="ibft"
              className="font-black uppercase text-[10px] tracking-widest rounded-xl data-[state=active]:bg-gold data-[state=active]:text-black"
            >
              IBFT (1-2 Days)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              From Account
            </Label>
            <Select
              value={formData.accountId}
              onValueChange={(value) => setFormData({ ...formData, accountId: value })}
            >
              <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                <SelectValue placeholder="Select Source Account" />
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
              Select Beneficiary (Optional)
            </Label>
            <Select value={formData.beneficiaryId} onValueChange={handleBeneficiarySelect}>
              <SelectTrigger className="h-14 border-2 rounded-2xl bg-muted hover:bg-muted/80 transition-all border-gold/10 focus-visible:ring-gold">
                <SelectValue placeholder="Choose saved beneficiary or enter manually" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-gold/20 bg-card">
                {beneficiaries
                  .filter((b: BeneficiarySchema) =>
                    transferType === 'raast'
                      ? b.beneficiaryType === 'RAAST'
                      : b.beneficiaryType === 'IBFT'
                  )
                  .map((beneficiary: BeneficiarySchema) => (
                    <SelectItem key={beneficiary.id} value={beneficiary.id}>
                      {beneficiary.nickname}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Recipient Name
            </Label>
            <Input
              value={formData.recipientName}
              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="Enter recipient name"
              required
            />
          </div>

          {transferType === 'ibft' ? (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Account Number
                  </Label>
                  <Input
                    value={formData.recipientAccount}
                    onChange={(e) => setFormData({ ...formData, recipientAccount: e.target.value })}
                    className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
                    placeholder="Enter account number"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Bank Name
                  </Label>
                  <Input
                    value={formData.recipientBank}
                    onChange={(e) => setFormData({ ...formData, recipientBank: e.target.value })}
                    className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
                    placeholder="e.g., HBL, UBL"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                IBAN
              </Label>
              <Input
                value={formData.recipientIban}
                onChange={(e) => setFormData({ ...formData, recipientIban: e.target.value })}
                className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
                placeholder="PK36DESI1234567890123456"
                maxLength={24}
                required
              />
            </div>
          )}

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Transfer Amount
            </Label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-gold" />
                <span className="text-xl font-black text-foreground">Rs.</span>
              </div>
              <Input
                type="number"
                step="0.01"
                min="1"
                max="1000000"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="h-20 pl-24 text-3xl md:text-4xl font-black border-2 rounded-2xl focus-visible:ring-gold bg-muted transition-all border-gold/10"
                placeholder="0.00"
                required
              />
            </div>
            {transferType === 'ibft' && (
              <p className="text-xs text-muted-foreground">Fee: Rs. 15 will be charged</p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Description
            </Label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-14 border-2 rounded-2xl bg-muted border-gold/10 focus-visible:ring-gold"
              placeholder="e.g., Payment for services"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-16 text-lg md:text-xl font-black uppercase tracking-tighter text-black shadow-xl hover:scale-[1.01] transition-all rounded-2xl bg-gold hover:bg-gold/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Transfer <ArrowRight className="ml-3 h-5 md:h-6 w-5 md:w-6" />
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 border-t border-dashed border-gold/20">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded-full border border-green-100 dark:border-green-900">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">
                {transferType === 'raast' ? 'Instant Transfer • No Fee' : 'Secure Transfer • Rs. 15 Fee'}
              </span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
