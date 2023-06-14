import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './Nav.module.css';

const Nav = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
        <nav className={classes.nav}>
            <NavLink to="accounts" className={(navData) => (navData.isActive ? classes.active : '')}>
                Accounts
            </NavLink>
            <NavLink to="transactions" className={(navData) => (navData.isActive ? classes.active : '')}>
                Transactions
            </NavLink>
            <NavLink to="createAccount" className={(navData) => (navData.isActive ? classes.active : '')}>
                Create Account
            </NavLink>
            <NavLink to="createTransaction" className={(navData) => (navData.isActive ? classes.active : '')}>
                Create Transaction
            </NavLink>
            {!isLoggedIn && (
                <NavLink to="login" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Login
                </NavLink>
            )}
            {isLoggedIn && (
                <NavLink to="login" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Logout
                </NavLink>
            )}
        </nav>
    );
};

export default Nav;
