import { TransactionData } from "../types/types";
import apiService from "./apiServices";

const apiEndpoint = '/transactions'

export const getTransactions = async(userId: number): Promise<TransactionData[]|null> => {
    return await apiService.get(`${apiEndpoint}/${userId}`)
}


