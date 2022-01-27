const express = require('express')
const router = express.Router()


const AuthController =require('../controller/Auth')



router.post('/auth/login', AuthController.Login)
router.post('/auth/register' , AuthController.Register)















module.exports=router