import React, { useEffect, useState } from "react";
import MyButton from "./all/Button";
import MyTitle from "./all/Title";
import { toast, ToastContainer } from 'react-toastify';
import { getUserFromToken } from "../services/authServices";
import { useAuth } from "../contexts/UserContext";
import { TranferData } from "../types/types";
import { transferToAnotherUser } from "../services/tranferServices";


const Transfer: React.FC = () => {
    const [amountToTransfer, setAmountToTransfer] = useState<number>(0)
    const { user, updateUser } = useAuth();
   
    useEffect(() => {
            const currentUser = getUserFromToken()
            if (!currentUser)
                return

            updateUser(currentUser)       

        }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(amountToTransfer)
        
        if (!user)
            return;

        if (amountToTransfer <= 0) {
            toast.error("Amount has to be > 0")
            return;
        }

        const dataToTransfer: TranferData = {
            from_id: user.id,
            to_id: '2',
            amount: amountToTransfer
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

        <input
            type="number"
            placeholder="Amount to transfer"
            value={amountToTransfer}
            onChange={(e) => setAmountToTransfer(parseInt(e.target.value))}
        />
        <MyButton 
            type="submit" 
            onClick={handleSubmit} 
            label={"Transfer!"} 
        />
        </>

    );
};

export default Transfer;
