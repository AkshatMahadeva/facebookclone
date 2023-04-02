import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";

const getAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        // console.log(token);
        if(!token){
            return res.status(403).json({error: "unautheraized"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRET)
        if(!verifyToken){
            return res.status(403).json({error: "unautheraized"})
        }
        req.authId = verifyToken.id;
        req.auth = await User.findById(verifyToken.id)
        next()
    } catch (error) {
        res.status(403).json({error: error.message})
    }
}

export default getAuth;