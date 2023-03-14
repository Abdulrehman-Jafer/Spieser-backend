import express from "express"
import { signUp,logIn,getUserPosts,searchUser,getUserById} from "../controllers/UserController.js"
const UserRoute = express.Router()


UserRoute.post("/signUP",signUp)
UserRoute.post("/login",logIn)
UserRoute.post("/posts",getUserPosts)
UserRoute.post("/search",searchUser)
UserRoute.get("/:userId",getUserById)
export default UserRoute