import {
  CreateEmiPlanSchema,
  EmiPlanSchema,
  GetEmiPlansResponseSchema,
  GetEmiScheduleResponseSchema,
  EmiCalculatorResponseSchema,
} from '@/schema/emi.schema';
import api from './middleware';
import { AxiosError } from 'axios';

type EmiPlanStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE';

export const createEmiPlan = async (payload: CreateEmiPlanSchema) => {
  try {
    const { data } = await api.post('/emi/plans', payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as EmiPlanSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to create EMI plan',
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

export const getEmiPlans = async (params?: { page?: number; limit?: number; status?: EmiPlanStatus }) => {
  try {
    const { data } = await api.get('/emi/plans', {
      params,
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as GetEmiPlansResponseSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch EMI plans',
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

export const getEmiPlanById = async (planId: string) => {
  try {
    const { data } = await api.get(`/emi/plans/${planId}`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as EmiPlanSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch EMI plan',
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

export const getEmiSchedule = async (planId: string) => {
  try {
    const { data } = await api.get(`/emi/plans/${planId}/schedule`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as GetEmiScheduleResponseSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch EMI schedule',
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

export const payEmiInstallment = async (installmentId: string, accountId: string) => {
  try {
    const { data } = await api.post(
      `/emi/installments/${installmentId}/pay`,
      { accountId },
      { withCredentials: true },
    );
    if (data?.success) {
      return {
        success: true,
        response: data.data as EmiPlanSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to pay installment',
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

export const getEmiCalculator = async (
  principal: number,
  tenureMonths: number,
  interestRateAnnual: number,
) => {
  try {
    const { data } = await api.get('/emi/calculator', {
      params: { principal, tenureMonths, interestRateAnnual },
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as EmiCalculatorResponseSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to calculate EMI',
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
