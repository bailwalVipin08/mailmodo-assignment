//import the Course schema
const Course = require('../models/Course')
const redis = require('redis')
const redis_client = redis.createClient(process.env.PORT_REDIS)

//configurable custom express middleware which returns a middleware function
exports.addCacheKey = function (key) {
  return function (req, res, next) {
    res.locals.cacheKey = key //set given key as cacheKey
    next() //go to the next middleware i.e., checkCache which will use this cacheKey to check for cache
  }
}

exports.checkCache = (req, res, next) => {
  //key is used to identify the data stored in redis-cache
  let key = res.locals.cacheKey === null ? req.params.id : res.locals.cacheKey

  //retrieve data from redis-cache
  redis_client.get(key, (error, cachedData) => {
    if (error) {
      res.status(500).json({
        status: 'failed',
        message: error,
      })
    }
    //if data exists in cache fetch it and return as response
    if (cachedData !== null) {
      res.status(200).json({
        status: 'success',
        data: JSON.parse(cachedData),
      })
    }
    //if data does not exists fallback to database and request data from database
    else {
      next() //move to the next middleware in the stack/chain
    }
  })
}

//retrieve all courses from the database
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find() //perform a find operation on the database
    //save the data to cache for future (3000 TTL)
    redis_client.setex('allCourses', 3000, JSON.stringify(courses))
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
    redis_client.setex(id, 3000, JSON.stringify(course)) //save the course in cache (3000 TTL) with id as the key

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
