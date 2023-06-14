import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import Nav from '../main/Nav';

const Layout = () => {
    return (
        <Fragment>
            <header className="bank">
                <Link to="/">Providenza Bank</Link>
            </header>
            <Nav />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
};

export default Layout;
