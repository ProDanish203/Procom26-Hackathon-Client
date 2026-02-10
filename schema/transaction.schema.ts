import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  transactionType: z.string(),
  status: z.string(),
  description: z.string().optional(),
  reference: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BankStatementAccountSchema = z.object({
  id: z.string(),
  accountNumber: z.string(),
  accountType: z.string(),
  accountStatus: z.string(),
  balance: z.union([z.number(), z.string()]),
  currency: z.string(),
  nickname: z.string(),
});

export const BankStatementPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const BankStatementSummarySchema = z.object({
  openingBalance: z.number(),
  closingBalance: z.number(),
  totalDeposits: z.number(),
  totalWithdrawals: z.number(),
  transactionCount: z.number(),
});

export const BankStatementSchema = z.object({
  statementId: z.string(),
  generatedAt: z.string(),
  account: BankStatementAccountSchema,
  period: BankStatementPeriodSchema,
  summary: BankStatementSummarySchema,
  transactions: z.array(z.any()),
});

export type TransactionSchema = z.infer<typeof TransactionSchema>;
export type BankStatementAccountSchema = z.infer<typeof BankStatementAccountSchema>;
export type BankStatementPeriodSchema = z.infer<typeof BankStatementPeriodSchema>;
export type BankStatementSummarySchema = z.infer<typeof BankStatementSummarySchema>;
export type BankStatementSchema = z.infer<typeof BankStatementSchema>;
