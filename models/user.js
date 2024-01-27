const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({Name: String,
    password: String,
    email: String,
    role: String})
USER = mongoose.model("User", userSchema)

module.exports = USER