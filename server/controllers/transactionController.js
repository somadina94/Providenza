const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const Email = require('../util/email');
const crypto = require('crypto');

exports.sendTransferToken = catchAsync(async (req, res, next) => {
    // Get user
    const user = await User.findById(req.user._id);

    // Add token to User
    const code = user.createTransferToken();
    await user.save({ validateBeforeSave: false });

    // send Email with the code to client
    try {
        await new Email(user, code).sendToken();
    } catch (err) {
        console.log(err);
        user.transferToken = undefined;
        user.transferTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an error processing your transaction, try again!', 500));
    }

    res.status(200).json({
        status: 'success',
        message: 'Transfer token sent to email!',
    });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
    // 1) Check token
    const token = crypto.createHash('sha256').update(req.body.token).digest('hex');

    const user = await User.findOne({
        transferToken: token,
        transferTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
        return next(new AppError('You submitted an invalid or expired token. Token is only valid for 10 mins.', 401));
    }
    // 1) Get Sender via account number
    const sender = await User.findOne({ accountNumber: req.body.sender });

    // 2) Check sufficient funds for sender
    if (sender.balance < +req.body.amount) {
        return next(new AppError('Insufficient funds.', 403));
    }

    // 3) Update Sender and receipient balance
    if (req.body.kind === 'Domestic') {
        const receipient = await User.findOne({ accountNumber: req.body.receipient });
        const updatedReceipientBalance = receipient.balance + +req.body.amount;
        receipient.balance = updatedReceipientBalance;
        await receipient.save({ validateBeforeSave: false });
    }
    const updatedSenderBalance = sender.balance - +req.body.amount;
    sender.balance = updatedSenderBalance;
    await sender.save({ validateBeforeSave: false });

    // 4) Create Transaction
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Funds transferred successfully',
        data: {
            transaction,
        },
    });
});

exports.createTransactionAdmin = catchAsync(async (req, res, next) => {
    // 1) Get Sender via account number
    const sender = await User.findOne({ accountNumber: req.body.sender });

    // 2) Check sufficient funds for sender
    if (sender.balance < +req.body.amount) {
        return next(new AppError('Insufficient funds.', 403));
    }

    // 3) Update Sender and receipient balance
    if (req.body.kind === 'Domestic') {
        const receipient = await User.findOne({ accountNumber: req.body.receipient });
        const updatedReceipientBalance = receipient.balance + +req.body.amount;
        receipient.balance = updatedReceipientBalance;
        await receipient.save({ validateBeforeSave: false });
    }
    const updatedSenderBalance = sender.balance - +req.body.amount;
    sender.balance = updatedSenderBalance;
    await sender.save({ validateBeforeSave: false });

    // 4) Create Transaction
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Funds transferred successfully',
        data: {
            transaction,
        },
    });
});

exports.getTransactions = catchAsync(async (req, res, next) => {
    const transactions = await Transaction.find();

    res.status(200).json({
        status: 'success',
        data: {
            transactions,
        },
    });
});

exports.getAllTransactions = catchAsync(async (req, res, next) => {
    const transactionsDebit = await Transaction.find({ sender: req.user.accountNumber });
    const transactionsCredit = await Transaction.find({ receipient: `${req.user.accountNumber}` });

    const transactionsArr = [...transactionsDebit, ...transactionsCredit];

    const transactions = transactionsArr.sort((el) => el.createdAt);

    res.status(200).json({
        status: 'success',
        count: transactions.length,
        data: {
            transactions,
        },
    });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
    await Transaction.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
    });
});
