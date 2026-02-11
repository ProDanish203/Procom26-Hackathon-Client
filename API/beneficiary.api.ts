import { AddBeneficiarySchema, BeneficiarySchema } from '@/schema/beneficiary.schema';
import api from './middleware';
import { AxiosError } from 'axios';

export const addBeneficiary = async (payload: AddBeneficiarySchema) => {
  try {
    const { data } = await api.post('/beneficiary', payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as BeneficiarySchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to add beneficiary',
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

export const getAllBeneficiaries = async (type?: string, isFavorite?: boolean) => {
  try {
    const params: any = {};
    if (type) params.type = type;
    if (isFavorite !== undefined) params.isFavorite = isFavorite;

    const { data } = await api.get('/beneficiary', {
      params,
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as { beneficiaries: BeneficiarySchema[] },
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch beneficiaries',
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

export const deleteBeneficiary = async (id: string) => {
  try {
    const { data } = await api.delete(`/beneficiary/${id}`, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.message || 'Beneficiary deleted successfully',
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to delete beneficiary',
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

export const toggleFavorite = async (id: string) => {
  try {
    const { data } = await api.patch(`/beneficiary/${id}/favorite`, {}, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as BeneficiarySchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to toggle favorite',
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
