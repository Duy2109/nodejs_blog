
const Course = require('../models/Course');
const {mongooseToObject} = require('../../until/mongoose')

class CourseController {
  //[GET] /news
   show(req, res, next) {
      Course.findOne({slug: req.params.slug})
      .then(course =>{
        res.render('courses/show',{course: mongooseToObject(course)});
   })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next){
    res.render('courses/create');
  }
  //[POST] /courses/create
  store(req, res, next){
      //  res.json(req.body);
      const formData= req.body;
      formData.image=`http://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
      const course = new Course(formData);
      course.save()
      .then(() => res.redirect('/'))
      .catch(next);

  }

//[GET] /courses/edit
  edit(req, res, next){
    Course.findById(req.params.id)
    .then(course=> res.render('courses/edit',{
      course: mongooseToObject(course)
    }))
    .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next){
    Course.updateOne({_id: req.params.id},req.body)
    .then(()=> res.redirect('/me/stored/courses'))
    .catch(next);
  }
}

module.exports = new CourseController();