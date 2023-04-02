import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    occupation: String,
    education: String,
    logo: String,
    bio: String,
    followers: [
        {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    ]
})

export const User = mongoose.model("user", userSchema)
