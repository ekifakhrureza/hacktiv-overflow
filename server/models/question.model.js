const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  content: {
    type: String,
    required: [true, 'content cannot be empty']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  voteUp : [{
    type: Schema.Types.ObjectId,
    ref: "User"    
  }],
  voteDown : [{
    type: Schema.Types.ObjectId,
    ref: "User"  
  }]
},{
  timestamps: true
})

let Question = mongoose.model('Question',questionSchema)
module.exports = Question