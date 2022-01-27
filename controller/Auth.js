const express = require('express');
const user = require('../module/user');
const bcrypt = require("bcryptjs");
const passport = require('passport');
require('../passportConfig/passportConfig')(passport);




const Login = async (req, res, next) => {
   
        passport.authenticate("local", (err, user, info) => {
          if (err) throw err;
          if (!user) res.send("No User Exists");
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send("Successfully Authenticated");
              console.log(req.user);
            });
          }
        })(req, res, next);
     
   



  };


const Register =async(req,res, next)=>{
    user.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
          const newUser = new user({
            name:req.body.name,
            email: req.body.email,
            password: hashedPassword,
          });
          await newUser.save();
          res.send("User Created");
        }
      });



}


















  module.exports = {    
    Login,
    Register,
  };