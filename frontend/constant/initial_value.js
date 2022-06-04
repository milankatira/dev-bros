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
};
