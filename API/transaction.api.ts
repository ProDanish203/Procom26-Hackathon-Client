import { BankStatementSchema } from '@/schema/transaction.schema';
import api from './middleware';
import { AxiosError } from 'axios';

export const getBankStatement = async (accountId: string, startDate: string, endDate: string) => {
  try {
    const { data } = await api.get(`/transaction/account/${accountId}/bank-statement`, {
      params: { startDate, endDate },
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as BankStatementSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch bank statement',
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

export const getAccountTransactions = async (
  accountId: string,
  params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  },
) => {
  try {
    const { data } = await api.get(`/transaction/account/${accountId}`, {
      params,
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch transactions',
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

export const getTransactionById = async (transactionId: string) => {
  try {
    const { data } = await api.get(`/transaction/${transactionId}`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch transaction',
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
