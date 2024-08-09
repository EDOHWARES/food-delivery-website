import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({email});

        // check if user exists
        if (!user) {
            return res.json({
                success: false,
                message: 'user does not exist'
            });
        };

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid Password'
            });
        };

        const token = createToken(user._id);
        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Erro'
        });
    };
};

// create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;

    try {
        // checking if user already exists
        const exist = await userModel.findOne({email});
        if (exist) {
            return res.json({
                success: false,
                message: 'User already exists'
            });
        };

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Please enter a valid email'
            });
        };

        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Please enter a strong password',
            });
        };

        // hashing/encrypting user password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({
            success: true,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error',
        });
    };
};

export {loginUser, registerUser};