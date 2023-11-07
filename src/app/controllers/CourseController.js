const Course = require("../models/Course");
const { mongooseToObject } = require("../../until/mongoose");
const Swal = require("sweetalert2");
class CourseController {
  //[GET] /news
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  //[POST] /courses/create
  store(req, res, next) {
    //  res.json(req.body);
    req.body.image = `http://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[GET] /courses/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //[DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[DELETE] /courses/:id/force
  forcedelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: {$in: req.body.courseIds} })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }
  handleFormTrashActions(req, res, next){
    switch (req.body.action) {

      case "restoreAll":
        Course.restore({ _id: {$in: req.body.courseIds} })
        .then(() => res.redirect("back"))
        .catch(next);

        break;
      case "forceDelete":
        Course.deleteOne({ _id: {$in: req.body.courseIds} })
      .then(() => res.redirect("back"))
      .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }

}

module.exports = new CourseController();
