const express = require('express');
const router = express.Router();
const internController = require('../Controllers/internController')
const {createCollege,getCollege}=require("../Controllers/collegeController")
 

router.post('/functionup/colleges',createCollege)

router.post('/functionup/interns', internController.createIntern)

router.get('/functionup/collegeDetails',getCollege)


module.exports = router;
