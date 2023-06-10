import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcApproval } from 'react-icons/fc';

import classes from './HomePage.module.css';

const HomePage = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    return (
        <div className={classes.homepage}>
            <div className={classes['image-container']}>
                <h1 className={classes['home-heading-primary']}>
                    Explore Online Banking <br />
                    Bank From Your Browser
                </h1>
                <h3 className={classes['sub-heading']}>
                    We've been improving Online Banking to make it even easier to use.
                </h3>
                <div className={classes.content}>
                    <div className={classes.check}>
                        <div>
                            <FcApproval className={classes.icon} />
                        </div>
                        <p>You can use Online Banking from a mobile, tablet or laptop</p>
                    </div>
                    <div className={classes.check}>
                        <div>
                            <FcApproval className={classes.icon} />
                        </div>
                        <p>
                            We work with disability and inclusion experts to make sure it's usable for customers with a
                            wide range of access needs
                        </p>
                    </div>
                    <div className={classes.check}>
                        <div>
                            <FcApproval className={classes.icon} />
                        </div>
                        <p>Enjoy capable and reliable 24/7 customer support</p>
                    </div>
                    <Link to={`${isLoggedIn ? 'account' : 'login'}`}>Online Banking</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
