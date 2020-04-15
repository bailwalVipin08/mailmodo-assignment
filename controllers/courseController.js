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

//get a course with the id provided as a request parameter
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params //destructure id from request parameters
    const course = await Course.findById(id) //search for the course with the id provided
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

//search and update the course whose id is given as req parameter and the new details as req body
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //return the updated course
      runValidators: true, //run all the validators defined for the Course Schema
    })
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

//search and delete the course whose id is given as a request parameter
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null, //do not return any data
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: `An error occurred! ${error}`,
    })
  }
}
