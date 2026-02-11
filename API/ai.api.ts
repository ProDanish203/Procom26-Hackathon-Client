import { EmiAffordabilityAnalysisSchema } from '@/schema/ai.schema';
import type { EmiAffordabilityRequestSchema } from '@/schema/ai.schema';
import api from './middleware';
import { AxiosError } from 'axios';

export const analyzeEmiAffordability = async (payload: EmiAffordabilityRequestSchema) => {
  try {
    const { data } = await api.post('/ai/emi/affordability', payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as EmiAffordabilityAnalysisSchema,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to analyze affordability',
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
