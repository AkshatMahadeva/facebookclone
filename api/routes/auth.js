import { User } from "../models/UserSchema.js";
import express from "express";
import multer from "multer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getAuth from "../middleware/authenticate.js";

// Setup Multer middleware
const upload = multer({ dest: "uploads/" });

const UserRouter = express.Router()

const Response = (res, status, result) => {
    res.status(status).json(result)
}

UserRouter.get("/all", getAuth, async (req, res) => {
    await User.find({
        _id: { $ne: req.authId },
        followers: { $nin: [req.authId] }
    }).select("-password")
        .then(result => Response(res, 200, result))
        .catch(err => Response(res, 400, { error: err }))
})

UserRouter.post("/register", upload.single("logo"), async (req, res) => {
    try {
        const { name, email, password, education, occupation, bio } = req.body;
        const logo = req.file.filename;
        const hashPassword = await bcrypt.hash(password, 12)
        const user = await User.create({ name, email, password: hashPassword, education, occupation, logo, bio })
        Response(res, 200, user)
    } catch (error) {
        Response(res, 400, { error: error.message })
    }
})

UserRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return Response(res, 404, { error: "user not found" })
        }
        const comarePassword = await bcrypt.compare(password, existUser.password)
        if (!comarePassword) {
            return Response(res, 404, { error: "wrong password" })
        }
        const token = jwt.sign({ id: existUser._id }, process.env.SECRET)
        Response(res, 200, { user: existUser, token: token })
    } catch (error) {
        Response(res, 400, { error: error.message })
    }
})

UserRouter.get("/auth", getAuth, async (req, res) => {
    Response(res, 200, req.auth)
})

UserRouter.get("/:id", getAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("followers");
        Response(res, 200, user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

UserRouter.put("/:id/follower/add", getAuth, async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { followers: req.authId } },
        { new: true }
      );
      if (!user) {
        return Response(res, 400, { error: "user not found" });
      }
      Response(res, 200, user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  UserRouter.put("/:id/follower/remove", getAuth, async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.authId } },
        { new: true }
      );
      if (!user) {
        return Response(res, 400, { error: "user not found" });
      }
      Response(res, 200, user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  UserRouter.get("/:id/following", getAuth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("followers", "-password");
  
      if (!user) {
        return Response(res, 404, { error: "User not found" });
      }
  
      const following = await User.find({
        followers: { $in: [req.params.id] }
      }).select("-password");
  
      Response(res, 200, following);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });



export default UserRouter;
