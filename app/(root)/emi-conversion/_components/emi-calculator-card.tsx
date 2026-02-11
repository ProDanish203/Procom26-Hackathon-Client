'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Calculator } from 'lucide-react';
import { GOLD, tenureOptions, calcEmi } from './constants';
import { cn } from '@/lib/utils';

interface EmiCalculatorCardProps {
  principal: number;
  tenure: number;
  interestRate: number;
  onPrincipalChange: (v: number) => void;
  onTenureChange: (v: number) => void;
  onInterestRateChange: (v: number) => void;
}

export function EmiCalculatorCard({
  principal,
  tenure,
  interestRate,
  onPrincipalChange,
  onTenureChange,
  onInterestRateChange,
}: EmiCalculatorCardProps) {
  const monthlyPayment = calcEmi(principal, interestRate, tenure);
  const totalPayment = monthlyPayment * tenure;
  const totalInterest = totalPayment - principal;

  return (
    <Card style={{ borderColor: `${GOLD}33` }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Calculator className="h-5 w-5" style={{ color: GOLD }} />
          EMI Calculator
        </CardTitle>
        <CardDescription>Amount, tenure and interest rate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Principal (PKR)</Label>
            <Input
              id="amount"
              type="number"
              min={1000}
              value={principal}
              onChange={(e) => onPrincipalChange(Number(e.target.value) || 0)}
              className="text-lg font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label>Interest rate (% p.a.)</Label>
            <Input
              type="number"
              min={0.1}
              max={50}
              step={0.5}
              value={interestRate}
              onChange={(e) => onInterestRateChange(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Tenure</Label>
              <span className="text-sm font-semibold" style={{ color: GOLD }}>{tenure} months</span>
            </div>
            <Slider value={[tenure]} onValueChange={(v) => onTenureChange(v[0])} min={3} max={24} step={3} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 months</span>
              <span>24 months</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tenureOptions.map((opt) => (
              <Button
                key={opt}
                variant={tenure === opt ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTenureChange(opt)}
                style={tenure === opt ? { backgroundColor: GOLD, borderColor: GOLD } : {}}
                className={cn(tenure === opt && 'text-black hover:opacity-90')}
              >
                {opt}M
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 rounded-lg border p-4" style={{ borderColor: `${GOLD}33`, backgroundColor: `${GOLD}0d` }}>
              <p className="text-sm text-muted-foreground">Monthly EMI</p>
              <p className="text-2xl font-bold" style={{ color: GOLD }}>
                PKR {monthlyPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="space-y-1 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-2xl font-bold">PKR {totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
          <div className="space-y-1 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total Payment</p>
            <p className="text-2xl font-bold">PKR {totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-muted-foreground">Interest: {interestRate}% p.a.</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Tenure comparison</Label>
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
                {([3, 6, 12, 18] as const).map((tMonths) => {
                  const mp = calcEmi(principal, interestRate, tMonths);
                  const ti = mp * tMonths - principal;
                  return (
                    <TableRow key={tMonths} style={tMonths === tenure ? { backgroundColor: `${GOLD}1a` } : {}}>
                      <TableCell className="font-medium">{tMonths} months</TableCell>
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
  );
}
