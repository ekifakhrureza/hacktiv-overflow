const Question = require('../models/question.model')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll (req, res) {
    Question
      .find()
      .sort([['createdAt', -1]])
      .populate('userId')
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
  getOne (req, res) {
    let id = req.params.id
    Question
      .findById(id)
      .populate('userId')
      .exec()
      .then(response => {
      res.status(200).json({
        message: 'success get data by id',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'get data by id failed',
        err
      })
    })
  },
  add (req, res) {
    let title = req.body.title
    let content = req.body.content
    let userId = req.decoded.id
    let newQuestion = new Question({
      title: title,
      content: content,
      userId: userId
    })
    newQuestion.save().then(response => {
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
    let id = req.params.id
    Question.findByIdAndRemove(id).then(response => {
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
  update (req, res) {
    let title = req.body.title
    let content = req.body.content
    let id = req.params.id
    Question.update({ _id: id }, {
      $set: { title: title, content: content },
    }).then(response => {
      res.status(200).json({
        message: 'update success',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'update error',
        err
      })
    })
  },
  voteUp (req,res) {
    console.log('masuk sini gak')
    
    let id = req.params.id
    let userId = req.decoded.id
    Question.update({ _id: id }, {
        $addToSet: { voteUp: { $each: [userId] } },
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
    let id = req.params.id
    let userId = req.decoded.id
    Question.update({ _id: id }, {
        $addToSet: { voteDown: { $each: [userId] } },
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