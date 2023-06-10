import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import classes from './Receipt.module.css';
import logo from '../../images/logo.jpg';

const Receipt = forwardRef((props, ref) => {
    const transaction = useSelector((state) => state.transfer.transactions);
    const user = useSelector((state) => state.auth.user);
    const amount = transaction.amount * 1;
    const description = `ONB transfer to ${transaction.receipientName}`.toUpperCase();

    return (
        <main className={classes.receipt} ref={ref}>
            <div className={classes.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={classes.title}>
                <h2>Online Banking</h2>
                <p>Transaction Receipt</p>
            </div>
            <div className={classes.details}>
                <p>Payer</p>
                <div className={classes.right}>
                    <h3>{user.name.toUpperCase()}</h3>
                    <p>{user.accountNumber}</p>
                    <p>Providenza bank</p>
                </div>
            </div>
            <div className={classes.details}>
                <p>Reciever</p>
                <div className={classes.right}>
                    <h3>{transaction.receipientName.toUpperCase()}</h3>
                    <p>{transaction.receipient}</p>
                    <p>{transaction.bankName}</p>
                </div>
            </div>
            <div className={classes.details}>
                <p>Transaction</p>
                <div className={classes.right}>
                    <p>€{amount.toFixed(2)}</p>
                    <p>{transaction.kind.toUpperCase()}</p>
                    <p>{new Date(Date.now()).toLocaleString()}</p>
                </div>
            </div>
            <div className={classes.details}>
                <p>Narration</p>
                <h4>{description}</h4>
            </div>
            <div className={classes.details}>
                <p>Reference</p>
                <div className={classes.right}>
                    <p>
                        ONB
                        {Math.floor(Math.random() * (30000000000000 - 20000000000000 + 1) + 20000000000000)}
                    </p>
                    <p>Success</p>
                </div>
            </div>
            <h4 className={classes.conclusion}>
                This is an electronic receipt of a transaction that does not require an signature. The authenticity of
                this transaction can be confirmed with the bank.
                <br />
                For any other assistance, kindly email Providence Serve on info@prvbm.com.
            </h4>
        </main>
    );
});

export default Receipt;
