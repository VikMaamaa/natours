/*eslint-disable*/
const multer = require('multer');
const sharp = require('sharp')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');


// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         //user-76767abc76dba-33232376764.jpeg
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.User.id}-${Date.now()}.${ext}`)
//     }
// });
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async(req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.User.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer).resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);

    next();
})

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj
}

exports.getMe = (req, res, next) => {
    req.params.id = req.User.id;
    next();
}


exports.updateMe = catchAsync(async(req, res, next) => {
    console.log(req.file);
    console.log(req.body)
        //1) create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This  route is not for password updates. Please use /updateMyPassword.', 400))
    }

    //2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    //3) Update user document
    console.log(req.User.id);
    const updatedUser = await User.findByIdAndUpdate(req.User.id, filteredBody, { new: true, runValidators: true });


    res.status(200).json({
        status: 'success',
        user: updatedUser
    })
})

exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.User.id, { active: false })

    res.status(204).json({
        status: 'success',
        data: null
    })
})


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead'
    })
}


exports.getGuide = async(req, res, next) => {
    // console.log(`${req.params.name}`);
    // const users = await User.find();
    // let newUsers = users.filter(el => el.name.toLowerCase() == req.params.name);
    // var usersId = newUsers.map(el => el._id);
    // console.log(usersId);
    // res.status(200).json({
    //     status: 'success',
    //     data: usersId[0]
    // });
    // next();
    console.log(req.body);
    console.log(`${req.body.guides}`);
    var guides = new Array();
    var newUsers;
    var usersId = new Array();
    guides = req.body.guides;
    const users = await User.find();
    i = 0;
    guides.forEach(namep => {
        namep = namep.toLowerCase();
        console.log("for name p");
        newUsers = users.filter(el => el.name.toLowerCase() == namep);
        usersId[i] = newUsers.map(el => el._id);
        ++i
    });
    // console.log("This place ", users)
    // let namep = (req.params.name).toLowerCase();
    // console.log(namep.toLowerCase());
    // newUsers = users.filter(el => el.name.toLowerCase() == namep);
    // var usersId = newUsers.map(el => el._id);
    console.log(usersId);
    req.body.guides = usersId;
    // res.status(200).json({
    //     status: 'success',
    //     data: usersId[0]
    // });

    next();
}


exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do Not update Passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);