const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser)
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

router.post('/signUp', authController.signUp);
router.post('/loginUser', authController.loginUser);
router.post('/loginAdmin', authController.loginAdmin);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassowrd);
router.patch('/updatePassword', authController.protect, authController.updatePassword);

router.get('/me', authController.protect, userController.getMe);

router.route('/:id').get(userController.getOneUser).patch(userController.updateUser).delete(userController.deleteUser);

router.patch('/blockUser/:id', userController.blockUser);
router.patch('/unblockUser/:id', userController.unblockUser);

router.post('/uploadPhoto', authController.protect, userController.getPhoto, userController.uploadPhoto);

router
    .route('/:id')
    .patch(userController.updateUser)
    .get(userController.getOneUser)
    .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
