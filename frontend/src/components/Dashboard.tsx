import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import MyTitle from './all/Title';
import { getUserFromToken } from '../services/authServices';
import { getUserAccounts } from '../services/accountServices';
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

    const [accounts, setAccounts] = useState<Account[]|null>(null);
    const [transactions, setTransactions] = useState<TransactionData[]|null>(null);
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });

    useEffect(() => {
        const user = getUserFromToken()
        if (!user)
            return

        updateUser(user)
        if (user.id) {
            const fetchAccount = async () => {
                try {
                    const response = await getUserAccounts(user.id);
                    setAccounts(response)
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
                
                if (response){ 
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
                if (data) {
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
                }
            });

    }, []);

    if (!accounts)
        return <h3>You have no account here!</h3>
  
    return (
    
    <div>
        <MyTitle label={`${accounts[0].first_name} ${accounts[0].last_name}`} />
        <br></br>
        <h3>Accounts Balance</h3>
        {
            accounts.map((a, i) => (
                <MetricsCard 
                    key={i}
                    label={a.account_number}
                    value={a.balance}
                    color={a.balance_status === 'Positive' ? 'dodgerblue' : 'red'} 
                    signe={a.balance_status === 'Positive' ? '+' : '-'}      
                />
            ))
        }
           
    
        <div className='separator'></div>
        <h3>Transactions History</h3>
        { transactions ?
            (
                <div>
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
            ):
            (<i>No transactions yet</i>)
        }
    </div>
  )
}

export default Dasboard