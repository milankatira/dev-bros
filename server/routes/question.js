const express = require("express");

const { isAuthenticUser } = require("../middleware/auth");

const {
  addQuestion,
  getQuestion,
  RemoveQuestion,
  getQuestionByid,
  updateQuestion,
  getAllQuestion,
  AddQuestionById,
} = require("../controller/questions");

const router = express.Router();

router.route("/questions").post(isAuthenticUser, addQuestion);

router.route("/removequestions").post(isAuthenticUser, RemoveQuestion);

router.route("/questions/:exam_id").get(isAuthenticUser, getQuestion);

router.route("/allquestions/:exam_id").get(isAuthenticUser, getAllQuestion);

router.route("/addquestions/:exam_id").post(isAuthenticUser, AddQuestionById);

router
  .route("/singlequestion/:id")
  .get(isAuthenticUser, getQuestionByid)
  .post(isAuthenticUser, updateQuestion);

module.exports = router;
