import React, { useRef, useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_SNIPPETS } from "../Language";
import Output from "./Output";

const ayuDarkTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "", foreground: "BFC7D5", background: "0F1419" },
        { token: "comment", foreground: "6272A4", fontStyle: "italic" },
        { token: "keyword", foreground: "FF8F40" },
        { token: "number", foreground: "FFB454" },
        { token: "string", foreground: "9CCF60" },
        { token: "variable", foreground: "F07178" },
        { token: "type", foreground: "78DCE8" },
        { token: "function", foreground: "FFB454" },
        { token: "operator", foreground: "F8F8F2" },
        { token: "constant", foreground: "FFB454" },
        { token: "class", foreground: "78DCE8" },
        { token: "interface", foreground: "78DCE8" },
    ],
    colors: {
        "editor.background": "#0F1419",
        "editor.foreground": "#BFC7D5",
        "editorLineNumber.foreground": "#6272A4",
        "editorCursor.foreground": "#FF8F40",
        "editor.selectionBackground": "#2A313C",
        "editorIndentGuide.background": "#1C2128",
        "editorIndentGuide.activeBackground": "#3B4261",
    },
};

const CodeEditor = () => {
    const editorRef = useRef();
    const monaco = useMonaco();
    const [value, setvalue] = useState("");
    const [language, setLanguage] = useState("javascript");

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("ayu-dark", ayuDarkTheme);
            monaco.editor.setTheme("ayu-dark");
        }
    }, [monaco]);

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
        setvalue(LANGUAGE_SNIPPETS[language]);
    };

    return (
        <div className="flex border-1">
            <div className="flex-1 w-1/2">
                <LanguageSelector language={language} onSelect={onSelect} />
                <Editor
                    height="75vh"
                    theme="ayu-dark"
                    language={language}
                    value={value}
                    defaultValue={LANGUAGE_SNIPPETS[language]}
                    onMount={onMount}
                    onChange={(value) => setvalue(value)}
                    options={{ fontSize: 20 }}
                />
            </div>
            <div className="flex-1 h-[75vh]">
                <Output editorRef={editorRef} language={language} />
            </div>
        </div>
    );
};

export default CodeEditor;
