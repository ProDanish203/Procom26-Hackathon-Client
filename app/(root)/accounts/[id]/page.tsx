'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountById, updateAccount, closeAccount, getAccountStatement } from '@/API/account.api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Calendar,
  Hash,
  Building2,
  Loader2,
  Copy,
  CheckCircle2,
  Edit,
  Trash2,
  AlertTriangle,
  Download,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { UpdateAccountSchema } from '@/schema/account.schema';

export default function AccountDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const accountId = params.id as string;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const [isStatementDialogOpen, setIsStatementDialogOpen] = useState(false);
  const [statementDates, setStatementDates] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [formData, setFormData] = useState<UpdateAccountSchema>({
    nickname: '',
    accountStatus: undefined,
  });
  const queryClient = useQueryClient();

  const { data: accountResponse, isLoading, error } = useQuery({
    queryKey: ['account', accountId],
    queryFn: () => getAccountById(accountId),
  });

  const updateAccountMutation = useMutation({
    mutationFn: (payload: UpdateAccountSchema) => updateAccount(accountId, payload),
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Account updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['account', accountId] });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        setIsEditDialogOpen(false);
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to update account');
      }
    },
    onError: () => {
      toast.error('An error occurred while updating the account');
    },
  });

  const closeAccountMutation = useMutation({
    mutationFn: () => closeAccount(accountId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Account closed successfully!');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        setIsCloseDialogOpen(false);
        setTimeout(() => router.push('/accounts'), 1500);
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to close account');
      }
    },
    onError: () => {
      toast.error('An error occurred while closing the account');
    },
  });

  const downloadStatementMutation = useMutation({
    mutationFn: () => getAccountStatement(accountId, statementDates.startDate, statementDates.endDate),
    onSuccess: (result) => {
      if (result.success) {
        generatePDF(result.response);
        setIsStatementDialogOpen(false);
        toast.success('Statement downloaded successfully!');
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to download statement');
      }
    },
    onError: () => {
      toast.error('An error occurred while downloading the statement');
    },
  });

  const generatePDF = (statement: any) => {
    const { account, transactions, period, summary } = statement;
    
    // Create HTML content for the statement
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Account Statement</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; }
          .header h1 { color: #D4AF37; margin: 0; }
          .info-section { margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background-color: #D4AF37; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          .summary { background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 8px; }
          .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total { font-size: 18px; font-weight: bold; color: #D4AF37; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>JSBL Bank</h1>
          <h2>Account Statement</h2>
        </div>
        
        <div class="info-section">
          <div class="info-row">
            <span class="label">Account Holder:</span>
            <span class="value">${account.nickname}</span>
          </div>
          <div class="info-row">
            <span class="label">Account Number:</span>
            <span class="value">${account.accountNumber}</span>
          </div>
          <div class="info-row">
            <span class="label">IBAN:</span>
            <span class="value">${account.iban}</span>
          </div>
          <div class="info-row">
            <span class="label">Statement Period:</span>
            <span class="value">${new Date(period.startDate).toLocaleDateString()} - ${new Date(period.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <h3>Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.length > 0 ? transactions.map((tx: any) => `
              <tr>
                <td>${new Date(tx.createdAt || tx.date).toLocaleDateString()}</td>
                <td>${tx.description || tx.type || 'Transaction'}</td>
                <td>${tx.transactionType || tx.type || 'N/A'}</td>
                <td style="color: ${tx.amount < 0 ? 'red' : 'green'}">Rs. ${Math.abs(tx.amount || 0).toLocaleString()}</td>
                <td>Rs. ${(tx.balance || 0).toLocaleString()}</td>
              </tr>
            `).join('') : '<tr><td colspan="5" style="text-align: center;">No transactions found</td></tr>'}
          </tbody>
        </table>

        <div class="summary">
          <h3>Summary</h3>
          <div class="summary-row">
            <span class="label">Opening Balance:</span>
            <span class="value">Rs. ${summary.openingBalance.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span class="label">Total Deposits:</span>
            <span class="value" style="color: green;">Rs. ${summary.totalDeposits.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span class="label">Total Withdrawals:</span>
            <span class="value" style="color: red;">Rs. ${summary.totalWithdrawals.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span class="label">Total Transactions:</span>
            <span class="value">${summary.transactionCount}</span>
          </div>
          <div class="summary-row total">
            <span>Closing Balance:</span>
            <span>Rs. ${summary.closingBalance.toLocaleString()}</span>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `statement_${account.accountNumber}_${period.startDate}_${period.endDate}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const account = accountResponse?.success ? accountResponse.response : null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const openEditDialog = () => {
    if (account) {
      setFormData({
        nickname: account.nickname,
        accountStatus: account.accountStatus,
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAccountMutation.mutate(formData);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500 text-white';
      case 'INACTIVE':
        return 'bg-gray-500 text-white';
      case 'FROZEN':
        return 'bg-blue-500 text-white';
      case 'CLOSED':
        return 'bg-red-500 text-white';
      case 'BLOCKED':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gold text-black';
    }
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-gold" />
        </div>
      </main>
    );
  }

  if (error || !account) {
    return (
      <main className="flex-1 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">Failed to load account details.</p>
          <Button onClick={() => router.push('/accounts')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accounts
          </Button>
        </div>
      </main>
    );
  }

  const balance = parseFloat(typeof account.balance === 'string' ? account.balance : account.balance.toString());
  const creditLimit = account.creditLimit
    ? parseFloat(typeof account.creditLimit === 'string' ? account.creditLimit : account.creditLimit.toString())
    : 0;

  return (
    <main className="flex-1 space-y-6 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push('/accounts')} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Accounts
        </Button>
        <div className="flex items-center gap-2">
          <Badge className={`font-bold border-none ${getStatusColor(account.accountStatus)}`}>
            {account.accountStatus}
          </Badge>
          <Button onClick={openEditDialog} variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-2 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold">
              <Wallet className="h-5 w-5" />
              Account Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">
                Account Nickname
              </p>
              <p className="text-2xl font-bold text-foreground">{account.nickname}</p>
            </div>

            <Separator className="bg-gold/10" />

            <div>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">Account Type</p>
              <p className="text-lg font-bold text-foreground">
                {account.accountType.charAt(0) + account.accountType.slice(1).toLowerCase()} Account
              </p>
            </div>

            <Separator className="bg-gold/10" />

            <div>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">
                Available Balance
              </p>
              <p className="text-3xl font-black text-gold">
                Rs. {balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {creditLimit > 0 && (
              <>
                <Separator className="bg-gold/10" />
                <div>
                  <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-2">
                    Credit Limit
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    Rs. {creditLimit.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-2 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold">
              <Building2 className="h-5 w-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Account Number</p>
                  <p className="text-sm font-mono font-bold text-foreground">{account.accountNumber}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(account.accountNumber, 'Account Number')}
                className="h-8 w-8"
              >
                {copiedField === 'Account Number' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">IBAN</p>
                  <p className="text-sm font-mono font-bold text-foreground">{account.iban}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(account.iban, 'IBAN')}
                className="h-8 w-8"
              >
                {copiedField === 'IBAN' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {account.routingNumber && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Routing Number</p>
                    <p className="text-sm font-mono font-bold text-foreground">{account.routingNumber}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(account.routingNumber!, 'Routing Number')}
                  className="h-8 w-8"
                >
                  {copiedField === 'Routing Number' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}

            {account.currency && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Currency</p>
                    <p className="text-sm font-bold text-foreground">{account.currency}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Created On</p>
                  <p className="text-sm font-bold text-foreground">
                    {new Date(account.createdAt).toLocaleDateString('en-PK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={() => router.push(`/transactions?accountId=${accountId}`)}
          className="flex-1 bg-gold text-black hover:bg-gold/90 font-bold"
        >
          View Transactions
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-gold text-gold hover:bg-gold/10 font-bold gap-2"
          onClick={() => setIsStatementDialogOpen(true)}
        >
          <Download className="h-4 w-4" />
          Download Statement
        </Button>
        {account.accountStatus !== 'CLOSED' && (
          <Button
            variant="destructive"
            onClick={() => setIsCloseDialogOpen(true)}
            className="gap-2"
            disabled={balance !== 0}
          >
            <Trash2 className="h-4 w-4" />
            Close Account
          </Button>
        )}
      </div>

      <Dialog open={isStatementDialogOpen} onOpenChange={setIsStatementDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-gold" />
              Download Account Statement
            </DialogTitle>
            <DialogDescription>
              Select the date range for your account statement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={statementDates.startDate}
                onChange={(e) => setStatementDates({ ...statementDates, startDate: e.target.value })}
                max={statementDates.endDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={statementDates.endDate}
                onChange={(e) => setStatementDates({ ...statementDates, endDate: e.target.value })}
                min={statementDates.startDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsStatementDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => downloadStatementMutation.mutate()}
              disabled={downloadStatementMutation.isPending}
              className="bg-gold text-black hover:bg-gold/90"
            >
              {downloadStatementMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCloseDialogOpen} onOpenChange={setIsCloseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Close Account
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to close this account? This action cannot be undone. The account balance must be
              zero to close the account.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200 font-medium">
              ⚠️ Warning: Closing this account will permanently remove access to it.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsCloseDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => closeAccountMutation.mutate()}
              disabled={closeAccountMutation.isPending}
            >
              {closeAccountMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Closing...
                </>
              ) : (
                'Close Account'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Update your account nickname or status.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Account Nickname</Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                placeholder="e.g., My Savings Account"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountStatus">Account Status</Label>
              <Select
                value={formData.accountStatus}
                onValueChange={(value: 'ACTIVE' | 'INACTIVE' | 'FROZEN' | 'CLOSED' | 'BLOCKED') =>
                  setFormData({ ...formData, accountStatus: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="FROZEN">Frozen</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateAccountMutation.isPending}
                className="flex-1 bg-gold text-black hover:bg-gold/90"
              >
                {updateAccountMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Account'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
