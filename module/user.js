const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: {
   type: String,
    required:[true, 'Name is requires']
  },
  password: {
   type: String,
    required:[true , 'password in required']
  },
  email:{type:String,
    required: [true, 'email is required']
  },
  subscription:{type:String},
  subscription_Expire_Date:{type:String},
  role:{type:String}

});

module.exports = mongoose.model("User", user);


