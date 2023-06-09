const express = require('express')
const router = express.Router()
const { 
    getNotes, 
    setNote, 
    updateNote, 
    deleteNote,
} = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, setNote)
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote)

module.exports = router