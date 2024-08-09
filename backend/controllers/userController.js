import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

// login user
const loginUser = async (req, res) => {

};

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

        // hasshing/encrypting user password
        
    } catch (error) {
        
    }
};

export {loginUser, registerUser};