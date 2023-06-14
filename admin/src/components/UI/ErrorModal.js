import { Fragment } from 'react';

import Footer from '../main/Footer';
import Nav from '../main/Nav';
import classes from './ErrorModal.module.css';

const ErrorModal = () => {
    const message = 'Something went wrong!';

    return (
        <Fragment>
            <Nav />
            <section className={classes.error}>
                <p>{message}</p>
            </section>
            <Footer />
        </Fragment>
    );
};

export default ErrorModal;
