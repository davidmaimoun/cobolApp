
export type MyColors = "primary" | "secondary" | "success" | "info" | "warning" | "danger";

export interface User {
    id: string;
    username: string;
}

export interface Account {
    account_number: string
    first_name: string
    last_name: string
    balance: number
    balance_status: string
}

export interface TranferData {
    from_id: string
    to_id: string
    amount: number
}

export interface TransactionData {
    id: string
    from_account: string
    to_account: string
    amount: number
    date: string
}