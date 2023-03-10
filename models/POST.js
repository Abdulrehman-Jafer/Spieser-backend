import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdBy: {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    userimage: { type: String, required: true },
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now()},
  comments: [
    {
      username:{type:String,required:true},
      userimage:{type:String,required:true},
      userId:{type:Schema.Types.ObjectId,required:true},
      commentBody:{type:String,required:true},
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
