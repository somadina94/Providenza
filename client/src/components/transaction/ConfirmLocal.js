import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FcDepartment } from 'react-icons/fc';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import classes from './ConfirmLocal.module.css';
import useInput from '../../hooks/userInput';
import { createTransaction } from '../../api/api';
import { alertActions } from '../../store/alert-slice';
import Spinner from '../UI/Spinner';

const ConfirmLocal = () => {
    const transaction = useSelector((state) => state.transfer.transactions);
    const [showSpinner, setShowSpinner] = useState(false);
    const { jwt } = useCookies(['jwt'])[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        value: tokenInput,
        enteredValueIsValid: tokenInputIsValid,
        hasError: tokenInputIsInvalid,
        valueInputChangedHandler: tokenInputChangedHandler,
        valueInputBlurHandler: tokenInputBlurHandler,
        // reset: tokenInputReset,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;
    if (tokenInputIsValid) {
        formIsValid = true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const data = {
            ...transaction,
            token: tokenInput,
        };

        const res = await createTransaction(jwt, data);

        if (res.status === 'success') {
            dispatch(alertActions.setState({ message: res.message, status: res.status }));
            navigate('/account/print-local-receipt');
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }
        setShowSpinner(false);
    };

    const tokenInputClasses = tokenInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;

    return (
        <div className={classes.container}>
            <h2>Review your transaction details and proceed</h2>
            <div className={classes.info}>
                <span>Tranfer type</span>
                <span>{transaction.kind}</span>
            </div>
            <div className={classes.info}>
                <span>Bank name</span>
                <span>{transaction.bankName}</span>
            </div>
            <div className={classes.info}>
                <span>Beneficiary name</span>
                <span>{transaction.receipientName}</span>
            </div>
            <div className={classes.info}>
                <span>Beneficiary account number</span>
                <span>{transaction.receipient}</span>
            </div>
            <div className={classes.info}>
                <span>Amount</span>
                <span>Є{transaction.amount}</span>
            </div>
            <form className={classes.form} onSubmit={submitHandler}>
                {showSpinner && <Spinner />}
                <h2>Please enter your 6-digit transfer token sent to your email below and proceed</h2>
                <div className={tokenInputClasses}>
                    <label>Transfer token</label>
                    <div className={classes['input-group']}>
                        <FcDepartment className={classes.icon} />
                        <input
                            type="number"
                            value={tokenInput}
                            onChange={tokenInputChangedHandler}
                            onBlur={tokenInputBlurHandler}
                        />
                    </div>
                </div>
                <div className={classes.action}>
                    <button type="submit" disabled={!formIsValid}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmLocal;
