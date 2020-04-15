const express = require('express')
const courseController = require('../controllers/courseController')
const router = express.Router()

router
  .route('/')
  .get(
    courseController.addCacheKey('allCourses'), //add the key to retrieve data from cache
    courseController.checkCache, //check for the data in cache with the give cacheKey(key)
    courseController.getAllCourses
  )
  .post(courseController.createCourse)

router
  .route('/:id')
  .get(
    courseController.addCacheKey(null), //cacheKey == null (id will be used as default)
    courseController.checkCache,
    courseController.getCourseById
  )
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse)

module.exports = router
