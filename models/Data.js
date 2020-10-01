const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:'Require'
        },
        password: {
            type: String,
            required:'Require'
        },
     
        phoneNumber: {
            type: String,
            required:'Require'
        },
        address: {
            type: String,
            required:'Require'
        }
    }
)
module.exports = mongoose.model("Data", dataSchema);
