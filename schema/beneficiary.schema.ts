import { z } from 'zod';

export const AddBeneficiarySchema = z.object({
  beneficiaryType: z.enum(['RAAST', 'IBFT', 'BILL_PAYMENT', 'MOBILE_TOPUP']),
  nickname: z.string().min(1, 'Nickname is required'),
  accountNumber: z.string().optional(),
  iban: z.string().optional(),
  bankName: z.string().optional(),
  accountTitle: z.string().optional(),
  consumerNumber: z.string().optional(),
  billerName: z.string().optional(),
  billerCategory: z.string().optional(),
  mobileNumber: z.string().optional(),
  mobileOperator: z.string().optional(),
});

export const BeneficiarySchema = z.object({
  id: z.string(),
  beneficiaryType: z.enum(['RAAST', 'IBFT', 'BILL_PAYMENT', 'MOBILE_TOPUP']),
  nickname: z.string(),
  accountNumber: z.string().nullable().optional(),
  iban: z.string().nullable().optional(),
  bankName: z.string().nullable().optional(),
  accountTitle: z.string().nullable().optional(),
  consumerNumber: z.string().nullable().optional(),
  billerName: z.string().nullable().optional(),
  billerCategory: z.string().nullable().optional(),
  mobileNumber: z.string().nullable().optional(),
  mobileOperator: z.string().nullable().optional(),
  isFavorite: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AddBeneficiarySchema = z.infer<typeof AddBeneficiarySchema>;
export type BeneficiarySchema = z.infer<typeof BeneficiarySchema>;
