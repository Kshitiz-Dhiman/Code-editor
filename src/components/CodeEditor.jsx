import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_SNIPPETS } from "../Language";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setvalue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    setLanguage(language);
    setvalue(LANGUAGE_SNIPPETS[language]);
  };
  

  return (
    <div className="flex">
      <div className="flex-1 w-1/2">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="75vh"
          theme="vs-dark"
          language={language}
          value={value}
          defaultValue={LANGUAGE_SNIPPETS[language]}
          onMount={onMount}
          onChange={(value) => {
            setvalue(value);
          }}
          options={{
            fontSize: 20,
          }}
        />
        ;
      </div>
      <div className="w-1/2 h-1/2">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;
