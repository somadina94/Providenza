import { Link } from 'react-router-dom';
import classes from './Account.module.css';

const Account = (props) => {
    const status = props.status ? 'Active' : 'Blocked';
    return (
        <div className={classes.account}>
            <div className={classes.photo}>
                <img src={props.photo} alt="user" />
            </div>
            <div className={classes.content}>
                <span>Name</span>
                <span>{props.name}</span>
            </div>
            <div className={classes.content}>
                <span>Email</span>
                <span>{props.email}</span>
            </div>
            <div className={classes.content}>
                <span>Account</span>
                <span>{props.account}</span>
            </div>
            <div className={classes.content}>
                <span>Balance</span>
                <span>Є{props.balance.toFixed(2)}</span>
            </div>
            <div className={classes.content}>
                <span>Status</span>
                <span>{status}</span>
            </div>
            <Link to={`update/${props.id}`}>Update</Link>
        </div>
    );
};

export default Account;
