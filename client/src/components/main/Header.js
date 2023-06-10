import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaAlignJustify } from 'react-icons/fa';

import classes from './Header.module.css';
import { getOneUser } from '../../api/api';
import Nav from './Nav';

const Header = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { jwt } = useCookies(['jwt'])[0];
    const menuRef = useRef();
    const userId = useSelector((state) => state.auth.user?._id);

    useEffect(() => {
        const request = async () => {
            const res = await getOneUser(jwt, userId);
            if (res.status === 'success') {
                setPhoto(res.data.user.photo);
                setIsLoading(false);
            }
        };
        if (userId) {
            request();
        }
    }, [jwt, userId]);

    const toggleMenuHandler = () => {
        menuRef.current.classList.toggle(classes['toggle-nav']);
    };

    const navClasses = `${classes['nav-container']} ${classes['toggle-nav']}`;

    return (
        <header className={classes.header}>
            <Link to="/">Providenza Bank</Link>
            <FaAlignJustify className={classes['menu-icon']} onClick={toggleMenuHandler} />
            <nav className={navClasses} ref={menuRef}>
                <Nav />
            </nav>
            {isLoggedIn && isLoading && <Skeleton variant="circle" className={classes.skeleton} />}
            {isLoggedIn && !isLoading && (
                <div className={classes.userImg}>
                    <img src={photo} alt="user" />
                </div>
            )}
        </header>
    );
};

export default Header;
