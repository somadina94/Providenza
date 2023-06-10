import { Link } from 'react-router-dom';

import classes from './Footer.module.css';
import approvedby1 from '../../images/validation1.png';
import approvedby2 from '../../images/validation2.png';

const Footer = () => {
    return (
        <section className={classes.footer}>
            <div className={classes['footer-texts']}>
                <Link to="/">
                    <address>Email: support@provbm.com</address>
                </Link>
                <address>
                    Mercury Tower, The Exchange Financial & Business Centre, Elia Zammit Street, St. Julian's STJ 3155,
                    Malta
                </address>
                <p>
                    Providenza Bank PLC is authorised by the Prudential Regulation Authority and regulated by the
                    Financial Conduct Authority and the Prudential Regulation Authority.
                </p>
                <p>
                    Providenza Insurance Services Company Limited and Providenza Investment Solutions Limited are each
                    authorised and regulated by the Financial Conduct Authority.
                </p>
            </div>
            <div className={classes.footerimg}>
                <img src={approvedby1} alt="fscs" />
                <img src={approvedby2} alt="bsi" />
            </div>
            <p>Providenza Group | @ Copyright Providenza Group 2002-2023. All rights reserved</p>
        </section>
    );
};

export default Footer;
