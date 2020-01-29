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
            type: Date,
            default: Date.now
        }
      });

module.exports = mongoose.model('Subscriber', subSchema);