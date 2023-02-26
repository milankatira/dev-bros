export const intialValue = {
  signup: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "company",
  },
  signin: {
    email: "",
    password: "",
  },

  assignExam: {
    name: "",
    date: "",
    start_time: "",
    end_time: "",
  },

  profile: {
    firstName: "",
    lastName: "",
  },

  company_profile: {
    name: "",
    company_url: "",
    number_of_eployees: "",
    foundation_year: "",
    headquter: "",
    address: [
      {
        street: "",
        city: "",
      },
    ],
  },

  Exam: {
    exam_name: "",
    start_time: "",
    end_time: "",
    description: "",
    exam_type: "",
    date: "",
    passing_mark: "",
    total_mark: " ",
    totalQuestion: " ",
  },

  mcqQuestions: {
    questions: [
      {
        question: "",
        mcqs: ["", "", "", ""],
        answer: "",
        level: "easy",
      },
    ],
  },

  codingQuestion: {
    level: "",
  },
  exam_link: {
    exam_link: "",
  },
  candidateGroup: {
    title: "",
    description: "",
  },
};
