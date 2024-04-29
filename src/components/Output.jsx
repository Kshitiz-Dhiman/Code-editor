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
      const { stdout , exception } = await runCode(language, sourceCode , stdinRef.current.value);
      setAnswer(stdout);
      setError(exception); 
    } catch (error) {
      setError(error.message); 
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Output</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={executeCode}

      >
        Run
      </button>
      <div className="my-4">
        <input
          type="text"
          placeholder="stdin"
          className="rounded py-2 px-4 bg-[#1e1e1e] text-white w-full"
          ref={stdinRef}
        />
      </div>
      <div className="bg-gray-900 p-5 rounded h-full">
        {error ? (
          <pre className="text-red-500">{error}</pre>
        ) : (
          <pre className="text-white">{answer}</pre>
        )}
      </div>
    </>
  );
};

export default Output;
