import { Outlet } from 'react-router-dom';
import classes from './Body.module.css';
import SubNav from './SubNav';

const Body = () => {
    return (
        <section className={classes.dash}>
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
