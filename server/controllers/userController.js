const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const multer = require('multer');
const sharp = require('sharp');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3-transform');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME_S3,
        shouldTransform: function (req, file, cb) {
            cb(null, /^image/i.test(file.mimetype));
        },
        transforms: [
            {
                key: function (req, file, cb) {
                    cb(null, `${file.fieldname}-${req.user._id}-${Date.now()}.jpeg`);
                },
                transform: function (req, file, cb) {
                    if (file.fieldname === 'photo') {
                        cb(null, sharp().resize(800, 800).jpeg({ quality: 100 }));
                    } else {
                        cb(null, sharp().jpeg({ quality: 100 }));
                    }
                },
            },
        ],
    }),
});

exports.uploadPhoto = upload.fields([{ name: 'photo', maxCount: 1 }]);

exports.createUser = catchAsync(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'New user created successfully',
        data: {
            user,
        },
    });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        count: users.length,
        data: {
            users,
        },
    });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

const filterObject = (obj, ...allowedFileds) => {
    let newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFileds.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.updatePhoto = catchAsync(async (req, res, next) => {
    // 1) diable user from being able to update pin
    if (req.body.pin || req.body.pinConfirm) {
        return next(new AppError('This route is not for updating pin, please use /updatePin', 401));
    }
    // 2) assign photo to req obj
    if (req.files.photo === undefined) {
        return next(new AppError('You have not selected a photo yet', 401));
    }

    // 2) Filtered out unwanted fields that are not allowed to be updated
    const filteredObj = filterObject(req.body, 'photo');

    // 3) Upload photo
    if (req.files.photo) {
        req.files.photo.forEach((el) => {
            const [photo] = el.transforms;
            filteredObj.photo = photo.location;
        });
    }

    // 3) Update user data
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredObj, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `${user.name} updated successfully`,
        data: {
            user,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
    });
});

exports.blockUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { active: false }, { new: true });

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `${user.name} blocked successfully`,
        data: {
            user,
        },
    });
});

exports.unblockUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { active: true }, { new: true });

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: `${user.name} unblocked successfully`,
        data: {
            user,
        },
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const id = req.user._id;
    const user = await User.findOne({ _id: id });

    if (!user) {
        return next(new AppError("Couldn't load your information, please reload the page", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});
