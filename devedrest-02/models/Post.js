const mongoose = require('mongoose'),

      PostSchema = mongoose.Schema({
          title: {
              type: String,
              required: true
          },
          message: {
              type: String,
              required: true
          },
          date: {
              type: Date,
              default: Date.now
          }
      });

module.exports = mongoose.model('Post', PostSchema);