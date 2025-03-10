import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import MyTitle from './all/Title';
import { getUserFromToken } from '../services/authServices';
import { getAccount } from '../services/accountServices';
import { Account, TransactionData } from '../types/types';
import MetricsCard from './MetricsCard';
import { getTransactions } from '../services/transationsServices';
import { useAuth } from '../contexts/UserContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    }[];
}
const Dasboard = () => {
    const { user, updateUser } = useAuth();

    const [account, setAccount] = useState<Account|null>(null);
    const [transactions, setTransactions] = useState<TransactionData[]|null>([]);
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

    useEffect(() => {
        const user = getUserFromToken()
        if (!user)
            return

        updateUser(user)
        if (user.id) {
            const fetchAccount = async () => {
                try {
                    const response = await getAccount(user.id);
                    setAccount(response)
                } 
                catch (err) {
                    console.error(err);
                }
                
            };
            fetchAccount()       
    }
    }, []);

    // Fetch transaction history
    useEffect(() => {
        if (!user)
            return
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions(user.id);
                
                if (transactions){ 
                    setTransactions(response)
                    return response
                }

            } 
            catch (err) {
                console.error(err);
            }
        }
        fetchTransactions()
            .then((data) => {
                const labels = data.map((t: TransactionData) => t.date);
                const balances = data.map((t: TransactionData) => t.amount);
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Montant des Transactions',
                        data: balances,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }],
                });
            });
    }, []);

    if (!account)
        return <h3>You have no account here!</h3>
  
    return (
    
    <div>
        <MyTitle label={'Bank Dashboard'} />
        <h3>{account.first_name} {account.last_name}</h3>
        <MetricsCard 
                label={'Balance'}
                value={account.balance}
                color={account.balance_status === 'Positive' ? 'dodgerblue' : 'red'} 
                signe={account.balance_status === 'Positive' ? '+' : '-'}      
        />
           
    
        { transactions &&
            <div>
            <div className='separator'></div>
            <h3>Transaction History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((t, i) => (
                            <tr key={i}>
                            <td>{t.date}</td>
                            <td>{t.from_account}</td>
                            <td>{t.to_account}</td>
                            <td>{t.amount} €</td>
                            </tr>

                        ))
                    }
                    
                </tbody>
            </table>
            
            <div className='separator'></div>
            <h3>Transaction Graph</h3>
            <Line data={chartData} /> 
            </div>
        }
    </div>
  )
}

export default Dasboard