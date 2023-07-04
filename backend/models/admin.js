const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.pre("Save", () => {
  try {
    bcrypt.genSalt(14, function (err, salt) {
      bcrypt.hash(this.password, salt, function (err, hash) {
        this.password = hash;
      });
    });
  } catch (error) {
    console.log("Error in hashing");
  }
});

const Admin = mongoose.model("Admin Credentials", adminSchema);

module.exports = Admin;
