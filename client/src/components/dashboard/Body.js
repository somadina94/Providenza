import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import classes from './Body.module.css';
import SubNav from './SubNav';

const Body = () => {
    return (
        <section className={classes.dash}>
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="" />
                <link rel="canonical" href="/account" />
            </Helmet>
            <aside>
                <SubNav />
            </aside>
            <main className="dashboard">
                <Outlet />
            </main>
        </section>
    );
};

export default Body;
