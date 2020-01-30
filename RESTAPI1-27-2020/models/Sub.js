const mongoose = require('mongoose'),


      subSchema = mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        subToChannel: {
            type: String,
            required: true
        },

        subDate: {
            type: String,
            default:  Date(Date.now()).toString().substr(0,15)
        }
      });

module.exports = mongoose.model('Subscriber', subSchema);