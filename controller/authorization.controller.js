const userModel = require("../database/models/user.model");

const jwt = require("jsonwebtoken");

// FUNCTION TO VERIFY THE CURRENT USER
module.exports.verify_token = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.json({
        status: "fail",
        data: null,
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.json({
        status: "fail",
        data: null,
        message: "User token expires or invalid",
      });
    }

    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.json({
        status: "fail",
        data: null,
        message: "User with this token doesn't exist",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.json({
      status: "error",
      data: null,
      message: "User Token verified successfully",
    });
  }
};

// FUNCTION TO CHECK WHICH USER IS CURRENTLY LOGGEDIN
module.exports.who_am_i = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.json({
        status: "fail",
        data: null,
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.json({
        status: "fail",
        data: null,
        message: "Token is invalid",
      });
    }

    // console.log(decoded._doc);
    const user = await userModel.findById(decoded._doc._id);

    if (!user) {
      return res.json({
        status: "fail",
        data: null,
        message: "user with this token value doesn't exist",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
      message: "user verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "something went wrong with the user",
    });
  }
};
