import axios, { AxiosResponse } from 'axios';

interface ConversionResponse {
  data: {
    [currency: string]: number;
  };
}

const API_KEY: string | undefined = import.meta.env.VITE_API_KEY;
const API_URL: string = 'https://api.freecurrencyapi.com/v1/latest';

export const convertCurrency = async (
  from: string,
  to: string,
  amount: number
): Promise<string> => {
  try {
    const response: AxiosResponse<ConversionResponse> = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        base_currency: from,
        currencies: to,
      },
    });

    const conversionRate: number = response.data.data[to];
    const result: string = (amount * conversionRate).toFixed(3);
    return result;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
};
