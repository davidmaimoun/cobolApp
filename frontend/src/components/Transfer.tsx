import React, { useEffect, useState } from "react";
import MyButton from "./all/Button";
import MyTitle from "./all/Title";
import { toast } from 'react-toastify';
import { getUserFromToken } from "../services/authServices";
import { useAuth } from "../contexts/UserContext";
import { Account, TranferData } from "../types/types";
import { transferToAnotherUser } from "../services/tranferServices";
import { getAllAccounts } from "../services/accountServices";
import { useSelect } from "../hooks/useSelect";


const Transfer: React.FC = () => {
    const { user, updateUser } = useAuth();
    const { 
        selected: fromAccountSelected, 
        SelectComponent: SelectFromAccount, 
        setOptions: setFromOptions } = useSelect([]);

    const { 
        selected: toAccountSelected, 
        SelectComponent: SelectToAccount, 
        setOptions: setToOptions } = useSelect([]);

    const [amountToTransfer, setAmountToTransfer] = useState<number>(0)
    
    const [destinationAccounts, setDestinationAccounts] = useState<Account[]>([])
   
    useEffect(() => {
        const currentUser = getUserFromToken()
        if (!currentUser)
            return

        updateUser(currentUser)   
        
    
        const fetchAccounts = async () => {
            try {
                const accountsFetched = await getAllAccounts(currentUser.id);
                
                if (!accountsFetched)
                    return toast.error('no accounts in the db')
                
                setDestinationAccounts(accountsFetched.destination)
                
                const destinationAccountsNumber = accountsFetched.destination.map(a => a.account_number)
                const fromAccountsNumber = accountsFetched.from.map(a => a.account_number)
                
                setToOptions(destinationAccountsNumber)
                setFromOptions(fromAccountsNumber)

            } 
            catch (err) {
                console.error(err);
            }
                        
            };
            fetchAccounts() 
        
        

    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user)
            return toast.info("You need to loggin");

        if (!toAccountSelected) 
            return toast.info("Please select an destination account number")

        if (!fromAccountSelected) 
            return toast.info("Please select on of your account number")

        if (amountToTransfer <= 0) 
            return toast.info("Amount has to be > 0")
        
        const destinationUserID = destinationAccounts.find(d => d.account_number)?.user_id

        if (!destinationUserID) 
            return toast.error("Error with the destination account")

        const dataToTransfer: TranferData = {
            from_user_id: user.id,
            destination_user_id: destinationUserID,
            from_account: fromAccountSelected,
            to_account: toAccountSelected,
            amount: amountToTransfer,
        }

        try {
            const response = await transferToAnotherUser(dataToTransfer) 
            console.log(response)
            if (response)
                toast.success(response.message)
        } catch (error) {
            console.log("[Tranfer] : Error", e)
        }
      };

    return (
        <>
        <MyTitle label={"Transfer"} />

        <label className="l">From Account</label>
        <SelectFromAccount/>
        <br></br>

        <label>To Account</label>
        <SelectToAccount/>
        <br></br>
        
        <label>Amount</label>
        <input
            type="number"
            placeholder="Amount to transfer"
            value={amountToTransfer}
            onChange={(e) => setAmountToTransfer(parseInt(e.target.value))}
        />
        <br></br>
        <br></br>
        <MyButton 
            type="submit" 
            onClick={handleSubmit} 
            label={"Transfer!"} 
        />
        </>

    );
};

export default Transfer;
