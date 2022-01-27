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

});

module.exports = mongoose.model("User", user);
