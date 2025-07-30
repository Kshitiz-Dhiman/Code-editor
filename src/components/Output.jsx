import React, { useRef, useState } from "react";
import { runCode } from "../api";
const Output = ({ editorRef, language }) => {
    const [answer, setAnswer] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const stdinRef = useRef();
    const executeCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
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
        setIsLoading(false);
    };

    return (
        <div className="bg-[#101419]">
            <button
                className={`${isLoading ? "loading loading-neutral my-10" : "btn"} my-5`}
                onClick={executeCode}
            >
                Run
            </button>
            <div className="flex flex-col h-full">
                <div className="bg-[#101419]">
                    <input
                        type="text"
                        placeholder="Enter the input here..."
                        className="input h-full w-full bg-[#101419] p-5 rounded-t"
                        ref={stdinRef}
                    />
                </div>

                <div className="bg-[#101419] p-5 rounded h-full">
                    <h1 className="my-5">Output: </h1>
                    {error ? (
                        <pre className="text-red-500">{error}</pre>
                    ) : (
                        <pre className="text-white">{answer}</pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Output;
