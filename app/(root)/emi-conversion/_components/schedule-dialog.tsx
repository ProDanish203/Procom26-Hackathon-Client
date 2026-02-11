'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { GOLD } from './constants';
import type { EmiPlanSchema, EmiInstallmentSchema } from '@/schema/emi.schema';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleData: { plan: EmiPlanSchema; installments: EmiInstallmentSchema[] } | null;
  scheduleLoading: boolean;
  onPayInstallment: (plan: EmiPlanSchema, installment: EmiInstallmentSchema) => void;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  scheduleData,
  scheduleLoading,
  onPayInstallment,
}: ScheduleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>EMI schedule</DialogTitle>
          <DialogDescription>Installment breakdown. Pay pending ones from your plan account.</DialogDescription>
        </DialogHeader>
        {scheduleLoading || !scheduleData ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              <strong>{scheduleData.plan?.productName || 'EMI'}</strong> — PKR {Number(scheduleData.plan?.emiAmount).toLocaleString()}/month
            </p>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduleData.installments?.map((inst) => (
                    <TableRow key={inst.id}>
                      <TableCell>{inst.installmentNumber}</TableCell>
                      <TableCell>{inst.dueDate.slice(0, 10)}</TableCell>
                      <TableCell className="text-right">PKR {Number(inst.amount).toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={inst.status === 'PAID' ? 'secondary' : 'outline'}
                          style={inst.status === 'PENDING' ? { borderColor: GOLD, color: GOLD } : {}}
                        >
                          {inst.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {inst.status === 'PENDING' && (
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ borderColor: GOLD }}
                            onClick={() => onPayInstallment(scheduleData.plan, inst)}
                          >
                            Pay
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
