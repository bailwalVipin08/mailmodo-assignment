//import the Course schema
const Course = require('../models/Course')

//retrieve all courses from the database
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find() //perform a find operation on the database
    res.status(200).json({
      status: 'success',
      data: {
        courses, //return the courses in a json response on success
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: `An error occurred! ${error}`,
    })
  }
}

exports.createCourse = async (req, res) => {
  try {
    //create the new course from the body of the request
    const newCourse = await Course.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newCourse,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: `An error occurred! ${error}`,
    })
  }
}

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.findById(id)
    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: `An error occurred! ${error}`,
    })
  }
}
