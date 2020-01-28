const mongoose = require('mongoose'),

//making the schema, how a basic post will be formated
      postSchema = mongoose.Schema({
          title: {
              type: String,
              require: true
          },
          message: {
              type: String,
              require: true
          },
          date: {
              type: Date,
              default: Date.now
          }
      });

module.exports = mongoose.model('Post', postSchema);