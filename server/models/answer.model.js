const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let answerSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'comment cannot be empty']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question"
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

let Answer = mongoose.model('Answer',answerSchema)
module.exports = Answer