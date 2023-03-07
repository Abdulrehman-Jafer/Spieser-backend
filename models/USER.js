import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userimage: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likedPost: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
