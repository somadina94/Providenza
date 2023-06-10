import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch } from 'react-redux';
import { AiFillBank } from 'react-icons/ai';
import { FcContacts, FcDepartment, FcOk } from 'react-icons/fc';
import { AiFillEuroCircle } from 'react-icons/ai';

import classes from './Account.module.css';
import { getMe } from '../../api/api';
import { alertActions } from '../../store/alert-slice';

const Account = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([1]);
    const { jwt } = useCookies(['jwt'])[0];
    const dispatch = useDispatch();

    useEffect(() => {
        const request = async () => {
            const res = await getMe(jwt);
            if (res.status === 'success') {
                setUser(res.data.user);
                setIsLoading(false);
            } else {
                dispatch(alertActions.setState({ message: res.message, status: 'error' }));
            }
        };
        request();
    }, [jwt, dispatch]);

    const active = user.active ? 'Active' : 'Blocked';
    const balance = parseFloat(user.balance).toFixed(2);
    return (
        <section className={classes.account}>
            <div className={classes.info}>
                {isLoading && <Skeleton count={5} variant="rectangular" className={classes.skeleton} />}

                {!isLoading && (
                    <div className={classes.infos}>
                        <span>
                            <FcContacts className={classes.icon} /> Account Name
                        </span>
                        <span>{user.name}</span>
                    </div>
                )}
                {!isLoading && (
                    <div className={classes.infos}>
                        <span>
                            <AiFillBank className={classes.icon} /> Account Type
                        </span>
                        <span>Premiun Savings Account</span>
                    </div>
                )}
                {!isLoading && (
                    <div className={classes.infos}>
                        <span>
                            <FcDepartment className={classes.icon} /> Account number
                        </span>
                        <span>{user.accountNumber}</span>
                    </div>
                )}
                {!isLoading && (
                    <div className={classes.infos}>
                        <span>
                            <AiFillEuroCircle className={classes.icon} /> Account Balance
                        </span>
                        <span>€{balance}</span>
                    </div>
                )}
                {!isLoading && (
                    <div className={classes.infos}>
                        <span>
                            <FcOk className={classes.icon} /> Account Status
                        </span>
                        <span>{active}</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Account;
