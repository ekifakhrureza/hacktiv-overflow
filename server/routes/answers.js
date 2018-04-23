const express = require('express')
const router = express.Router()
const { getAll,add,remove,voteUp,voteDown } =  require('../controllers/answer.controller')
const { auth } = require('../middlewares/auth')

router.get('/:id',getAll)
router.post('/add/:id', auth, add)
router.delete('/delete/:id', auth, remove)
router.put('/voteUp/:id', auth, voteUp)
router.put('/voteDown/:id', auth, voteDown)

module.exports = router
