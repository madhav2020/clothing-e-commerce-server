const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../database/models/user.model");

// Signup function
module.exports.signup = async (req, res, next) => {
  try {
    const { name, phone, email, password, photo } = req.body;
    console.log("hello.....", req.body);


    if (!name ) {
      // alert("Please enter a valid name")
      return res.json({
        status: "fail",
        data: "null",
        message: "name fields are mandatory",
      });
    }
    if (!phone) {
      // alert("Please enter a valid valid phone")
      return res.json({
        status: "fail",
        data: "null",
        message: "phone fields are mandatory",
      });
    }
    if (!email) {
      // alert("Please enter a valid email")
      return res.json({
        status: "fail",
        data: "null",
        message: "email fields are mandatory",
      });
    }
    if (!password) {
      // alert("Please enter a valid password")
      return res.json({
        status: "fail",
        data: "null",
        message: "password fields are mandatory",
      });
    }
    // if (!name || !phone || !email || !password) {
    //   return res.json({
    //     status: "fail",
    //     data: "null",
    //     message: "All fields are mandatory",
    //   });
    // }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({
        status: "fail",
        data: "null",
        message: "You are existing customer, please login",
      });
    }
    //   hash the customer input password before saving
    const hash_password = await bcrypt.hash(password, 12);
    // console.log(hash_password);

    const new_user = await userModel.create({
      name,
      phone,
      email,
      password: hash_password,
      role: "user",
      photo,
    });
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({
      status: "success",
      data: new_user,
      token: token,
      message: "Signup successful✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "something went wrong with signup please try again",
      error_msg: error.message,
    });
  }
};

// login function
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        status: "fail",
        data: null,
        message: "You are not registered yet, please register first",
      });
    }
    const check_password = await bcrypt.compare(password, user.password);
    if (!check_password) {
      return res.json({
        status: "fail",
        data: null,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({
      status: "success",
      data: user,
      token: token,
      message: "Login success✅",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      data: null,
      message: "something went wrong with login please try again",
      error_msg: error.message,
    });
  }
};
