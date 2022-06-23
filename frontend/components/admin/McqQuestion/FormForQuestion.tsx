import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { mcqQuestions } from "../../../validator/mcqQuestion";
import Textinput from "../../common/design/Textinput";
import SelectField from "../../common/design/SelectField";
const FormForQuestion = ({ intialValue, handleSubmit }) => {
  const LEVELS = [
    { name: "easy", _id: "easy" },
    { name: "medium", _id: "medium" },
    { name: "difficult", _id: "difficult" },
  ];

  return (
    <Formik
      initialValues={intialValue}
      validationSchema={mcqQuestions}
      onSubmit={(data) => handleSubmit(data)}
    >
      {({ values, errors, touched }: any) => {
        console.log(values, errors, "mk");
        return (
          <Form noValidate autoComplete="off">
            <div
              className="margin-top-10"
            >
              <button type="submit">submit </button>
              <div
              // item lg={9} xs={11} sm={11}
              >
                {/* Questions section */}
                <FieldArray
                  name="questions"
                  render={(arrayHelpers) => (
                    <>
                      {values?.questions && values?.questions?.length > 0 ? (
                        values?.questions?.map(
                          (question: any, index: number) => (
                            <React.Fragment key={index}>
                              <div className="question-container">
                                <div className="algin-flex12">
                                  <h3>QUESTION</h3>
                                  {values.questions.length > 1 && (
                                    <button
                                      className="buttonContainer"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <button className="deleteIcons" />
                                    </button>
                                  )}
                                </div>
                                <div>
                                  <Textinput
                                    // fullWidth
                                    name={`questions[${index}].question`}
                                    // className="qusInput"
                                    // defaultValue={question.question}
                                    placeholder={"Question Text"}
                                  />
                                </div>
                                <FieldArray
                                  name={`questions[${index}].mcqs`}
                                  render={(arrayHelpers) => (
                                    <div>
                                      {values.questions[index]?.mcqs &&
                                      values.questions[index]?.mcqs?.length >
                                        0 ? (
                                        values.questions[index]?.mcqs.map(
                                          (mcqData: any, i: number) => (
                                            <div
                                              className="form-container5"
                                              key={i}
                                            >
                                              <div>
                                                <div className="form-container5">
                                                  <Field
                                                    type="radio"
                                                    variant="outlined"
                                                    name={`questions[${index}].answer`}
                                                    value={mcqData}
                                                    className="radio-input1"
                                                    disabled={!mcqData}
                                                  />
                                                  &nbsp;
                                                  <Textinput
                                                    // fullWidth
                                                    // className="qusInput"
                                                    name={`questions[${index}].mcqs[${i}]`}
                                                    // defaultValue={mcqData}
                                                    placeholder={`Answer Choice ${
                                                      i + 1
                                                    }`}
                                                  />
                                                </div>
                                              </div>
                                              {values.questions[index]?.mcqs
                                                ?.length > 2 && (
                                                <div>
                                                  <button
                                                    onClick={() =>
                                                      arrayHelpers.remove(i)
                                                    }
                                                  >
                                                    <button />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <button
                                          onClick={() => arrayHelpers.push("")}
                                          // buttonText="Add mcq"
                                        />
                                      )}
                                      <div>
                                        <div className="form-container5 job_list_link">
                                          {values.questions[index]?.mcqs
                                            ?.length ? (
                                            <>
                                              <button
                                                onClick={() =>
                                                  arrayHelpers.push("")
                                                }
                                                // buttonText="Add new choice"
                                                className="addQusBtn"
                                              />
                                            </>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                />
                                <span className="errorMsg">
                                  {/* <ErrorMessage
                                    name={`questions[${index}].answer`}
                                  /> */}
                                </span>
                                <br />
                                <span className="tip-text">
                                  Tip: Click the radio button to mark the
                                  correct answer
                                </span>
                                <hr />
                                <div className="level-section">
                                  <SelectField
                                    // errors={
                                    //   errors.questions &&
                                    //   errors?.questions[index]?.level
                                    // }
                                    // touched={
                                    //   touched.questions &&
                                    //   touched?.questions[index]?.level
                                    // }
                                    options={LEVELS}
                                    name={`questions[${index}].level`}
                                    defaultValue={question.level}
                                    // className="level-options"
                                  />
                                  &nbsp;&nbsp;
                                  <span className="tip-text">
                                    Add answer key for future reference
                                  </span>
                                </div>
                              </div>
                              <div>
                                <button
                                  onClick={() =>
                                    arrayHelpers.push(
                                      intialValue.mcqQuestions.questions[0]
                                    )
                                  }
                                  // buttonText="ADD Question"
                                  className="addQusBtn"
                                />
                              </div>
                            </React.Fragment>
                          )
                        )
                      ) : (
                        <button
                          onClick={() => arrayHelpers.push("")}
                          // buttonText="Add a Question"
                        />
                      )}
                    </>
                  )}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormForQuestion;
