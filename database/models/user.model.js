const { model } = require("mongoose");
const userSchema = require("../schema/user.schema");

const userModel = model("User", userSchema);

module.exports = userModel;
