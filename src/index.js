const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/route.js')
const { default: mongoose } = require('mongoose')
const app = express()



app.use(bodyParser.json())

mongoose.connect("mongodb+srv://manaskumar:iFVJhjYrsH7iars8@cluster0.s4pqkzd.mongodb.net/group64Database?retryWrites=true&w=majority"
    , {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.use(function (req, res) {
    
    return res.status(400).send({status : false, message : "path not found"})
    });


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
