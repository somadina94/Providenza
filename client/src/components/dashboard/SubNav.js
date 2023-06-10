import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import { FcBusiness, FcAdvance, FcSynchronize, FcUnlock, FcPicture } from 'react-icons/fc';

import classes from './SubNav.module.css';

const SubNav = () => {
    const navRef = useRef();
    const navBtnRef = useRef();
    const [navBtnState, setNavBtnState] = useState(false);

    const navHander = () => {
        navRef.current.classList.toggle(classes.open);
        navRef.current.classList.toggle(classes.close);
        setNavBtnState((prevState) => !prevState);
    };

    const navBtnClasses = navBtnState ? `${classes.slider} ${classes.rotate}` : `${classes.slider}`;

    return (
        <nav className={`${classes.nav} ${classes.close}`} ref={navRef}>
            <FaAlignJustify className={navBtnClasses} onClick={navHander} ref={navBtnRef} />
            <NavLink to="detail" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcBusiness className={classes.icon} />
                Dashboard
            </NavLink>
            <NavLink to="localTransfer" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcAdvance className={classes.icon} />
                Local Transfer
            </NavLink>
            <NavLink to="internationalTransfer" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcAdvance className={classes.icon} />
                International Transfer
            </NavLink>
            <NavLink to="history" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcSynchronize className={classes.icon} />
                Transaction History
            </NavLink>
            <NavLink to="password" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcUnlock className={classes.icon} />
                Change Password
            </NavLink>
            <NavLink to="changePhoto" className={(navData) => (navData.isActive ? classes.active : '')}>
                <FcPicture className={classes.icon} />
                Change Photo
            </NavLink>
        </nav>
    );
};

export default SubNav;
