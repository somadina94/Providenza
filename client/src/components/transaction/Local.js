import { useState } from 'react';
import { FcDepartment, FcBusinessman, FcHome } from 'react-icons/fc';
import { BsCurrencyEuro } from 'react-icons/bs';
import useInput from '../../hooks/userInput';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import classes from './Local.module.css';
import { sendToken } from '../../api/api';
import { transferActions } from '../../store/transfer-slice';
import { alertActions } from '../../store/alert-slice';
import Spinner from '../UI/Spinner';

const Local = () => {
    const sender = useSelector((state) => state.auth.user.accountNumber);
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const { jwt } = useCookies(['jwt'])[0];
    const navigate = useNavigate();
    const {
        value: bankNameInput,
        enteredValueIsValid: bankNameInputIsValid,
        hasError: bankNameInputIsInvalid,
        valueInputChangedHandler: bankNameInputChangedHandler,
        valueInputBlurHandler: bankNameInputBlurHandler,
        // reset: bankNameInputReset,
    } = useInput((value) => value.trim() !== '');

    const {
        value: nameInput,
        enteredValueIsValid: nameInputIsValid,
        hasError: nameInputIsInvalid,
        valueInputChangedHandler: nameInputChangedHandler,
        valueInputBlurHandler: nameInputBlurHandler,
        // reset: nameInputReset,
    } = useInput((value) => value.trim() !== '');

    const {
        value: accountInput,
        enteredValueIsValid: accountInputIsValid,
        hasError: accountInputIsInvalid,
        valueInputChangedHandler: accountInputChangedHandler,
        valueInputBlurHandler: accountInputBlurHandler,
        // reset: accountInputReset,
    } = useInput((value) => value.trim() !== '');

    const {
        value: amountInput,
        enteredValueIsValid: amountInputIsValid,
        hasError: amountInputIsInvalid,
        valueInputChangedHandler: amountInputChangedHandler,
        valueInputBlurHandler: amountInputBlurHandler,
        // reset: amountInputReset,
    } = useInput((value) => value.trim() !== '');

    let formIsValid = false;
    if (bankNameInputIsValid && nameInputIsValid && accountInputIsValid && amountInputIsValid) {
        formIsValid = true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);

        const transactionInfo = {
            bankName: bankNameInput,
            receipientName: nameInput,
            kind: 'Domestic',
            amount: amountInput,
            sender,
            receipient: accountInput,
        };

        const res = await sendToken(jwt);

        if (res.status === 'success') {
            dispatch(transferActions.transfer({ transactions: transactionInfo }));
            navigate('/account/confirmLocal');
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }
        setShowSpinner(false);
    };

    const bankNameInputClasses = bankNameInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const nameInputClasses = nameInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const accountInputClasses = accountInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const amountInputClasses = amountInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {showSpinner && <Spinner />}
            <div className={bankNameInputClasses}>
                <label>Beneficiary bank name</label>
                <div className={classes['input-group']}>
                    <FcHome className={classes.icon} />
                    <input
                        type="text"
                        value={bankNameInput}
                        onChange={bankNameInputChangedHandler}
                        onBlur={bankNameInputBlurHandler}
                    />
                </div>
                {bankNameInputIsInvalid && <span>Please enter beneficiary bank name</span>}
            </div>
            <div className={nameInputClasses}>
                <label>Beneficiary name</label>
                <div className={classes['input-group']}>
                    <FcBusinessman className={classes.icon} />
                    <input
                        type="text"
                        value={nameInput}
                        onChange={nameInputChangedHandler}
                        onBlur={nameInputBlurHandler}
                    />
                </div>
                {nameInputIsInvalid && <span>Please enter beneficiary name</span>}
            </div>
            <div className={accountInputClasses}>
                <label>Account number</label>
                <div className={classes['input-group']}>
                    <FcDepartment className={classes.icon} />
                    <input
                        type="number"
                        value={accountInput}
                        onChange={accountInputChangedHandler}
                        onBlur={accountInputBlurHandler}
                    />
                </div>
                {accountInputIsInvalid && <span>Please enter beneficiary account number</span>}
            </div>
            <div className={amountInputClasses}>
                <label>Amount</label>
                <div className={classes['input-group']}>
                    <BsCurrencyEuro className={classes.icon} />
                    <input
                        type="number"
                        value={amountInput}
                        onChange={amountInputChangedHandler}
                        onBlur={amountInputBlurHandler}
                    />
                </div>
                {amountInputIsInvalid && <span>Please enter an amount</span>}
            </div>
            <div className={classes.action}>
                <button type="submit" disabled={!formIsValid}>
                    Next
                </button>
            </div>
        </form>
    );
};

export default Local;
