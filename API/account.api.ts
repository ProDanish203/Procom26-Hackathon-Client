import { CreateAccountSchema, AccountSchema, DashboardDataSchema, UpdateAccountSchema, AccountStatementSchema } from '@/schema/account.schema';
import api from './middleware';
import { AxiosError } from 'axios';

export const createAccount = async (payload: CreateAccountSchema) => {
  try {
    const { data } = await api.post('/account', payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as AccountSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to create account',
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

export const getAllAccounts = async (status?: 'ACTIVE' | 'INACTIVE' | 'FROZEN' | 'CLOSED') => {
  try {
    const params = status ? { status } : {};
    const { data } = await api.get('/account', {
      params,
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as AccountSchema[],
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch accounts',
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

export const getDashboardData = async () => {
  try {
    const { data } = await api.get('/account/dashboard', {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as DashboardDataSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch dashboard data',
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

export const getAccountById = async (id: string) => {
  try {
    const { data } = await api.get(`/account/${id}`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as AccountSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch account',
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

export const updateAccount = async (id: string, payload: UpdateAccountSchema) => {
  try {
    const { data } = await api.put(`/account/${id}`, payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as AccountSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to update account',
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

export const closeAccount = async (id: string) => {
  try {
    const { data } = await api.delete(`/account/${id}`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.message || 'Account closed successfully',
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to close account',
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

export const getAccountStatement = async (id: string, startDate: string, endDate: string) => {
  try {
    const { data } = await api.get(`/account/${id}/statement`, {
      params: { startDate, endDate },
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as AccountStatementSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch account statement',
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
