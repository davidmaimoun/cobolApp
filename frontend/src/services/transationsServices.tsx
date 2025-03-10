import { TransactionData } from "../types/types";
import apiService from "./apiServices";

const apiEndpoint = '/transactions'

export const getTransactions = async(userId: string): Promise<TransactionData[]|null> => {
    return await apiService.get(`${apiEndpoint}/${userId}`)
}


