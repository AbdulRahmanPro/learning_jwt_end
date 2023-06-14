const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { json } = require("express");
const userShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "املئ حقل بريد الكتروني"],
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "املئ حقل اسم المستخدم"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "يرجو ادخال كلمة مرور"],
      minlength: [6, "الحد الادنى لكتابة كلمة سر عليها ان تتكون من 6 احرف"],
    },
  },

  { timeseries: true, collection: "User_Normal" }
);

userShcema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
userShcema.statics.login = async function (email, password) {
  const User = this;
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(JSON.stringify(user._id));
    if (auth) {
      return user;
    }
    throw Error("كلمة المرور غير صحيحة");
  }
  throw Error("بريد الكتروني غير صحيح");
};

const User = mongoose.model("User", userShcema);

module.exports = User;
