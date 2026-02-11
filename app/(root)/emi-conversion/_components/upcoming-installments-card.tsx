'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Loader2 } from 'lucide-react';
import { GOLD } from './constants';

export interface UpcomingInstallmentRow {
  dueDate: string;
  productName: string;
  amount: number;
  status: string;
  paidAt?: string;
}

interface UpcomingInstallmentsCardProps {
  installments: UpcomingInstallmentRow[];
  isLoading?: boolean;
}

export function UpcomingInstallmentsCard({ installments, isLoading }: UpcomingInstallmentsCardProps) {
  return (
    <Card style={{ borderColor: `${GOLD}33` }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Calendar className="h-5 w-5" style={{ color: GOLD }} />
          EMI installments
        </CardTitle>
        <CardDescription>Paid and upcoming installments across all your EMI plans. Open a plan’s Schedule to pay pending ones.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : installments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No installments in this period. Create an EMI plan or adjust the date range.</p>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Due date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Paid on</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {installments.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{row.dueDate.slice(0, 10)}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell className="text-right">PKR {row.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      {row.status === 'PAID' ? (
                        <Badge variant="secondary">Paid</Badge>
                      ) : (
                        <Badge variant="outline" style={{ borderColor: GOLD, color: GOLD }}>
                          {row.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground text-sm">
                      {row.paidAt ?? '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
