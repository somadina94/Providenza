import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import classes from './Nav.module.css';
import { logOut } from '../../api/api';
import { alertActions } from '../../store/alert-slice';
import { authActions } from '../../store/auth-slice';

const Nav = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const setCookie = useCookies(['jwt'])[1];
    const navigate = useNavigate();

    const logoutHander = async () => {
        const res = await logOut();
        if (res.status === 'success') {
            dispatch(authActions.logout());
            dispatch(alertActions.setState({ message: res.message, status: res.status }));
            setCookie('jwt', res.token);
            navigate('/', { replace: true });
        } else {
            dispatch(alertActions.setState({ message: 'Something went wrong', status: 'error' }));
        }
    };
    return (
        <nav className={classes.nav}>
            <NavLink to="banking" className={(navData) => (navData.isActive ? classes.active : '')}>
                Banking
            </NavLink>
            <NavLink to="borrowing" className={(navData) => (navData.isActive ? classes.active : '')}>
                Borrowing
            </NavLink>
            <NavLink to="insurance" className={(navData) => (navData.isActive ? classes.active : '')}>
                Insurance
            </NavLink>
            <NavLink to="help" className={(navData) => (navData.isActive ? classes.active : '')}>
                Help
            </NavLink>
            {!isLoggedIn && (
                <NavLink to="login" className={(navData) => (navData.isActive ? classes.active : '')}>
                    Login
                </NavLink>
            )}
            {isLoggedIn && (
                <NavLink
                    to="login"
                    className={(navData) => (navData.isActive ? classes.active : '')}
                    onClick={logoutHander}
                >
                    Logout
                </NavLink>
            )}
            {isLoggedIn && (
                <NavLink to="account" className={(navData) => (navData.isActive ? classes.active : '')}>
                    My account
                </NavLink>
            )}
        </nav>
    );
};

export default Nav;
