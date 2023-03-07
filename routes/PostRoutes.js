import express from "express"
import { createNewPost,getAllPost,LikePost,AddComment,getAllComments,deleteThePost,saveThePost,getSavedPosts } from "../controllers/PostController.js"
const PostRouter = express.Router()

PostRouter.post("/create",createNewPost)
PostRouter.get("/",getAllPost)
PostRouter.post("/likepost",LikePost)
PostRouter.post("/addcomment",AddComment)
PostRouter.post("/comments",getAllComments)
PostRouter.delete("/deletepost/:userId/:postId",deleteThePost)
PostRouter.post("/savepost",saveThePost)
PostRouter.get("/getsavedpost/:userId",getSavedPosts)
export default PostRouter