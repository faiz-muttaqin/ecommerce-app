import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        //validation
        if(!name || !email || !password || !phone || !address ){
            return res.status(400).send({
                success: false,
                message: "Please fill all required fields"
            })
        }
        //check if user already exists
        const existingUser = await userModel.findOne({email});
        //if user exists
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: "User already exists, please login"
            })
        }
        //if user does not exist/register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({name, email,phone, address, password: hashedPassword}).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        })
    }catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

//POST LOGIN
export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //token
        const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    }catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export const testController = async (req, res) => { 
    console.log("protected Route");
    res.send("protected Route");
}