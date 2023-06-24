import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import classes from './CreateTransaction.module.css';
import { alertActions } from '../../store/alert-slice';
import Spinner from '../UI/Spinner';
import { createTransaction } from '../../api/api';

const CreateTransaction = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const { jwt } = useCookies(['jwt'])[0];
    const typeRef = useRef();
    const destinationRef = useRef();
    const amountRef = useRef();
    const senderRef = useRef();
    const receipientRef = useRef();
    const dateRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);

        const data = {
            kind: typeRef.current.value,
            bankName: destinationRef.current.value,
            amount: amountRef.current.value,
            sender: senderRef.current.value,
            receipient: receipientRef.current.value,
            createdAt: dateRef.current.value,
        };

        const res = await createTransaction(jwt, data);

        if (res.status === 'success') {
            dispatch(alertActions.setState({ message: res.message, status: res.status }));
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }

        setShowSpinner(false);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {showSpinner && <Spinner />}
            <div className={classes.group}>
                <label>Type</label>
                <input type="text" ref={typeRef} />
            </div>
            <div className={classes.group}>
                <label>Destination bank</label>
                <input type="text" ref={destinationRef} />
            </div>
            <div className={classes.group}>
                <label>amount</label>
                <input type="number" ref={amountRef} />
            </div>
            <div className={classes.group}>
                <label>Sender</label>
                <input type="text" ref={senderRef} />
            </div>
            <div className={classes.group}>
                <label>Receipient</label>
                <input type="text" ref={receipientRef} />
            </div>
            <div className={classes.group}>
                <label>Date</label>
                <input type="datetime-local" ref={dateRef} />
            </div>
            <div className={classes.action}>
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateTransaction;
