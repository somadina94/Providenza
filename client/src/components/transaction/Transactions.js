import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCookies } from 'react-cookie';

import classes from './Transactions.module.css';
import { getTransaction } from '../../api/api';
import { alertActions } from '../../store/alert-slice';
import History from './History';

const Transactions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [history, setHistory] = useState([1]);
    const { jwt } = useCookies(['jwt'])[0];
    const dispatch = useDispatch();

    useEffect(() => {
        const request = async () => {
            const res = await getTransaction(jwt);
            if (res.status === 'success') {
                setHistory(res.data.transactions);
                setIsLoading(false);
            } else {
                dispatch(alertActions.setState({ message: 'Something went wrong, try page reload', status: 'error' }));
            }
        };
        request();
    }, [jwt, dispatch]);

    return (
        <section className={classes.history}>
            {isLoading && history.map((el) => <Skeleton count={3} className={classes.skeleton} />)}
            {!isLoading &&
                history.map((el) => (
                    <History
                        key={el._id}
                        id={el._id}
                        kind={el.kind}
                        bankName={el.bankName}
                        sender={el.sender}
                        receipient={el.receipient}
                        amount={el.amount}
                        date={el.createdAt}
                    />
                ))}
        </section>
    );
};

export default Transactions;
