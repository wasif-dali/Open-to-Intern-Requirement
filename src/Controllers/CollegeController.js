const collegeModel = require('../Model/collegeModel')
const internModel = require('../Model/internModel')



const isValid = function (value) {
    if (typeof (value) === 'undefined' || value === null) return false
    if (typeof (value) === 'string' && value.trim().length == 0) return false
    return true
}

const isValidRequestBody = function (reqBody) {
    return Object.keys(reqBody).length > 0
}



//***************************CREATE COLLEGE**********************************/

const createCollege = async function (req, res) {
    try {

        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res
                .status(400)
                .send({ status: false, message: "please provide college data" })
        }

        const { name, fullName, logoLink } = requestBody

        if (!isValid(name)) {
            return res
                .status(400)
                .send({ status: false, message: "Name is required" })
        }
        if(! /^\w[a-zA-Z.\s]*$/.test(name)){
            return res.status(400).send({status:false,message:"name should be string"})
        }


        if (!isValid(fullName)) {
            return res
                .status(400)
                .send({ status: false, message: "Full Name is required" })
        }
        if(! /^\w[a-zA-Z.\s]*$/.test(fullName)){
            return res.status(400).send({status:false,message:"fullName should be string"})
        }


        if (!isValid(logoLink)) {
            return res
                .status(400)
                .send({ status: false, message: "LogoLink is required" })
        }

        const isNameNotUnique = await collegeModel.findOne({ name: name })

        if (isNameNotUnique) {
            return res
                .status(400)
                .send({ status: false, message: "name already exits" })
        }

        const newCollegeEntry = await collegeModel.create(requestBody)

        res
            .status(201)
            .send({ status: true, message: "new college entry done", data: newCollegeEntry })

    } catch (error) {

        res
            .status(500)
            .send({ error: error.message })

    }
}
//******************Get college**************************************/

const getCollege = async (req, res)=>{
  try {

    let filter = req.query
    
    
    if (!Object.keys(filter).length) return res.status(400).send({ status: false,message: "query should be present" });

    let checkCollegeName = await collegeModel.findOne({ name: filter.collegeName, isDeleted: false }) /*Check College Name From DB*/
    if (!checkCollegeName) return res.status(404).send({ status: false, message: "No such college Name found", });

    let collegeId = checkCollegeName._id /*Get CollegeID from CheckCollegeName*/
    let getAllInternData = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
    if (!getAllInternData.length) return res.status(404).send({ status: false,message: "No intern Apply for This College", });

    //assign value
    let {name,fullName,logoLink}=checkCollegeName

    //call value
    let collegeData = {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interns: getAllInternData
    }

    res.status(200).send({ status: true, data: collegeData });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};



module.exports = {createCollege,getCollege};