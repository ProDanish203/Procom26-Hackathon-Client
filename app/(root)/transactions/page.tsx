'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, FileText, TrendingUp, TrendingDown, Activity, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FinancialPageHeader } from '@/components/shared/financial/financial-page-header';
import { FinancialStatCard } from '@/components/shared/financial/stat-card';
import { TransactionFilters } from '@/components/transactions/transaction-filters';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { ReceiptModal } from '@/components/transactions/receipt-modal';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBankStatement, getAccountTransactions } from '@/API/transaction.api';
import { getAllAccounts } from '@/API/account.api';
import { AccountSchema } from '@/schema/account.schema';
import { toast } from 'sonner';

const transactionTypes = ['All', 'DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT', 'REFUND', 'FEE', 'INTEREST'];
const transactionStatuses = ['All', 'PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'];
const transactionCategories = [
  'All',
  'GROCERIES',
  'DINING',
  'TRANSPORTATION',
  'UTILITIES',
  'ENTERTAINMENT',
  'HEALTHCARE',
  'SHOPPING',
  'SALARY',
  'TRANSFER',
  'OTHER',
];

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const accountIdFromUrl = searchParams.get('accountId');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [isStatementDialogOpen, setIsStatementDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(accountIdFromUrl || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [statementDates, setStatementDates] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0], // Today
  });

  const { data: accountsResponse } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => getAllAccounts(),
  });

  const accounts = accountsResponse?.success ? accountsResponse.response : [];

  // Set the first account as selected if none is selected
  useEffect(() => {
    if (!selectedAccountId && accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);
    }
  }, [accounts, selectedAccountId]);

  const { data: transactionsResponse, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', selectedAccountId, searchTerm, selectedCategory, selectedType, selectedStatus, currentPage],
    queryFn: () =>
      getAccountTransactions(selectedAccountId, {
        page: currentPage,
        limit: 20,
        search: searchTerm || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        type: selectedType !== 'All' ? selectedType : undefined,
        status: selectedStatus !== 'All' ? selectedStatus : undefined,
      }),
    enabled: !!selectedAccountId,
  });

  const transactions = transactionsResponse?.success ? transactionsResponse.response.transactions : [];
  const pagination = transactionsResponse?.success ? transactionsResponse.response.pagination : null;

  const downloadStatementMutation = useMutation({
    mutationFn: () => getBankStatement(selectedAccountId, statementDates.startDate, statementDates.endDate),
    onSuccess: (result) => {
      if (result.success) {
        generatePDF(result.response);
        setIsStatementDialogOpen(false);
        toast.success('Bank statement downloaded successfully!');
      } else {
        toast.error(typeof result.response === 'string' ? result.response : 'Failed to download statement');
      }
    },
    onError: () => {
      toast.error('An error occurred while downloading the statement');
    },
  });

  const generatePDF = (statement: any) => {
    const { account, transactions, period, summary, statementId, generatedAt } = statement;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bank Statement - ${account.accountNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #D4AF37; padding-bottom: 20px; }
          .header h1 { color: #D4AF37; margin: 0; font-size: 32px; }
          .header p { color: #666; margin: 5px 0; }
          .info-section { margin: 20px 0; background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background-color: #D4AF37; color: white; padding: 12px; text-align: left; font-weight: bold; }
          td { padding: 10px; border-bottom: 1px solid #ddd; }
          tr:hover { background-color: #f5f5f5; }
          .summary { background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 8px; border: 2px solid #D4AF37; }
          .summary h3 { color: #D4AF37; margin-top: 0; }
          .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total { font-size: 18px; font-weight: bold; color: #D4AF37; border-top: 2px solid #D4AF37; padding-top: 10px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>JSBL BANK</h1>
          <p>Bank Statement</p>
          <p style="font-size: 12px;">Statement ID: ${statementId}</p>
          <p style="font-size: 12px;">Generated: ${new Date(generatedAt).toLocaleString()}</p>
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
            <span class="label">Account Type:</span>
            <span class="value">${account.accountType}</span>
          </div>
          <div class="info-row">
            <span class="label">Currency:</span>
            <span class="value">${account.currency}</span>
          </div>
          <div class="info-row">
            <span class="label">Statement Period:</span>
            <span class="value">${new Date(period.startDate).toLocaleDateString()} - ${new Date(period.endDate).toLocaleDateString()}</span>
          </div>
          <div class="info-row">
            <span class="label">Current Balance:</span>
            <span class="value" style="color: #D4AF37; font-weight: bold;">Rs. ${parseFloat(account.balance).toLocaleString()}</span>
          </div>
        </div>

        <h3 style="color: #D4AF37;">Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Reference</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${
              transactions.length > 0
                ? transactions
                    .map(
                      (tx: any) => `
              <tr>
                <td>${new Date(tx.createdAt || tx.date).toLocaleDateString()}</td>
                <td>${tx.description || tx.transactionType || 'Transaction'}</td>
                <td>${tx.transactionType || tx.type || 'N/A'}</td>
                <td style="font-family: monospace; font-size: 11px;">${tx.reference || tx.id || 'N/A'}</td>
                <td style="text-align: right; color: ${tx.amount < 0 ? 'red' : 'green'}; font-weight: bold;">
                  ${tx.amount < 0 ? '-' : '+'}Rs. ${Math.abs(tx.amount || 0).toLocaleString()}
                </td>
              </tr>
            `,
                    )
                    .join('')
                : '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">No transactions found for this period</td></tr>'
            }
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
            <span class="value" style="color: green; font-weight: bold;">+ Rs. ${summary.totalDeposits.toLocaleString()}</span>
          </div>
          <div class="summary-row">
            <span class="label">Total Withdrawals:</span>
            <span class="value" style="color: red; font-weight: bold;">- Rs. ${summary.totalWithdrawals.toLocaleString()}</span>
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

        <div class="footer">
          <p>This is a computer-generated statement and does not require a signature.</p>
          <p>For any queries, please contact JSBL Bank Customer Service.</p>
          <p>© ${new Date().getFullYear()} JSBL Bank. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bank_statement_${account.accountNumber}_${period.startDate}_${period.endDate}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="flex-1 space-y-8 p-2 md:p-6 animate-in fade-in duration-700 bg-background">
      <FinancialPageHeader
        title="TRANSACTION HISTORY"
        description="Monitor your financial footprint with gold-standard precision."
        icon={FileText}
        action={{
          label: 'Export Bank Statement',
          icon: Download,
          onClick: () => setIsStatementDialogOpen(true),
        }}
      />

      <div className="mb-4">
        <Label htmlFor="accountSelect" className="mb-2 block">
          Select Account
        </Label>
        <Select
          value={selectedAccountId}
          onValueChange={(value) => {
            setSelectedAccountId(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Choose an account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account: AccountSchema) => (
              <SelectItem key={account.id} value={account.id}>
                {account.nickname} - {account.accountNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinancialStatCard label="Total Income" value="Rs. 250,000" icon={TrendingUp} color="green" />
        <FinancialStatCard label="Total Expenses" value="Rs. 25,550" icon={TrendingDown} color="red" />
        <FinancialStatCard label="Net Flow" value="Rs. 224,450" icon={Activity} color="green" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label>Search</Label>
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Transaction Type</Label>
          <Select
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {transactionTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {transactionStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {transactionCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-card border-2 shadow-xl rounded-3xl overflow-hidden border-gold/10">
        <CardContent className="p-0">
          {isLoadingTransactions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions found.</p>
            </div>
          ) : (
            <>
              <TransactionsTable transactions={transactions} onTransactionClick={(tx) => setSelectedTransactionId(tx.id.toString())} />
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-gold/10">
                  <div className="text-sm text-muted-foreground">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ReceiptModal transactionId={selectedTransactionId} isOpen={!!selectedTransactionId} onClose={() => setSelectedTransactionId(null)} />

      <Dialog open={isStatementDialogOpen} onOpenChange={setIsStatementDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-gold" />
              Export Bank Statement
            </DialogTitle>
            <DialogDescription>Select account and date range for your bank statement.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">Select Account</Label>
              <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account: AccountSchema) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.nickname} - {account.accountNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              disabled={downloadStatementMutation.isPending || !selectedAccountId}
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
                  Download Statement
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
