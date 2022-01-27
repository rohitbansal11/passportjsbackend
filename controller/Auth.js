const express = require("express");
const user = require("../module/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passportConfig/passportConfig")(passport);

const Login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(user)

       
          let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIME,
          });

          let data = {
            name: req.user.name,
            email: req.user.email,
            subscription: req.user.subscription,
            role:req.user.role,
            token: token,
          };
       
          res.json({
            data,
            massage: "Log In Successfull",
          });
       
      });
    }
  })(req, res, next);
};

const Register = async (req, res, next) => {
  user.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc)
      res.json({
        massage: "User Already Exists",
      });
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        subscription: req.body.subscription || "No Subscription",
        role: req.body.role || "user",
      });
      await newUser.save();
      res.json({
        massage: "User Created",
      });
    }
  });
};

module.exports = {
  Login,
  Register,
};
