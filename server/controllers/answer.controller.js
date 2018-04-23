const Answer = require('../models/answer.model')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll (req, res) {
    Answer
      .find({
        questionId: req.params.id
      })
      .exec()
      .then(response => {
        res.status(200).json({
          message: 'success get data',
          data: response
        })
      }).catch(err => {
        res.status(500).json({
          message: 'get data failed',
          err
        })
      })
  },
  add (req, res) {
    let comment = req.body.comment
    let userId = req.decoded.id
    let newAnswer = new Answer({
      comment: comment,
      userId: userId,
      questionId: req.params.id
    })
    newAnswer.save().then(response => {
      res.status(200).json({
        message: 'success insert data',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'insert error',
        err
      })
    })
  },
  remove (req, res) {
    Answer.findByIdAndRemove(req.params.id).then(response => {
      res.status(200).json({
        message: 'delete success',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'delete error',
        err
      })
    })
  },
  voteUp (req,res) {
    Answer.update({ _id: req.params.id }, {
        $addToSet: { voteUp: { $each: [req.decoded.id] } },
    }).then(response => {
        res.status(200).json({
            message: 'vote up success',
            data: response
        })
    }).catch(err => {
        res.status(500).json({
            message: 'vote up error',
            err
        })
    })
  },
  voteDown (req,res) {
    Answer.update({ _id: req.params.id }, {
        $addToSet: { voteDown: { $each: [req.decoded.id] } },
    }).then(response => {
        res.status(200).json({
            message: 'vote down success',
            data: response
        })
    }).catch(err => {
        res.status(500).json({
            message: 'vote down error',
            err
        })
    })
  }
}