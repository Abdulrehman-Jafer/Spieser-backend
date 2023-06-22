import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import UserRoute from "./routes/UserRoutes.js"
import PostRouter from "./routes/PostRoutes.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/api/user",UserRoute)
app.use("/api/post",PostRouter)
app.use("/",(req,res,next)=>{
    res.send("<h1>Spieser Restful Api</h1>")
    next()
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT || 9000,()=>{
    console.log(`live at http://localhost:${process.env.PORT}`)
    })
}).catch(err => console.log(err))