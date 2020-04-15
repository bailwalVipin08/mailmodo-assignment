const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course Name is required!'],
    unique: true,
  },

  rating: {
    type: Number,
    default: 4.0,
  },

  price: {
    type: Number,
    required: [true, 'Course Price is required!'],
  },

  duration: {
    type: String,
  },

  instructor: {
    type: String,
    required: [true, 'Instructor Name is required!'],
  },

  'last-update': {
    type: String,
  },

  description: {
    type: String,
    required: [true, 'Course Description is required!'],
  },
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course
