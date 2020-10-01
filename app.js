const express = require("express")
const { request, response } = require("express");
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const Data = require("./models/Data");


app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://phongtran:060697@cluster0.oyebn.mongodb.net/iCrowdTaskDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.route('/workers')
.get( (req, res)=>{
    Data.find((err, list)=>{
            if (err) {res.send(err)}
            else {res.send(list)}
        })
    })
.post( (req,res)=>{
    const worker = new Data({
        name : req.body.name,
        password : req.body.password,
        phoneNumber : req.body.phoneNumber,
        address : req.body.address,
    })
    worker.save((err) =>{
        if (err) {res.send(err)}
        else res.send ('Add worker')
    })
})
.delete((req,res) =>{
    Data.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('All worker delete sucessfully')}
    })
})

app.route('/workers/:id')
.get((req, res)=>{
    Data.findOne({_id: req.params.id}, (err, workerDetail)=>{
        if (workerDetail) (res.send(workerDetail))
        else res.send("No worker can be found")
    })
})

.put((req,res)=>{
    Data.update(
    {_id : req.params.id},
    {name : req.body.name},
    {overwrite:true},
    (err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully update')}
    })
})

.patch((req, res)=>{
    Data.update(
        {_id: req.params.id},
        {$set:{name: req.body.name,
            password: req.body.password,
            phoneNumber : req.body.phoneNumber,
            address: req.body.address,
            }},
        (err)=>{
            if (!err) {res.send('Successfully update a worker')}
            else res.send(err)
        }
    )
})

.delete((req,res) =>{
    Data.deleteOne((err) =>{
        if (err) {res.send(err)}
        else {res.send('Delete a worker')}
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, (req, res) => {
    console.log("Server is online")
})