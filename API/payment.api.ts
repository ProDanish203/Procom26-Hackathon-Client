// Payment API - Handles all payment-related operations
import { PaymentSchema, GetPaymentsResponse } from '@/schema/payment.schema';
import api from './middleware';
import { AxiosError } from 'axios';

export interface IBFTTransferDto {
  accountId: string;
  beneficiaryId?: string;
  recipientAccount: string;
  recipientBank: string;
  recipientName: string;
  amount: number;
  description: string;
}

export interface RAASTTransferDto {
  accountId: string;
  beneficiaryId?: string;
  recipientIban: string;
  recipientName: string;
  amount: number;
  description: string;
}

export interface BillPaymentDto {
  accountId: string;
  beneficiaryId?: string;
  billerName: string;
  consumerNumber: string;
  amount: number;
  billMonth?: string;
  dueDate?: string;
}

export interface MobileRechargeDto {
  accountId: string;
  mobileNumber: string;
  mobileOperator: string;
  amount: number;
}

export interface GetPaymentsQueryDto {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const initiateIBFT = async (data: IBFTTransferDto) => {
  try {
    const response = await api.post('/payment/ibft', data, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as PaymentSchema,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to initiate IBFT transfer',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};

export const initiateRaast = async (data: RAASTTransferDto) => {
  try {
    const response = await api.post('/payment/raast', data, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as PaymentSchema,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to initiate RAAST transfer',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};

export const payBill = async (data: BillPaymentDto) => {
  try {
    const response = await api.post('/payment/bill', data, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as PaymentSchema,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to pay bill',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};

export const mobileRecharge = async (data: MobileRechargeDto) => {
  try {
    const response = await api.post('/payment/recharge', data, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as PaymentSchema,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to recharge mobile',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};

export const getPaymentHistory = async (query: GetPaymentsQueryDto) => {
  try {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.type) params.append('type', query.type);
    if (query.status) params.append('status', query.status);
    if (query.startDate) params.append('startDate', query.startDate);
    if (query.endDate) params.append('endDate', query.endDate);
    if (query.search) params.append('search', query.search);

    const response = await api.get(`/payment?${params.toString()}`, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as GetPaymentsResponse,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to fetch payment history',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};

export const getPaymentById = async (id: string) => {
  try {
    const response = await api.get(`/payment/${id}`, {
      withCredentials: true,
    });
    if (response.data?.success) {
      return {
        success: true,
        response: response.data.data as PaymentSchema,
      };
    } else {
      return {
        success: false,
        response: response.data?.message || 'Failed to fetch payment',
      };
    }
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        response: error.response?.data?.message || 'An unknown error occurred',
      };
    }
    return { success: false, response: 'An unknown error occurred' };
  }
};
