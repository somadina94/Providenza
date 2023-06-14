import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import classes from './Transaction.module.css';
import { deleteTransaction } from '../../api/api';
import { alertActions } from '../../store/alert-slice';
import Spinner from '../UI/Spinner';

const Transaction = (props) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const { jwt } = useCookies(['jwt'])[0];
    const navigate = useNavigate();
    const date = new Date(props.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const deleteHandler = async () => {
        setShowSpinner(true);
        const res = await deleteTransaction(jwt, props.id);
        if (!res) {
            dispatch(alertActions.setState({ message: 'Transaction deleted successfully', status: 'success' }));
            navigate('/transactions');
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }
        setShowSpinner(false);
    };
    return (
        <div className={classes.transaction}>
            {showSpinner && <Spinner />}
            <div className={classes.content}>
                <span>Type</span>
                <span>{props.type}</span>
            </div>
            <div className={classes.content}>
                <span>Destination</span>
                <span>{props.destination}</span>
            </div>
            <div className={classes.content}>
                <span>Amount</span>
                <span>{props.amount}</span>
            </div>
            <div className={classes.content}>
                <span>Sender</span>
                <span>{props.sender}</span>
            </div>
            <div className={classes.content}>
                <span>Receipient</span>
                <span>{props.receipient}</span>
            </div>
            <div className={classes.content}>
                <span>Date</span>
                <span>{date}</span>
            </div>
            <div className={classes.action}>
                <button type="button" onClick={deleteHandler}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Transaction;
