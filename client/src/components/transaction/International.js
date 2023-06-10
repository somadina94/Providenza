import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FcBusinessman, FcDepartment, FcHome, FcLibrary } from 'react-icons/fc';
import { BsCurrencyEuro } from 'react-icons/bs';
import useInput from '../../hooks/userInput';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import classes from './International.module.css';
import Spinner from '../UI/Spinner';
import { transferActions } from '../../store/transfer-slice';
import { alertActions } from '../../store/alert-slice';
import { sendToken } from '../../api/api';

const International = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const { jwt } = useCookies(['jwt'])[0];
    const sender = useSelector((state) => state.auth.user.accountNumber);
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
        value: IBANInput,
        enteredValueIsValid: IBANInputIsValid,
        hasError: IBANInputIsInvalid,
        valueInputChangedHandler: IBANInputChangedHandler,
        valueInputBlurHandler: IBANInputBlurHandler,
        // reset: IBANInputReset,
    } = useInput((value) => value.trim() !== '');

    const {
        value: swiftInput,
        enteredValueIsValid: swiftInputIsValid,
        hasError: swiftInputIsInvalid,
        valueInputChangedHandler: swiftInputChangedHandler,
        valueInputBlurHandler: swiftInputBlurHandler,
        // reset: swiftInputReset,
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
    if (bankNameInputIsValid && nameInputIsValid && IBANInputIsValid && swiftInputIsValid && amountInputIsValid) {
        formIsValid = true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);

        const transactionInfo = {
            kind: 'International',
            bankName: bankNameInput,
            receipientName: nameInput,
            receipient: IBANInput,
            amount: amountInput,
            sender,
            swift: swiftInput,
        };

        const res = await sendToken(jwt);

        if (res.status === 'success') {
            dispatch(transferActions.transfer({ transactions: transactionInfo }));
            navigate('/account/confirmInternational');
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }

        setShowSpinner(false);
    };

    const nameInputClasses = nameInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const bankNameInputClasses = bankNameInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const amountInputClasses = amountInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const IBANInputClasses = IBANInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;
    const swiftInputClasses = swiftInputIsInvalid ? `${classes.group} ${classes.invalid}` : classes.group;

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {showSpinner && <Spinner />}
            <div className={bankNameInputClasses}>
                <label>Bank name</label>
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
            <div className={IBANInputClasses}>
                <label>IBAN</label>
                <div className={classes['input-group']}>
                    <FcDepartment className={classes.icon} />
                    <input
                        type="text"
                        value={IBANInput}
                        onChange={IBANInputChangedHandler}
                        onBlur={IBANInputBlurHandler}
                    />
                </div>
                {IBANInputIsInvalid && <span>Please enter valid IBAN</span>}
            </div>
            <div className={swiftInputClasses}>
                <label>Swift/Sortcode</label>
                <div className={classes['input-group']}>
                    <FcLibrary className={classes.icon} />
                    <input
                        type="text"
                        value={swiftInput}
                        onChange={swiftInputChangedHandler}
                        onBlur={swiftInputBlurHandler}
                    />
                </div>
                {swiftInputIsInvalid && <span>Please enter swift/sortcode</span>}
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
                {amountInputIsInvalid && <span>Please enter amount</span>}
            </div>
            <div className={classes.action}>
                <button type="submit" disabled={!formIsValid}>
                    Next
                </button>
            </div>
        </form>
    );
};

export default International;
