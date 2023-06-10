const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./util/appError');
const userRouter = require('./routes/userRoutes');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
