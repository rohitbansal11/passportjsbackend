const mongoose = require("mongoose");
const express = require("express");
const dotenv = require('dotenv').config();
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
// ----------------------------------------Constant Env Variable ------------------------------------------|||
const PORT =process.env.PORT;
const MongoDbLink = process.env.mongodblink;
const frontend=process.env.ForntEndPort

// ----------------------------------------END  Constant Env Variable ------------------------------------------|||
//Routes 

const AuthRoute =require('./routes/AuthRoute');
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
    MongoDbLink,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: frontend, // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());


//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
//  api for test
app.get('/' , (req, res)=>{
    res.json('hiiii')
})

//----------------------------------------- END OF Test Api---------------------------------------------------

//route start here 
app.use('/api' , AuthRoute);


//Start Server
app.listen(PORT, () => {
  console.log("Server Has Started");
});
