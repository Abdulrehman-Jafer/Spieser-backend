import express from "express"
import { createNewUser,LogIn,getUserPosts,SearchUser } from "../controllers/UserController.js"
const UserRoute = express.Router()


UserRoute.post("/create",createNewUser)
UserRoute.post("/login",LogIn)
UserRoute.post("/posts",getUserPosts)
UserRoute.post("/search",SearchUser)
export default UserRoute