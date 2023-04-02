import express from "express";
import "./db/database.js"
import dotenv from "dotenv"
import cors from "cors"
import UserRouter from "./routes/auth.js";
import PostRouter from "./routes/post.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("uploads"))
app.use("/api/user", UserRouter)
app.use("/api/post", PostRouter)

app.get("/", (req, res)=>{
    res.send("This is facebook api")
})

app.listen(process.env.PORT, ()=>{
    console.log("app is running on ", process.env.PORT);
})
