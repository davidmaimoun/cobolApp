import axios, { AxiosResponse } from "axios";
import { ApiCall } from "../config/apiCall";
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: ApiCall.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.message || "An error occurred with the server";
    } else {
      return "Network error or no response from server";
    }
  }
  return "An unexpected error occurred";
};

const apiService = {
  get: async <T>(endpoint: string): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get(endpoint);
      return response.data;
    } 
    catch (error) {
      const errorMessage = handleError(error);
      console.error("Error in GET request:", errorMessage);
      return null; 
    }
  },

  post: async <T, D>(endpoint: string, data: D): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
      return response.data;
    } 
    catch (error) {
      const errorMessage = handleError(error);
      console.error("Error in POST request:", errorMessage);
      toast.error(errorMessage)
      return null
    }
  },


  put: async <T, D>(endpoint: string, data: D): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error in PUT request:", errorMessage);
      return null; // You can return null or throw error depending on your design
    }
  },

  delete: async <T>(endpoint: string): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error("Error in DELETE request:", errorMessage);
      return null; // You can return null or throw error depending on your design
    }
  },
};

export default apiService;
