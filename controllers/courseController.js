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
      message: error,
    })
  }
}
