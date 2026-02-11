import { z } from 'zod';

export const EmiPlanStatusEnum = z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED', 'OVERDUE']);
export const EmiInstallmentStatusEnum = z.enum(['PENDING', 'PAID', 'OVERDUE']);

export const CreateEmiPlanSchema = z.object({
  accountId: z.string().uuid(),
  productName: z.string().optional(),
  principal: z.number().min(1000).max(50000000),
  interestRateAnnual: z.number().min(0.1).max(50),
  tenureMonths: z.number().int().min(1).max(360),
  startDate: z.string().optional(),
});

export const EmiPlanAccountSchema = z.object({
  id: z.string(),
  accountNumber: z.string(),
  accountType: z.string(),
  nickname: z.string().nullable().optional(),
});

export const EmiPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  productName: z.string().nullable().optional(),
  principal: z.union([z.number(), z.string()]),
  interestRateAnnual: z.union([z.number(), z.string()]),
  tenureMonths: z.number(),
  emiAmount: z.union([z.number(), z.string()]),
  currency: z.string(),
  status: EmiPlanStatusEnum,
  startDate: z.string(),
  endDate: z.string(),
  nextDueDate: z.string().nullable().optional(),
  totalInterest: z.union([z.number(), z.string()]),
  createdAt: z.string(),
  updatedAt: z.string(),
  account: EmiPlanAccountSchema.optional(),
});

export const EmiInstallmentSchema = z.object({
  id: z.string(),
  emiPlanId: z.string(),
  installmentNumber: z.number(),
  dueDate: z.string(),
  amount: z.union([z.number(), z.string()]),
  principalComponent: z.union([z.number(), z.string()]),
  interestComponent: z.union([z.number(), z.string()]),
  status: EmiInstallmentStatusEnum,
  paidAt: z.string().nullable().optional(),
  paymentId: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GetEmiPlansResponseSchema = z.object({
  plans: z.array(EmiPlanSchema),
  pagination: z.object({
    totalCount: z.number(),
    totalPages: z.number(),
    page: z.number(),
    limit: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

export const GetEmiScheduleResponseSchema = z.object({
  plan: EmiPlanSchema,
  installments: z.array(EmiInstallmentSchema),
});

export const EmiCalculatorResponseSchema = z.object({
  emiAmount: z.number(),
  totalInterest: z.number(),
  totalAmount: z.number(),
  schedulePreview: z.array(
    z.object({
      installmentNumber: z.number(),
      dueMonth: z.number(),
      amount: z.number(),
      principalComponent: z.number(),
      interestComponent: z.number(),
    }),
  ),
});

export type CreateEmiPlanSchema = z.infer<typeof CreateEmiPlanSchema>;
export type EmiPlanSchema = z.infer<typeof EmiPlanSchema>;
export type EmiInstallmentSchema = z.infer<typeof EmiInstallmentSchema>;
export type GetEmiPlansResponseSchema = z.infer<typeof GetEmiPlansResponseSchema>;
export type GetEmiScheduleResponseSchema = z.infer<typeof GetEmiScheduleResponseSchema>;
export type EmiCalculatorResponseSchema = z.infer<typeof EmiCalculatorResponseSchema>;
