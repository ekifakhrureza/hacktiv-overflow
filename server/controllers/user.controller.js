const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

module.exports = {
  register(req, res) {
    User.findOne({
      email: req.body.email
    }).then(data => {
      if (data) {
        res.status(202).json({
          message: 'Email Already Exist'
        })
      }

    }).catch(err => {
      console.log(err);

    })

    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    newUser.save()
      .then(response => {
        let payload = {
          id: response._id,
          email: response.email,
          name: response.name,
        }
        let token = jwt.sign(payload, process.env.SECRETKEY)
        res.status(200).json({
          message: 'register success',
          id: response._id,
          email: response.email,
          name: response.name,
          token: token,
        })
        nodemailer.createTestAccount((err, account) => {
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'hacktiv.overflow.eki@gmail.com', // generated ethereal user
              pass: process.env.PASSEMAIL // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          let mailOptions = {
            from: '"Hacktiv Overflow" <youremailserviceid@gmail.com>', // sender address
            to: response.email, // list of receivers
            subject: 'Eki from Hacktiv Overflow', // Subject line
            text: 'Welcome to Hacktiv Overflow - I’m so glad you decided to try out Hacktiv Overflow.', // plain text body
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          });
        });
      }).catch(err => {
        console.log('error kali');
        console.log(err);
        res.status(500).json({
          message: 'register failed',
          err
        })
      })
  },

  login(req, res) {
    User.findOne({
      email: req.body.email
    }).then(data => {
      if (data) {
        var result = bcrypt.compareSync(req.body.password, data.password);
        if (result) {
          let payload = {
            id: data.id,
            email: data.email,
            name: data.name,
          }
          let token = jwt.sign(payload, process.env.SECRETKEY)
          res.status(200).json({
            message: 'login success',
            id: data.id,
            email: data.email,
            name: data.name,
            token: token,
          })
        } else {
          res.status(202).json({
            message: 'Wrong Username / Password'
          })
        }
      } else {
        res.status(202).json({
          message: 'Wrong Username / Password'
        })
      }
    }).catch(err => {
      res.status(500).json({
        message: 'Sign in failed'
      })
    })

  }
}