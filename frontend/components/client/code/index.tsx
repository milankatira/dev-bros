/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { language } from "../../../config/app_config";
import axios from "axios";
import { CompileCode } from "../../../api/client/compnay";
import { compileCode } from "../../../constant/api_url";
const Index = () => {
  const [code, setCode] = useState("");
  const [Lang, setLang] = useState();
  const [Op, setOp] = useState();

  const handleChange = (event: any) => {
    setLang(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      code,
      languag: Lang,
    };

    axios
      .post(compileCode, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      })
      .then((res) => {
        setOp(res.data.output);
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <select
            value={Lang}
            onChange={handleChange}
            className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option selected>Open this select menu</option>
            {language.map((lang) => (
              <option value={lang.value}>{lang.language}</option>
            ))}
          </select>
        </div>
      </div>

      <CodeMirror
        value={code}
        width="90%"
        height="400px"
        theme="dark"
        options={{
          mode: "javascript",
        }}
        autoFocus={true}
        extensions={[javascript({ jsx: true })]}
        onChange={(value, viewUpdate) => {
          //eslint-disable-line @typescript-eslint/no-unused-vars
          setCode(value);
        }}
      />

      <button onClick={handleSubmit}>submit</button>

      {Op && (
        <CodeMirror
          value={Op}
          width="90%"
          height="400px"
          theme="dark"
          options={{
            mode: "javascript",
          }}
          autoFocus={true}
          extensions={[javascript({ jsx: true })]}
        />
      )}
    </div>
  );
};

export default Index;
