import { useLoaderData } from 'react-router-dom';
import Cookies from 'universal-cookie';

import classes from './AllTransactions.module.css';
import Transaction from './Transaction';
import { getTransactions } from '../../api/api';

const AllTransactions = () => {
    const res = useLoaderData();
    const transactions = res.data.transactions;

    return (
        <section className={classes.transactions}>
            {transactions.map((el) => (
                <Transaction
                    key={el._id}
                    id={el._id}
                    type={el.kind}
                    destination={el.bankName}
                    amount={el.amount}
                    sender={el.sender}
                    receipient={el.receipient}
                    date={el.createdAt}
                />
            ))}
        </section>
    );
};

export default AllTransactions;

export const loader = () => {
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    return getTransactions(jwt);
};
