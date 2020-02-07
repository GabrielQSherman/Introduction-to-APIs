const mongoose = require('mongoose'),


    studentSchema = mongoose.Schema({

        firstName: {type: String, required: true},

        lastName: {type: String, required: true},

        gradYear: {type: String, required: true},
        gradMonth: {type: String, required: true},

        job_Title: {type: String, required: true},

        company_Name: {type: String, required: true},

        key_Skills: {type: [String], required: true},

        gitHub: {type: String, required: true},

        linkedIn: {type: String, required: true},

        twitter: {type: String, required: true},

        linkedInIMG: {type: String, required: true},

        dateAdded: {type: String, default: Date(Date.now()).toString().substr(4,15)},

        lastUpdated: {type: String, default: Date(Date.now()).toString().substr(4,15)}

    })



module.exports = mongoose.model('Student', studentSchema);