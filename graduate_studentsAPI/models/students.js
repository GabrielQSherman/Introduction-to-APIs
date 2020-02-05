const mongoose = require('mongoose'),


    studentSchema = mongoose.Schema({

        FirstName: String,
        LastName: String,

        GradYear: Number,
        GradMonth: Number,

        Job_Title:String ,

        Company_Name: String,

        Key_Skills: [String],

        GitHub:String ,

        LinkedIn: String,

        Twitter: String,

        LinkedIn: String

    })



module.exports = mongoose.model('Student', studentSchema);