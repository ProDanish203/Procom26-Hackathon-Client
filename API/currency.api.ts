import api from './middleware';
import { AxiosError } from 'axios';

export interface CurrencyRate {
  rate: number;
  from: string;
  to: string;
}

export interface CurrencyStats {
  rates: Record<string, any>;
  current: number;
  avg30: number;
  min: number;
  max: number;
  volatility: number;
}

export interface TransferRecommendation {
  recommendation: 'transfer_now' | 'wait';
  reasoning: string;
  potentialSavings: number;
  riskLevel: 'low' | 'medium' | 'high';
  suggestedTimeframe: string;
  confidenceScore: number;
}

export interface CurrencyAnalysisResponse {
  currentRate: number;
  historicalData: CurrencyStats;
  recommendation: TransferRecommendation;
  estimatedAmount: number;
}

export const getCurrentRate = async (from: string, to: string) => {
  try {
    const { data } = await api.get('/currency/rate', {
      params: { from, to },
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as CurrencyRate,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch exchange rate',
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

export const getCurrencyTrends = async (from: string, to: string, days: number = 30) => {
  try {
    const { data } = await api.get('/currency/trends', {
      params: { from, to, days },
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as CurrencyStats,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to fetch currency trends',
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

export const analyzeTransfer = async (payload: {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}) => {
  try {
    const { data } = await api.post('/currency/analyze', payload, {
      withCredentials: true,
    });
    if (data?.success) {
      return {
        success: true,
        response: data.data as CurrencyAnalysisResponse,
      };
    } else {
      return {
        success: false,
        response: data?.message || 'Failed to analyze transfer',
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
