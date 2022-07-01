export const intialValue = {
  signup: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "candidate",
  },
  signin: {
    email: "",
    password: "",
  },

  profile: {
    firstName: "",
    lastName: "",
    location: "",
    employmentType: "",
    expectedSalary: "",
    SalaryPreference: "",
    preferedLocation: "",
    education_details: [
      {
        degree: "",
        institute: "",
        educationDescription: "",
        marks: "",
        startedYear: "",
        passingYear: "",
      },
    ],
    experience_details: [
      {
        company: "",
        designation: "",
        experienceDescription: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        fresher: false,
      },
    ],
    skills: [
      {
        skill: "",
        yearExp: "",
        lastUsed: "",
      },
    ],
    exam: [
      {
        exam_name: "",
        date: "",
        start_time: "",
        end_time: "",
        exam_type: "",
        total_mark: "",
        passing_mark: "",
      },
    ],
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
  exam_link: {
    exam_link: "",
  },
};
