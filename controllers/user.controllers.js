import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";



export const signupUser = async (req, res, next) => {

    try{

        const { name, email, password } = req.body;

        if(!name || !email || !password){
            const error = new Error(`Please provide all required fields: name, email, and password.`);
            error.statusCode = 400; // for bad request we use 400
            throw error
        }

        const user = await User.findOne({ email });

        if(user){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Step 1: Soo here we generate salt (random string for extra security)
        const salt = await bcrypt.genSalt(10);

        // Step 2: Hash the password with the salt
        // Step 3: Save this hashed password in database (not plain password)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create({
            name, email,
            password: hashPassword
        });


        const token = jwt.sign(
            { userId: newUsers._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        )


        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers
            }
        });

    }catch(err){
        next(err);
    }

}



export const loginUser = async (req, res, next) => {

    try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        })

    }catch(err){
        next(err);
    }

}