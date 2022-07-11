import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { mcqQuestions } from "../../../validator/mcqQuestion";
import Textinput from "../../common/design/Textinput";
import SelectField from "../../common/design/SelectField";
const FormForQuestion = ({ intialValue, handleSubmit, isEdit }) => {
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
        return (
          <Form noValidate autoComplete="off">
            <div className="mt-10 mx-4 md:mx-40">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 text-white rounded-md bg-red-500"
                >
                  submit{" "}
                </button>
              </div>
              <div>
                <FieldArray
                  name="questions"
                  render={(arrayHelpers) => (
                    <>
                      {values?.questions && values?.questions?.length > 0 ? (
                        <>
                          {values?.questions?.map(
                            (question: any, index: number) => (
                              <React.Fragment key={index}>
                                <div className="p-4 rounded-xl mt-4 border-[0.5px] border-gray-100 bg-blue-50">
                                  <div className="flex justify-between mt-4">
                                    <h3 className="font-semibold">QUESTION</h3>
                                    {values.questions.length > 1 && (
                                      <svg
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        className="h-4 w-4 mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                      >
                                        <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <Textinput
                                      name={`questions[${index}].question`}
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
                                                  <div className="flex flex-row items-center">
                                                    <Field
                                                      type="radio"
                                                      variant="outlined"
                                                      name={`questions[${index}].answer`}
                                                      value={mcqData}
                                                      className="radio-input1"
                                                      disabled={!mcqData}
                                                    />
                                                    {/* &nbsp; */}
                                                    <div className="ml-2 w-full">
                                                      <Textinput
                                                        // fullWidth
                                                        // className="w-full"
                                                        name={`questions[${index}].mcqs[${i}]`}
                                                        // defaultValue={mcqData}
                                                        placeholder={`Answer Choice ${
                                                          i + 1
                                                        }`}
                                                      />
                                                    </div>

                                                    {values.questions[index]
                                                      ?.mcqs?.length > 2 && (
                                                      <div>
                                                        <svg
                                                          onClick={() =>
                                                            arrayHelpers.remove(
                                                              i
                                                            )
                                                          }
                                                          className="ml-4 h-4 w-4"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 320 512"
                                                        >
                                                          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                                                        </svg>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )
                                        ) : (
                                          <button
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                            // buttonText="Add mcq"
                                          >
                                            add
                                          </button>
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
                                                  className="flex justify-between items-center p-2 bg-gray-100 rounded-lg text-black"
                                                >
                                                  <svg
                                                    className="w-4 h-4 mr-2 text-black"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                  >
                                                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
                                                  </svg>
                                                  Add new choice
                                                </button>
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
                                      error={
                                        touched.questions &&
                                        touched?.questions[index]?.level &&
                                        errors.questions &&
                                        errors?.questions[index]?.level
                                      }
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
                              </React.Fragment>
                            )
                          )}
                          <div>
                            {!isEdit && (
                              <button
                                onClick={() =>
                                  arrayHelpers.push(intialValue.questions[0])
                                }
                                className="p-2 bg-red-400 rounded-lg mt-4 text-white"
                              >
                                ADD Question
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div>
                          <button
                            onClick={() =>
                              arrayHelpers.push(intialValue.questions[0])
                            }
                            className="addQusBtn"
                          >
                            ADD Question
                          </button>
                        </div>
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
