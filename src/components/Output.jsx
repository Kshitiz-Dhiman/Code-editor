import React, { useRef, useState } from "react";
import { runCode } from "../api";
const Output = ({ editorRef, language }) => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const stdinRef = useRef();
  const executeCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      const response = await runCode(
        language,
        sourceCode,
        stdinRef.current.value
      );
      setAnswer(response.stdout);
      setError(response.stderr);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button
        className="btn my-5"
        onClick={executeCode}
      >
        Run
      </button>
      <div className="flex flex-col h-full">
        <div className="">
          <input
            type="text"
            placeholder="Enter the input here..."
            className="input h-full w-full bg-[#1e1e1e] p-5 rounded-t"
            ref={stdinRef}
          />
        </div>

        <div className="bg-[#1e1e1e] p-5 rounded h-full">
          <h1 className="my-5">Output: </h1>
          {error ? (
            <pre className="text-red-500">{error}</pre>
          ) : (
            <pre className="text-white">{answer}</pre>
          )}
        </div>
      </div>
    </>
  );
};

export default Output;
