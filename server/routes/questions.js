const express = require('express')
const router = express.Router()
const { getAll,getOne,add,update,remove,voteUp,voteDown } =  require('../controllers/question.controller')
const { auth } = require('../middlewares/auth')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/add', auth, add)
router.put('/update/:id', auth, update)
router.delete('/delete/:id', auth, remove)
router.put('/voteUp/:id', auth, voteUp)
router.put('/voteDown/:id', auth, voteDown)

module.exports = router
