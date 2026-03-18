import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    googleId: {
      type: String
    },

    avatar: {
      type: String
    },

    resumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);