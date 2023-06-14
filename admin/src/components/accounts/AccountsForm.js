import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useLoaderData, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import classes from './AccountsForm.module.css';
import { getOneAccount } from '../../api/api';
import Spinner from '../UI/Spinner';
import { alertActions } from '../../store/alert-slice';
import { updateAccount } from '../../api/api';

const AccountsForm = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const res = useLoaderData();
    const account = res.data.user;
    const { jwt } = useCookies(['jwt'])[0];
    const params = useParams();
    const nameRef = useRef();
    const emailRef = useRef();
    const accountRef = useRef();
    const balanceRef = useRef();
    const statusRef = useRef();

    const updateHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            accountNumber: accountRef.current.value,
            balance: balanceRef.current.value,
            active: statusRef.current.value,
        };

        const res = await updateAccount(jwt, data, params.id);

        if (res.status === 'success') {
            dispatch(alertActions.setState({ message: res.message, status: res.status }));
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }

        setShowSpinner(false);
    };

    return (
        <form className={classes.form} onSubmit={updateHandler}>
            {showSpinner && <Spinner />}
            <div className={classes.group}>
                <label>Name</label>
                <input type="text" defaultValue={account.name} ref={nameRef} />
            </div>
            <div className={classes.group}>
                <label>Email</label>
                <input type="text" defaultValue={account.email} ref={emailRef} />
            </div>
            <div className={classes.group}>
                <label>Account number</label>
                <input type="text" defaultValue={account.accountNumber} ref={accountRef} />
            </div>
            <div className={classes.group}>
                <label>Balance</label>
                <input type="text" defaultValue={account.balance} ref={balanceRef} />
            </div>
            <div className={classes.group}>
                <label>Status</label>
                <input type="text" defaultValue={account.active} ref={statusRef} />
            </div>
            <div className={classes.action}>
                <button type="submit">update</button>
            </div>
        </form>
    );
};

export default AccountsForm;

export const loader = ({ params }) => {
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    return getOneAccount(jwt, params.id);
};
