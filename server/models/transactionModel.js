const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        kind: {
            type: String,
            enum: ['Domestic', 'International'],
            required: [true, 'Transaction must have a kind'],
        },
        bankName: String,
        amount: {
            type: Number,
            required: [true, 'Transaction must have an amount'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        sender: Number,
        receipient: String,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
