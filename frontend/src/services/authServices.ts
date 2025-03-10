import { User } from "../types/types";
import apiService from "./apiServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "auth_token";
const apiEndpoint = '/login';

export const login = async (data: any): Promise<string> => {
    const response = await apiService.post<{ token: string }, any>(apiEndpoint, data);
    return response ? response.token : ''
};

export const  storeToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const  getToken = (TOKEN_KEY: string) => {
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  }

export const  getUserFromToken = (): User | null => {
    try {
      const token = getToken(TOKEN_KEY)
      if (token) {
        return jwtDecode(token);
      }
      else
        return null
    } 
    catch (error) {
      return null;
    }
  }
