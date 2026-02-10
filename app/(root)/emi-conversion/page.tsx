'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Calculator,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  Filter,
  Sparkles,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Gold color constant
const GOLD = 'rgb(212, 175, 55)';

// Mock data
const mockTransactions = [
  { id: 1, merchant: 'Amazon', amount: 45000, date: '2026-02-08', category: 'Shopping', eligible: true },
  { id: 2, merchant: 'Best Buy', amount: 32000, date: '2026-02-07', category: 'Electronics', eligible: true },
  { id: 3, merchant: 'Apple Store', amount: 89000, date: '2026-02-05', category: 'Electronics', eligible: true },
  { id: 4, merchant: 'IKEA', amount: 28000, date: '2026-02-03', category: 'Furniture', eligible: true },
  { id: 5, merchant: 'Nike Store', amount: 15000, date: '2026-02-01', category: 'Shopping', eligible: false },
];

const mockActiveEMIs = [
  { id: 1, merchant: 'Samsung', amount: 65000, tenure: 12, monthlyPayment: 5625, remaining: 8, nextDue: '2026-02-15' },
  { id: 2, merchant: 'Sony', amount: 42000, tenure: 6, monthlyPayment: 7200, remaining: 3, nextDue: '2026-02-20' },
];

export default function EMIConversionPage() {
  const [activeTab, setActiveTab] = useState<'convert' | 'dashboard'>('convert');
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const [emiAmount, setEmiAmount] = useState<number>(45000);
  const [tenure, setTenure] = useState<number>(6);
  const [filterAmount, setFilterAmount] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  const interestRate = 14;
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment = (emiAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayment = monthlyPayment * tenure;
  const totalInterest = totalPayment - emiAmount;

  const tenureOptions = [3, 6, 9, 12, 18, 24];

  const aiEligibility = {
    approved: emiAmount >= 10000 && emiAmount <= 100000,
    score: 85,
    reasons: emiAmount >= 10000 && emiAmount <= 100000
      ? ['Excellent credit history', 'Stable income verified', 'Low debt-to-income ratio']
      : ['Amount below minimum threshold', 'Insufficient transaction history'],
  };

  const aiRecommendations = {
    suggestedTenure: emiAmount > 50000 ? 12 : 6,
    affordabilityScore: 92,
    budgetImpact: 'Low',
    insights: [
      `Recommended tenure: ${emiAmount > 50000 ? '12' : '6'} months for optimal affordability`,
      'Your monthly EMI will be ' + ((monthlyPayment / 50000) * 100).toFixed(1) + '% of average income',
      'This EMI fits well within your spending pattern',
    ],
  };

  const filteredTransactions = mockTransactions.filter((t) => {
    const amountMatch = filterAmount === 'all' || 
      (filterAmount === 'high' && t.amount > 50000) ||
      (filterAmount === 'medium' && t.amount >= 20000 && t.amount <= 50000) ||
      (filterAmount === 'low' && t.amount < 20000);
    
    const dateMatch = filterDate === 'all' ||
      (filterDate === 'week' && new Date(t.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filterDate === 'month' && new Date(t.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return amountMatch && dateMatch;
  });

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: GOLD }}>
          EMI Conversion Center
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Convert your purchases into easy monthly installments with AI-powered recommendations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b overflow-x-auto">
        <Button
          variant="ghost"
          className={cn('relative rounded-b-none whitespace-nowrap', activeTab === 'convert' && 'bg-accent')}
          style={activeTab === 'convert' ? { borderBottom: `2px solid ${GOLD}` } : {}}
          onClick={() => setActiveTab('convert')}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Convert to EMI
        </Button>
        <Button
          variant="ghost"
          className={cn('relative rounded-b-none whitespace-nowrap', activeTab === 'dashboard' && 'bg-accent')}
          style={activeTab === 'dashboard' ? { borderBottom: `2px solid ${GOLD}` } : {}}
          onClick={() => setActiveTab('dashboard')}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          EMI Dashboard
        </Button>
      </div>

      {/* Convert to EMI Tab */}
      {activeTab === 'convert' && (
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Eligible Transactions */}
            <Card style={{ borderColor: `${GOLD}33` }}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <CreditCard className="h-5 w-5" style={{ color: GOLD }} />
                      Eligible Transactions
                    </CardTitle>
                    <CardDescription className="text-sm">Select a transaction to convert into EMI</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Select value={filterAmount} onValueChange={setFilterAmount}>
                      <SelectTrigger className="w-[130px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Amounts</SelectItem>
                        <SelectItem value="high">&gt; PKR 50,000</SelectItem>
                        <SelectItem value="medium">PKR 20k - PKR 50k</SelectItem>
                        <SelectItem value="low">&lt; PKR 20,000</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterDate} onValueChange={setFilterDate}>
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
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Merchant</TableHead>
                        <TableHead className="whitespace-nowrap">Category</TableHead>
                        <TableHead className="whitespace-nowrap">Date</TableHead>
                        <TableHead className="text-right whitespace-nowrap">Amount</TableHead>
                        <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                        <TableHead className="text-center whitespace-nowrap">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          className={cn('cursor-pointer transition-colors')}
                          style={selectedTransaction === transaction.id ? { backgroundColor: `${GOLD}1a` } : {}}
                          onClick={() => {
                            if (transaction.eligible) {
                              setSelectedTransaction(transaction.id);
                              setEmiAmount(transaction.amount);
                            }
                          }}
                        >
                          <TableCell className="font-medium">{transaction.merchant}</TableCell>
                          <TableCell><Badge variant="outline">{transaction.category}</Badge></TableCell>
                          <TableCell className="text-muted-foreground text-sm">{transaction.date}</TableCell>
                          <TableCell className="text-right font-semibold">PKR {transaction.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            {transaction.eligible ? (
                              <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Eligible
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <XCircle className="mr-1 h-3 w-3" />
                                Not Eligible
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={!transaction.eligible}
                              style={transaction.eligible ? { borderColor: `${GOLD}80` } : {}}
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* EMI Calculator */}
            <Card style={{ borderColor: `${GOLD}33` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Calculator className="h-5 w-5" style={{ color: GOLD }} />
                  EMI Calculator
                </CardTitle>
                <CardDescription>Calculate your monthly installments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (PKR )</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={emiAmount}
                      onChange={(e) => setEmiAmount(Number(e.target.value))}
                      className="text-lg font-semibold"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Tenure</Label>
                      <span className="text-sm font-semibold" style={{ color: GOLD }}>{tenure} months</span>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      min={3}
                      max={24}
                      step={3}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>3 months</span>
                      <span>24 months</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {tenureOptions.map((option) => (
                      <Button
                        key={option}
                        variant={tenure === option ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTenure(option)}
                        style={tenure === option ? { backgroundColor: GOLD, borderColor: GOLD } : {}}
                        className={cn(tenure === option && 'text-black hover:opacity-90')}
                      >
                        {option}M
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Calculation Results */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 rounded-lg border p-4" style={{ borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }}>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      <p className="text-2xl font-bold" style={{ color: GOLD }}>PKR {monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div className="space-y-1 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-2xl font-bold">PKR {totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>

                  <div className="space-y-1 rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Total Payment</p>
                    <p className="text-2xl font-bold">PKR {totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground">Interest Rate: {interestRate}% p.a.</p>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="space-y-2">
                  <Label>Tenure Comparison</Label>
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tenure</TableHead>
                          <TableHead className="text-right">Monthly EMI</TableHead>
                          <TableHead className="text-right">Total Interest</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[3, 6, 12, 18].map((t) => {
                          const mp = (emiAmount * monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);
                          const ti = (mp * t) - emiAmount;
                          return (
                            <TableRow key={t} style={t === tenure ? { backgroundColor: `${GOLD}1a` } : {}}>
                              <TableCell className="font-medium">{t} months</TableCell>
                              <TableCell className="text-right">PKR {mp.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                              <TableCell className="text-right">PKR {ti.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 md:space-y-6">
            {/* Eligibility Status */}
            <Card className="border-2" style={{ borderColor: aiEligibility.approved ? GOLD : '#666', backgroundColor: aiEligibility.approved ? `${GOLD}0d` : 'transparent' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  {aiEligibility.approved ? (
                    <CheckCircle2 className="h-5 w-5" style={{ color: GOLD }} />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  Eligibility Status
                </CardTitle>
                <CardDescription>AI-powered approval analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Approval Score</span>
                  <span className="text-2xl font-bold" style={{ color: aiEligibility.approved ? GOLD : '#666' }}>
                    {aiEligibility.score}%
                  </span>
                </div>
                
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${aiEligibility.score}%`, backgroundColor: aiEligibility.approved ? GOLD : '#666' }}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Analysis</p>
                  <ul className="space-y-2">
                    {aiEligibility.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: aiEligibility.approved ? GOLD : '#666' }} />
                        <span className="text-muted-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {aiEligibility.approved && (
                  <Button className="w-full text-black hover:opacity-90" size="lg" style={{ backgroundColor: GOLD }}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Convert to EMI
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card style={{ borderColor: `${GOLD}33`, background: `linear-gradient(to bottom right, ${GOLD}0d, transparent)` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Sparkles className="h-5 w-5" style={{ color: GOLD }} />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Personalized insights for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3" style={{ borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }}>
                    <span className="text-sm font-medium">Suggested Tenure</span>
                    <Badge className="text-black" style={{ backgroundColor: GOLD }}>
                      {aiRecommendations.suggestedTenure} months
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">Affordability Score</span>
                    <span className="text-lg font-bold" style={{ color: GOLD }}>{aiRecommendations.affordabilityScore}%</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">Budget Impact</span>
                    <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                      {aiRecommendations.budgetImpact}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" style={{ color: GOLD }} />
                    Key Insights
                  </p>
                  <ul className="space-y-2">
                    {aiRecommendations.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="mt-1 h-1 w-1 rounded-full" style={{ backgroundColor: GOLD }} />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* EMI Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4 md:space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Card style={{ borderColor: `${GOLD}33` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active EMIs</CardTitle>
                <CreditCard className="h-4 w-4" style={{ color: GOLD }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockActiveEMIs.length}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card style={{ borderColor: `${GOLD}33` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Obligation</CardTitle>
                <DollarSign className="h-4 w-4" style={{ color: GOLD }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  PKR {mockActiveEMIs.reduce((sum, emi) => sum + emi.monthlyPayment, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total monthly payment</p>
              </CardContent>
            </Card>

            <Card style={{ borderColor: `${GOLD}33` }} className="sm:col-span-2 md:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                <Clock className="h-4 w-4" style={{ color: GOLD }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Feb 15</div>
                <p className="text-xs text-muted-foreground">5 days remaining</p>
              </CardContent>
            </Card>
          </div>

          {/* Active EMIs */}
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <TrendingUp className="h-5 w-5" style={{ color: GOLD }} />
                Active EMI Plans
              </CardTitle>
              <CardDescription>Track your ongoing installment payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActiveEMIs.map((emi) => {
                  const progress = ((emi.tenure - emi.remaining) / emi.tenure) * 100;
                  return (
                    <div key={emi.id} className="rounded-lg border p-4 space-y-3" style={{ borderColor: `${GOLD}33` }}>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h4 className="font-semibold">{emi.merchant}</h4>
                          <p className="text-sm text-muted-foreground">
                            PKR {emi.amount.toLocaleString()} • {emi.tenure} months
                          </p>
                        </div>
                        <Badge className="text-black w-fit" style={{ backgroundColor: GOLD }}>
                          PKR {emi.monthlyPayment.toLocaleString()}/mo
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {emi.tenure - emi.remaining} of {emi.tenure} paid
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full transition-all"
                            style={{ width: `${progress}%`, background: `linear-gradient(to right, ${GOLD}, ${GOLD}cc)` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Next Due:</span>
                          <span className="font-medium">{emi.nextDue}</span>
                        </div>
                        <Button variant="outline" size="sm" style={{ borderColor: `${GOLD}80` }}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Payment Schedule */}
          <Card style={{ borderColor: `${GOLD}33` }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Calendar className="h-5 w-5" style={{ color: GOLD }} />
                Upcoming Payment Schedule
              </CardTitle>
              <CardDescription>Your payment calendar for the next 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Date</TableHead>
                      <TableHead className="whitespace-nowrap">Merchant</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Amount</TableHead>
                      <TableHead className="text-center whitespace-nowrap">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">2026-02-15</TableCell>
                      <TableCell>Samsung</TableCell>
                      <TableCell className="text-right">PKR 5,625</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>Upcoming</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2026-02-20</TableCell>
                      <TableCell>Sony</TableCell>
                      <TableCell className="text-right">PKR 7,200</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>Upcoming</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2026-03-15</TableCell>
                      <TableCell>Samsung</TableCell>
                      <TableCell className="text-right">PKR 5,625</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">Scheduled</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2026-03-20</TableCell>
                      <TableCell>Sony</TableCell>
                      <TableCell className="text-right">PKR 7,200</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">Scheduled</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
