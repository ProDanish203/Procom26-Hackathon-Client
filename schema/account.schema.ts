import { z } from 'zod';

export const CreateAccountSchema = z.object({
  accountType: z.enum(['CURRENT', 'SAVINGS']),
  nickname: z.string().min(1, 'Nickname is required'),
  creditLimit: z.number().positive('Credit limit must be positive'),
});

export const UpdateAccountSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required').optional(),
  accountStatus: z.enum(['ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED', 'BLOCKED']).optional(),
});

export const AccountSchema = z.object({
  id: z.string(),
  accountType: z.enum(['CURRENT', 'SAVINGS']),
  accountNumber: z.string(),
  iban: z.string(),
  balance: z.union([z.number(), z.string()]),
  nickname: z.string(),
  creditLimit: z.union([z.number(), z.string()]),
  accountStatus: z.enum(['ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED', 'BLOCKED']),
  routingNumber: z.string().optional(),
  currency: z.string().optional(),
  availableCredit: z.union([z.number(), z.string(), z.null()]).optional(),
  dueDate: z.string().nullable().optional(),
  closedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof UpdateAccountSchema>;
export type AccountSchema = z.infer<typeof AccountSchema>;

// Dashboard Schema
export const DashboardSummarySchema = z.object({
  totalBalance: z.number(),
  totalAccounts: z.number(),
  activeAccounts: z.number(),
  totalCreditLimit: z.number(),
  totalAvailableCredit: z.number(),
});

export const DashboardDataSchema = z.object({
  accounts: z.array(AccountSchema),
  summary: DashboardSummarySchema,
  recentTransactions: z.array(z.any()), // We'll define transaction schema later
});

// Statement Schema
export const StatementSummarySchema = z.object({
  openingBalance: z.number(),
  closingBalance: z.number(),
  totalDeposits: z.number(),
  totalWithdrawals: z.number(),
  transactionCount: z.number(),
});

export const StatementPeriodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const AccountStatementSchema = z.object({
  account: AccountSchema,
  transactions: z.array(z.any()), // Transaction details
  period: StatementPeriodSchema,
  summary: StatementSummarySchema,
});

export type DashboardSummarySchema = z.infer<typeof DashboardSummarySchema>;
export type DashboardDataSchema = z.infer<typeof DashboardDataSchema>;
export type StatementSummarySchema = z.infer<typeof StatementSummarySchema>;
export type StatementPeriodSchema = z.infer<typeof StatementPeriodSchema>;
export type AccountStatementSchema = z.infer<typeof AccountStatementSchema>;
