const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your fullname'],
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        accountNumber: {
            type: Number,
            default: Math.floor(Math.random() * (5999999999 - 5000000000)) + 5000000000,
        },
        photo: {
            type: String,
            default:
                'https://somadina-test-app-bucket.s3.amazonaws.com/photo-6358362cb655b3c2e786229b-1667852419239.jpeg',
        },
        balance: {
            type: Number,
            default: 0,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        active: {
            type: Boolean,
            default: true,
        },
        transferToken: String,
        transferTokenExpires: Date,
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (passwordConfirm) {
                    return passwordConfirm === this.password;
                },
                message: 'Your password and confirm password are not the same',
            },
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (userPassword, candidatePassword) {
    return await bcrypt.compare(userPassword, candidatePassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetTokenExpires = Date.now() + 1000 * 60 * 10;

    return resetToken;
};

userSchema.methods.changedPasswordAfterJWT = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createTransferToken = function () {
    const token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const tokenString = JSON.stringify(token);

    this.transferToken = crypto.createHash('sha256').update(tokenString).digest('hex');

    this.transferTokenExpires = Date.now() + 10 * 60 * 1000;

    return tokenString;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
