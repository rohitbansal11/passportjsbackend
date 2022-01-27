const express = require("express");
const user = require("../module/user");


const AllUsers = async (req, res) => {
   try {
    const users = await user.find().select('-password -role -__v');
    users.filter((user) => user.role !== 'Admin');  
    res.json(users).status(200);
   } catch (error) {
       console.error(err)
   }
}






const updateuser= async (req,res)=>{
try{

    let data = req.body;
    let id = req.params.id;
  
    const details = await user.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  
    res.send(details).status(200);

}catch{
    res,json(err)

}


}


const deleteuser = async (req, res, next) => {
    let id = req.params.id
  try {
    user.findByIdAndDelete(id, function (err, docs) {
      if (err) {
       res.json({
         err
       }).status(400)
      } else {
        res.json({
          massage:'Cab Deleted Successfull'
        }).status(200)
      }
    });
  } catch (err) {
    res.json({
      err,
    }).status(500)
  }
};

















module.exports = {
    AllUsers,
    updateuser,
    deleteuser
   
  };
  