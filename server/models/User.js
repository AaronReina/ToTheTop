const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    imgPath: {
      type: String,
      default:
        "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/userDefault.png"
    },
    invitationCha: Array,
    invitationIns: Array,
    privated: Array,
    challenged: Array,
    inspectors: Array,
    active: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
