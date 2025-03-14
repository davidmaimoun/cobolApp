import { Account, Accounts } from "../types/types";
import apiService from "./apiServices";

const apiEndpoint = '/accounts'

export const getAllAccounts = async(userId: number): Promise<Accounts|null> => {
    return await apiService.get(`${apiEndpoint}/all/${userId}`)
}

export const getUserAccounts = async(userId: number): Promise<Account[]|null> => {
    return await apiService.get(`${apiEndpoint}/${userId}`)
}

// export const getCampaign = async(data: any): Promise<CampaignDB|null> => {
//     return await apiService.post<CampaignDB, CampaignDB>(`${apiEndpoint}/fetch_campaign`, data);
// }

// export const getCampaignScript = async (data: any): Promise<{ js: string } | null> => {
//     return await apiService.post<{ js: string }, any>(`${apiEndpoint}/fetch_campaign/script`, data);
// };

// export const createCampaign = async (data: any) => {
//     return await apiService.post<{ message: string, js:string }, any>(`${apiEndpoint}/create`, data);
  
// }
