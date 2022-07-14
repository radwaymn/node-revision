const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isAlpha(val);
      },
      message: "Invalid name",
    },
  },
  email: {
    type: String,
    requird: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isStrongPassword(val);
      },
      message: "Weak password",
    },
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    requird: true,
    unique: true,
  },
  admin: {
    type: Boolean
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
  next();
});

module.exports = mongoose.model("User", userSchema);
