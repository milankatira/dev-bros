import { server_url } from "../config/app_config";

//TODO AUTH URL
export const login_url = `${server_url}/api/login`;

export const signup_url = `${server_url}/api/register`;

export const logout_url = `${server_url}/api/logout`;

export const forgot_password_url = `${server_url}/api/forgot`;

export const reset_password_url = (token) =>
  `${server_url}/api/reset/:${token}`;

export const verify_email_url = (token) =>
  `${server_url}/api/verify/email/:${token}`;

//TODO USER URL

export const user_profile_url = `${server_url}/api/me`;

export const update_profile_url = `${server_url}/api/user/me/update`;

export const add_profile_url = `${server_url}/api/add-profile`;

//TODO GENERIC URL
export const get_city = `${server_url}/api/city`;

export const get_country = `${server_url}/api/country`;

export const get_degree = `${server_url}/api/degree`;

export const get_designation = `${server_url}/api/designation`;

export const get_institution = `${server_url}/api/institution`;

export const get_plan = `${server_url}/api/plan`;

export const get_state = `${server_url}/api/state`;

export const get_skill = `${server_url}/api/skill`;

export const get_subcription_plan = `${server_url}/api/subcription_plan`;

export const get_employement_type = `${server_url}/api/employement_type`;

//TODO COMPANY URL

export const company = `${server_url}/api/company`;

export const exam = `${server_url}/api/exam`;

export const exam_id = (id) => `${server_url}/api/exam/${id}`;

//TODO QUESTION

export const questions = `${server_url}/api/questions`;

export const get_question = (id) => `${server_url}/api/questions/${id}`;

export const get_all_question = (id) => `${server_url}/api/allquestions/${id}`;

export const add_single_question = (id) =>
  `${server_url}/api/addquestions/${id}`;

export const removequestions = `${server_url}/api/removequestions`;

export const get_single_question = (id) =>
  `${server_url}/api/singlequestion/${id}`;

// TODO CODING QUESTION

export const coding_question = (id) => `${server_url}/api/codingquestion/${id}`;

export const singlecodingquestion = (id) =>
  `${server_url}/api/singlecodingquestion/${id}`;

//TODO CANDIDATES

export const candidates = `${server_url}/api/candidates`;

//TODO ASSIGN EXAM

export const assignExam = `${server_url}/api/assignexam`;

//TODO COMPILE CODE

export const compileCode = `${server_url}/api/compilecode`;

//TODO ASSIGN CANDIDATE

export const assignCandidate = `${server_url}/api/assigncandidate`;

//TODO NOTIFY MEMBER

export const notifyStatus = (id) => `${server_url}/api/notify/${id}`;

//TODO SUBMIT EXAM

export const SubmitExam = `${server_url}/api/submit_exam`;

export const generateExamReport = `${server_url}/api/generate_exam_report`;

export const updateExamReport = `${server_url}/api/update_exam_report`;

export const getExamStatus = (assign_exam_id: string) =>
  `${server_url}/api/getStatus/${assign_exam_id}`;

export const myResult = `${server_url}/api/result`;

//TODO GROUP

export const group = `${server_url}/api/group`;

//TODO Exam Question
export const ExamQuestion = (id) => `${server_url}/api/examquestion/${id}`;
