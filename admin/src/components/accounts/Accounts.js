import { useLoaderData } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Account from './Account';
import classes from './Accounts.module.css';
import { getAllAccounts } from '../../api/api';

const Accounts = () => {
    const res = useLoaderData();

    const accounts = res.data.users;
    return (
        <section className={classes.accounts}>
            {accounts.map((el) => (
                <Account
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    email={el.email}
                    photo={el.photo}
                    account={el.accountNumber}
                    balance={el.balance}
                    status={el.active}
                />
            ))}
        </section>
    );
};

export default Accounts;

export const loader = () => {
    const cookies = new Cookies();
    const jwt = cookies.get('jwt');
    return getAllAccounts(jwt);
};
