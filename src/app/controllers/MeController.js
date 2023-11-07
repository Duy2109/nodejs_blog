const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../until/mongoose");

class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    
    let courseQuery= Course.find({});

    if(req.query.hasOwnProperty('_sort')){
      courseQuery=courseQuery.sort({
        [req.query.column]:req.query.type
      });
    }



    Promise.all([Course.find({}), Course.findDeleted({ deleted: false })])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount:deletedCount.filter((course) => course.deleted).length,
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }


  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
