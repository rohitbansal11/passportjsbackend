const express = require('express')
const router = express.Router()
const {protect, authorize} =require('../middleware/protect')


const userCURD =require('../controller/userCURD')

router.use(protect, authorize('Admin'))

router.get('/admin/user', userCURD.AllUsers)
router.patch('/admin/user/:id', userCURD.updateuser)
router.delete('/admin/user/:id', userCURD.deleteuser)















module.exports=router