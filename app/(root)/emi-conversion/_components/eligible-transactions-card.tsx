'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Filter, Calendar, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { GOLD, MIN_ELIGIBLE_AMOUNT } from './constants';
import type { CandidateTransaction } from './types';
import type { AccountSchema } from '@/schema/account.schema';
import { cn } from '@/lib/utils';

interface EligibleTransactionsCardProps {
  accounts: AccountSchema[];
  selectedAccountId: string;
  onAccountChange: (id: string) => void;
  filterAmount: string;
  filterDate: string;
  onFilterAmountChange: (v: string) => void;
  onFilterDateChange: (v: string) => void;
  filteredTransactions: CandidateTransaction[];
  selectedTransactionId: string | null;
  onSelectTransaction: (tx: CandidateTransaction) => void;
  isLoading: boolean;
}

export function EligibleTransactionsCard({
  accounts,
  selectedAccountId,
  onAccountChange,
  filterAmount,
  filterDate,
  onFilterAmountChange,
  onFilterDateChange,
  filteredTransactions,
  selectedTransactionId,
  onSelectTransaction,
  isLoading,
}: EligibleTransactionsCardProps) {
  const firstAccountId = accounts[0]?.id ?? '';
  const value = selectedAccountId || firstAccountId;

  return (
    <Card className="bg-card border-2" style={{ borderColor: `${GOLD}33` }}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl text-foreground">
              <CreditCard className="h-5 w-5" style={{ color: GOLD }} />
              Recent Transactions (use amount for EMI)
            </CardTitle>
            <CardDescription>Select an account and pick a transaction to use its amount</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={value} onValueChange={onAccountChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.nickname || acc.accountNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterAmount} onValueChange={onFilterAmountChange}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Amounts</SelectItem>
                <SelectItem value="high">&gt; PKR 50,000</SelectItem>
                <SelectItem value="medium">PKR 20k - 50k</SelectItem>
                <SelectItem value="low">&lt; PKR 20,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDate} onValueChange={onFilterDateChange}>
              <SelectTrigger className="w-[130px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No transactions match the filters. Change account or filters.</p>
        ) : (
          <>
            <div className="hidden md:block rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Merchant / Description</TableHead>
                    <TableHead className="whitespace-nowrap">Category</TableHead>
                    <TableHead className="whitespace-nowrap">Date</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Amount</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Eligible</TableHead>
                    <TableHead className="text-center whitespace-nowrap">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((t) => (
                    <TableRow
                      key={t.id}
                      className="cursor-pointer transition-colors"
                      style={selectedTransactionId === t.id ? { backgroundColor: `${GOLD}1a` } : {}}
                      onClick={() => t.eligible && onSelectTransaction(t)}
                    >
                      <TableCell className="font-medium">{t.merchant}</TableCell>
                      <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{t.date}</TableCell>
                      <TableCell className="text-right font-semibold">PKR {t.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        {t.eligible ? (
                          <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Eligible
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" /> &lt; {MIN_ELIGIBLE_AMOUNT}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!t.eligible}
                          style={t.eligible ? { borderColor: `${GOLD}80` } : {}}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (t.eligible) onSelectTransaction(t);
                          }}
                        >
                          Use amount
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="md:hidden space-y-3">
              {filteredTransactions.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    'rounded-lg border-2 p-4 cursor-pointer transition-all',
                    selectedTransactionId === t.id ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50',
                  )}
                  onClick={() => t.eligible && onSelectTransaction(t)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-foreground">{t.merchant}</h4>
                    <Badge variant="outline" className="text-xs">{t.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>{t.date}</span>
                    <span className="font-semibold text-gold">PKR {t.amount.toLocaleString()}</span>
                  </div>
                  {t.eligible && (
                    <Button
                      size="sm"
                      className="w-full bg-gold text-black hover:bg-gold/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTransaction(t);
                      }}
                    >
                      Use this amount
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
