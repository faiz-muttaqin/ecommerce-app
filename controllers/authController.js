import userModel from "../models/userModel.js";
import {hashPassword} from "../helpers/authHelper.js";

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