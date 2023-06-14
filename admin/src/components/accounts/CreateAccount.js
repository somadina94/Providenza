import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import classes from './CreateAccount.module.css';
import Spinner from '../UI/Spinner';
import { alertActions } from '../../store/alert-slice';
import { createAccount } from '../../api/api';

const CreateAccount = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const { jwt } = useCookies(['jwt'])[0];
    const dispatch = useDispatch();
    const nameRef = useRef();
    const emailRef = useRef();
    const balanceRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            balance: balanceRef.current.value,
            password: passwordRef.current.value,
            passwordConfirm: passwordConfirmRef.current.value,
        };

        const res = await createAccount(jwt, data);

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
                <label>Name</label>
                <input type="text" ref={nameRef} />
            </div>
            <div className={classes.group}>
                <label>Email</label>
                <input type="email" ref={emailRef} />
            </div>
            <div className={classes.group}>
                <label>Balance</label>
                <input type="number" ref={balanceRef} />
            </div>
            <div className={classes.group}>
                <label>Password</label>
                <input type="password" ref={passwordRef} />
            </div>
            <div className={classes.group}>
                <label>Confirm Password</label>
                <input type="password" ref={passwordConfirmRef} />
            </div>
            <div className={classes.action}>
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateAccount;
