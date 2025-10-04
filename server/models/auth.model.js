import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
  profilePicture: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // allow multiple nulls
  },
  userRoom: [userRoomSchema]
});

const userRoomSchema = new Mongoose.Schema({
  roomId: String,
  score: Number,
  maxScore: Number,
  roomStatus: {
    type: String,
    enum: ["waiting", "active", "started", "finished"],
    default: "waiting",
  }
})

const User = mongoose.model("User", userSchema);
export default User;

