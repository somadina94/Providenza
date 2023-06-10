const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').post(transactionController.createTransaction).get(transactionController.getAllTransactions);

router.route('/:id').delete(transactionController.deleteTransaction);

router.patch('/sendToken', transactionController.sendTransferToken);

module.exports = router;
