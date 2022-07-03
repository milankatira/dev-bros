import React, { useState } from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const Index = () => {
  const [code, setCode] = useState("");
  const [js, setJs] = useState("");
  return (
    <div>
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
    </div>
  );
}

export default Index