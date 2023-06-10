import classes from './PrintPrompt.module.css';
import Print from './Print';

const PrintPrompt = () => {
    return (
        <div className={classes.prompt}>
            <p>Print your Transaction Receipt</p>
            <div className={classes.print}>
                <Print />
            </div>
        </div>
    );
};

export default PrintPrompt;
