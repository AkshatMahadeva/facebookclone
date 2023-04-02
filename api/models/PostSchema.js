import mongoose from "mongoose";

const repliesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    reply: {
        type: String,
        required: true
    },
}, {timestamps: true})

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: String,
        required: true
    },
    replies:[repliesSchema]
}, {timestamps: true})

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    content:{
        type: String,
    },
    media: {
        type: String,
    },
    comments:[commentSchema],
    likes:[mongoose.Schema.Types.ObjectId]
}, {timestamps: true})

export const Post = mongoose.model("post", PostSchema)

