import express from "express"
import { Post } from "../models/PostSchema.js"
import getAuth from "../middleware/authenticate.js"
import multer from "multer";

const PostRouter = express.Router()

const upload = multer({ dest: "uploads/" });

const Response = (res, status, result) => {
    res.status(status).json(result)
}

PostRouter.get("/all", getAuth, async (req, res) => {
    try {
        const post = await Post.find().populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            }
        }).populate("user", "-password")
        Response(res, 200, post)
    } catch (error) {
        Response(res, 400, { error: error.message })
    }
})

PostRouter.get("/user/:userId", getAuth, async (req, res) => {
    await Post.find({ user: req.params.userId }).populate({ path: 'comments', populate: { path: "user", select: "-password" } }).populate("user", "-password")
        .then(result => Response(res, 200, result))
        .catch(err => Response(res, 400, { error: err }))
})

PostRouter.get("/:postId", getAuth, async (req, res) => {
    await Post.findById(req.params.postId).populate({ path: 'comments', populate: { path: "user", select: "-password" } }).populate("user", "-password")
        .then(result => Response(res, 200, result))
        .catch(err => Response(res, 400, { error: err }))
})

PostRouter.post("/", getAuth, upload.single("media"), async (req, res) => {
    try {
        const newPost = new Post({
            user: req.authId,
            content: req.body.content,
        })
        if (req.file) {
            newPost.media = req.file.filename;
        }
        await newPost.save()
        Response(res, 200, { msg: "post created" })
    } catch (error) {
        Response(res, 400, { error: error.message })
    }
})

PostRouter.delete("/:postId", getAuth, async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId)
        .then(result => Response(res, 200, { msg: "post deleted", post: result }))
        .catch(err => Response(res, 400, { error: err }))
})

PostRouter.put("/:id/likes/add", getAuth, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.authId }
        }, { new: true })
        if (!post) {
            return Response(res, 404, { error: "post not found" })
        }
        Response(res, 200, { msg: "you liked the post", post: post })
    } catch (error) {
        console.log(error.message);
        Response(res, 400, { error: error.message })
    }
})

PostRouter.put("/:id/likes/remove", getAuth, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.authId }
        }, { new: true })
        if (!post) {
            return Response(res, 404, { error: "post not found" })
        }
        Response(res, 200, { msg: "removed like", post: post })
    } catch (error) {
        console.log(error.message);
        Response(res, 400, { error: error.message })
    }
})

PostRouter.put("/:id/comments/add", getAuth, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                    user: req.authId,
                    comment: req.body.comment
                }
            }
        }, { new: true })
        if (!post) {
            return Response(res, 404, { message: "Post not found" });
        }
        Response(res, 200, { msg: "comment added!", post: post });
    } catch (error) {
        console.log(error.message);
        Response(res, 400, { error: error.message })
    }
})

PostRouter.put("/:id/comments/:commentId/remove", getAuth, async (req, res) => {
    try {
        // console.log(req.params.id, req.params.commentId);
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: {
                comments: {
                    _id: req.params.commentId,
                    user: req.authId,
                }
            }
        }, { new: true })
        if (!post) {
            return Response(res, 404, { message: "Post not found" });
        }
        Response(res, 200, { msg: "comment deleted!", post: post });
    } catch (error) {
        console.log(error.message);
        Response(res, 400, { error: error.message })
    }
})

export default PostRouter;
