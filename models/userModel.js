import mongoose from "mongoose";

const userSchema = mongoose.Schema({
//add name, email, password, phone, address, role
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    role: { 
        type: Number, 
        default: 0, 
        required: true 
    },


},{ timestamps: true });
export default mongoose.model("users", userSchema);