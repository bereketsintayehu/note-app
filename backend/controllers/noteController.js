const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const User = require('../models/userModel')

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user.id })

    res.status(200).json(notes)
})

// @desc    Set notes
// @route   POST /api/notes
// @access  Private
const setNote = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const note = await Note.create({
        text: req.body.text,
        md: req.body.md,
        user: req.user.id
    })

    res.status(200).json(note)
})

// @desc    Update notes
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(404)
        throw new Error('Note not found')
    }

    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches note user
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedNote)
})

// @desc    Delete notes
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(404)
        throw new Error('Note not found')
    }

    //Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged in user matches note user
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await Note.deleteOne(note)

    res.status(200).json({id: req.params.id})
})



module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
}