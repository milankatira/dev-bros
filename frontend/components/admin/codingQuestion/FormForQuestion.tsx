import React, { useState } from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import { codingQuestions } from "../../../validator/codingQuestion";
import SelectField from "../../common/design/SelectField";
import { Editor } from "@tinymce/tinymce-react";

const FormForQuestion = ({
  intialValue,
  handleSubmit,
  questionData,
  setquestionData,
  isEdit,
}) => {

  const LEVELS = [
    { name: "easy", _id: "easy" },
    { name: "medium", _id: "medium" },
    { name: "difficult", _id: "difficult" },
  ];

  const onSubmit = (data: any) => {
    console.log(data, "SSS");
    const packet = {
      data,
    };
    handleSubmit(packet);
  };

  return (
    <Formik
      initialValues={intialValue}
      validationSchema={codingQuestions}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched }: any) => {
        console.log(errors, "err", values);
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
                <Editor
                  onEditorChange={(e) => setquestionData(e)}
                  value={questionData}
                  apiKey="02bmdr65eds9vmo76ewfyfqeibdtgp3ysm9e4s8z4btzizv4"
                  init={{
                    width: "100%",
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                  }}
                />

                <SelectField
                  error={
                    touched.questions &&
                      touched?.questions?.level &&
                      errors.questions &&
                      errors?.questions?.level
                  }
                  options={LEVELS}
                  name={`level`}
                  defaultValue={intialValue.level}
                  // className="level-options"
                />
              </div>
              <h1>{values.level}</h1>
            </div>
          </Form>
        );
      }}
    </Formik>
  )
};

export default FormForQuestion;
