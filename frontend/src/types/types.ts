
export type MyColors = "primary" | "secondary" | "success" | "info" | "warning" | "danger";

export interface User {
    id: number;
    username: string;
}

export interface Account {
    account_number: string
    user_id: number
    first_name: string
    last_name: string
    balance: number
    balance_status: string
}
export interface Accounts {
    destination: Account[]
    from: Account[]
}

export interface TranferData {
    from_user_id: number,
    destination_user_id: number,
    from_account: string
    to_account: string
    amount: number
}

export interface TransactionData {
    id: string
    from_account: string
    to_account: string
    amount: number
    date: string
}