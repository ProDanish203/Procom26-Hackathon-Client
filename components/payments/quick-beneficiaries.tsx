'use client';

import { useState } from 'react';
import { Plus, ChevronRight, Loader2, Star, Trash2, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBeneficiaries, addBeneficiary, deleteBeneficiary, toggleFavorite } from '@/API/beneficiary.api';
import { AddBeneficiarySchema, BeneficiarySchema } from '@/schema/beneficiary.schema';
import { toast } from 'sonner';

export function QuickBeneficiaries() {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [formData, setFormData] = useState<AddBeneficiarySchema>({
    beneficiaryType: 'RAAST',
    nickname: '',
    accountNumber: '',
    iban: '',
    bankName: '',
    accountTitle: '',
  });

  const { data: beneficiariesResponse, isLoading } = useQuery({
    queryKey: ['beneficiaries', filterType, showFavoritesOnly],
    queryFn: () => getAllBeneficiaries(filterType, showFavoritesOnly || undefined),
  });

  const beneficiaries = beneficiariesResponse?.success ? beneficiariesResponse.response.beneficiaries : [];

  const addBeneficiaryMutation = useMutation({
    mutationFn: addBeneficiary,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Beneficiary added successfully!');
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
        setIsAddDialogOpen(false);
        setFormData({
          beneficiaryType: 'RAAST',
          nickname: '',
          accountNumber: '',
          iban: '',
          bankName: '',
          accountTitle: '',
        });
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to add beneficiary');
      }
    },
  });

  const deleteBeneficiaryMutation = useMutation({
    mutationFn: deleteBeneficiary,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Beneficiary deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to delete beneficiary');
      }
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['beneficiaries'] });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBeneficiaryMutation.mutate(formData);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <Card className="border-2 rounded-2xl shadow-sm bg-card border-gold/10">
        <CardHeader className="pb-4 border-b border-gold/5">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-between text-muted-foreground">
            Quick Recipients
            <div
              onClick={() => setIsAddDialogOpen(true)}
              className="p-1.5 rounded-full bg-gold/10 text-gold cursor-pointer hover:bg-gold hover:text-black transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
            </div>
          </CardTitle>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setFilterType(undefined)}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${
                filterType === undefined
                  ? 'bg-gold text-black'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('RAAST')}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${
                filterType === 'RAAST'
                  ? 'bg-gold text-black'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              RAAST
            </button>
            <button
              onClick={() => setFilterType('BILLER')}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all ${
                filterType === 'BILLER'
                  ? 'bg-gold text-black'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Bills
            </button>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all flex items-center gap-1 ${
                showFavoritesOnly
                  ? 'bg-gold text-black'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Star className={`h-3 w-3 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              Favorites
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
            </div>
          ) : beneficiaries.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">No beneficiaries yet</p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                variant="outline"
                size="sm"
                className="mt-4 border-gold text-gold hover:bg-gold/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Beneficiary
              </Button>
            </div>
          ) : (
            beneficiaries.slice(0, 5).map((ben: BeneficiarySchema) => (
              <div
                key={ben.id}
                className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted text-gold flex items-center justify-center font-black text-xs shadow-sm border-2 border-gold/10 group-hover:bg-gold group-hover:text-black transition-all">
                  {getInitials(ben.nickname)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-foreground group-hover:text-gold transition-colors">
                    {ben.nickname}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                    {ben.bankName || ben.accountNumber || 'Beneficiary'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteMutation.mutate(ben.id);
                    }}
                    className="p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${ben.isFavorite ? 'fill-gold text-gold' : 'text-muted-foreground'}`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this beneficiary?')) {
                        deleteBeneficiaryMutation.mutate(ben.id);
                      }
                    }}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-gold" />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Beneficiary</DialogTitle>
            <DialogDescription>Add a quick recipient for faster transfers.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Beneficiary Type</Label>
              <Select
                value={formData.beneficiaryType}
                onValueChange={(value: any) => setFormData({ ...formData, beneficiaryType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RAAST">RAAST Transfer</SelectItem>
                  <SelectItem value="IBFT">IBFT Transfer</SelectItem>
                  <SelectItem value="BILL_PAYMENT">Bill Payment</SelectItem>
                  <SelectItem value="MOBILE_TOPUP">Mobile Top-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nickname</Label>
              <Input
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                placeholder="e.g., Mom - Savings"
                required
              />
            </div>
            {(formData.beneficiaryType === 'RAAST' || formData.beneficiaryType === 'IBFT') && (
              <>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label>IBAN</Label>
                  <Input
                    value={formData.iban}
                    onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                    placeholder="PK36DESI1234567890123456"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="e.g., HBL"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Title</Label>
                  <Input
                    value={formData.accountTitle}
                    onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                    placeholder="Account holder name"
                  />
                </div>
              </>
            )}
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={addBeneficiaryMutation.isPending} className="bg-gold text-black hover:bg-gold/90">
                {addBeneficiaryMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Beneficiary'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
