import classes from './History.module.css';

const History = (props) => {
    const date = new Date(props.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div className={classes.history}>
            <div className={classes.info}>
                <span>Id</span>
                <span>{props.id}</span>
            </div>
            <div className={classes.info}>
                <span>Type</span>
                <span>{props.kind}</span>
            </div>
            <div className={classes.info}>
                <span>Beneficiary bank</span>
                <span>{props.bankName}</span>
            </div>
            <div className={classes.info}>
                <span>Debited account</span>
                <span>{props.sender}</span>
            </div>
            <div className={classes.info}>
                <span>Credited account</span>
                <span>{props.receipient}</span>
            </div>
            <div className={classes.info}>
                <span>Amount</span>
                <span>Є{parseFloat(props.amount).toFixed(2)}</span>
            </div>
            <div className={classes.info}>
                <span>Date</span>
                <span>{date}</span>
            </div>
        </div>
    );
};

export default History;
