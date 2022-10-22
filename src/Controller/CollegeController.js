const collegeModel = require("../Model/collegeModel.js")
const validator = require("validator")
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
};
const createcollage = async function (req, res) {
    try {
        const nameregex = /^[a-zA-Z , ]*$/;
        const reqquery = req.query
        const collage = req.body
        if (!isValidRequest(collage)) return res.status(400).send({ status: false, message: "body required" })
        if (isValidRequest(reqquery)) return res.status(400).send({ status: false, message: "invalid request" })

        if (!isValid(collage.name)) return res.status(400).send({ status: false, message: "name required" })
        const isnameAlreadyUsed = await collegeModel.findOne({ name: collage.name })
        if (isnameAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "name is already registered" })
        }

        if (!collage.name.match(nameregex)) return res.status(400).send({ status: false, message: "name is not valid format" })

        if (!isValid(collage.fullName)) return res.status(400).send({ status: false, message: "fullName required" })
        if (!collage.fullName.match(nameregex)) return res.status(400).send({ status: false, message: "fullName must in valid format" })
        const isFullnameAlreadyUsed = await collegeModel.findOne({ fullName: collage.fullName })
        if (isFullnameAlreadyUsed) {
            return res.status(400).send({ status: false, msg: "Fullname is already registered" })
        }

        if (!isValid(collage.logoLink)) return res.status(400).send({ status: false, message: "logolink is required" })

        if (!validator.isURL(collage.logoLink)) { return res.status(400).send({ status: false, msg: "logoLink should be valid URL" }) }

        let collagecreate = await collegeModel.create(collage)

        res.status(201).send({ status: true, message: "collage created successfully", data: collagecreate })

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createcollage = createcollage