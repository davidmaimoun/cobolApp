import { Account, TranferData } from "../types/types";
import apiService from "./apiServices";

const apiEndpoint = '/transfer'

export const transferToAnotherUser = async(data: TranferData): Promise<{message: string}|null> => {
    return await apiService.post<{message: string}, TranferData>(apiEndpoint, data)
}