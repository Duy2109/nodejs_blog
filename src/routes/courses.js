const express = require("express");
const router = express.Router();
const coursesController = require("../app/controllers/CourseController");

router.get("/create", coursesController.create);
router.post("/store", coursesController.store);
router.get("/:id/edit", coursesController.edit);
router.post("/handle-form-actions",coursesController.handleFormActions)
router.post("/handle-form-trash-actions",coursesController.handleFormTrashActions)
router.put("/:id", coursesController.update);
router.patch("/:id/restore", coursesController.restore);
router.delete("/:id", coursesController.delete);
router.delete("/:id/force", coursesController.forcedelete);
router.get("/:slug", coursesController.show);

module.exports = router;