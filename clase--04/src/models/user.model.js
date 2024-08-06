import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        //required: true,
        unique: true, 
        index: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    age: {
        type: Number, 
        required: true
    }, 
    accountId: { 
        type: String 
    }, 
    provider: { 
        type: String 
    } 
})

const UserModel = mongoose.model("users", schema); 

export default UserModel; 