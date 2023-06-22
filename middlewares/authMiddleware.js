import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect routes Token based authentication
export const requireSignin = (req, res, next) => {
    try{
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        );
        req.user = decode;
        console.log(req.user)
        next();
    }catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Internal server error, requireSignin",
        })
    }

}

//admin access 
export const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
        console.log(user);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",
            })
        }else{
            next();
        }
    }catch (err) {
        console.log(err);
        res.status(401).send({
            success: false,
            message: "error Middleware isAdmin",
            err,
        })
    }
}