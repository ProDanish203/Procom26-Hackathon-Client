import { z } from 'zod';

export const PaymentTypeEnum = z.enum([
  'INTERBANK_TRANSFER',
  'IBFT_TRANSFER',
  'RAAST_TRANSFER',
  'UTILITY_BILL',
  'TELECOM_BILL',
  'CREDIT_CARD_PAYMENT',
  'EDUCATION_FEE',
  'TAX_PAYMENT',
  'INSURANCE_PREMIUM',
  'MOBILE_RECHARGE',
  'OTHER',
]);

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
]);

export const PaymentSchemaZod = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  beneficiaryId: z.string().nullable().optional(),
  paymentType: PaymentTypeEnum,
  paymentStatus: PaymentStatusEnum,
  amount: z.number(),
  fee: z.number(),
  totalAmount: z.number(),
  currency: z.string(),
  recipientName: z.string().nullable().optional(),
  recipientAccount: z.string().nullable().optional(),
  recipientBank: z.string().nullable().optional(),
  recipientIban: z.string().nullable().optional(),
  billerName: z.string().nullable().optional(),
  consumerNumber: z.string().nullable().optional(),
  billAmount: z.number().nullable().optional(),
  billMonth: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
  mobileNumber: z.string().nullable().optional(),
  mobileOperator: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  reference: z.string(),
  processedAt: z.string().nullable().optional(),
  completedAt: z.string().nullable().optional(),
  failedAt: z.string().nullable().optional(),
  failureReason: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type PaymentSchema = z.infer<typeof PaymentSchemaZod>;

export const GetPaymentsResponseZod = z.object({
  payments: z.array(PaymentSchemaZod),
  pagination: z.object({
    totalCount: z.number(),
    totalPages: z.number(),
    page: z.number(),
    limit: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

export type GetPaymentsResponse = z.infer<typeof GetPaymentsResponseZod>;
