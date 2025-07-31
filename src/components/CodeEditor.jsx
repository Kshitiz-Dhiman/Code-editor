import React, { useRef, useState, useEffect, useMemo } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { LANGUAGE_SNIPPETS } from "../Language";
import Output from "./Output";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";

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

const roomname = `code-editor-${new Date().toLocaleDateString('en-CA')}`;

const CodeEditor = () => {
    const ydoc = useMemo(() => new Y.Doc(), []);
    const monaco = useMonaco();
    const [language, setLanguage] = useState("javascript");
    const [editor, setEditor] = useState(null);
    const [provider, setProvider] = useState(null);
    const [binding, setBinding] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState(0);

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme("ayu-dark", ayuDarkTheme);
            monaco.editor.setTheme("ayu-dark");
        }
    }, [monaco]);

    useEffect(() => {
        const provider = new WebsocketProvider('wss://demos.yjs.dev/ws', roomname, ydoc);
        setProvider(provider);

        provider.on('status', (event) => {
            setIsConnected(event.status === 'connected');
        });

        provider.awareness.on('update', () => {
            setConnectedUsers(provider.awareness.getStates().size);
        });

        return () => {
            provider?.destroy();
            ydoc.destroy();
        };
    }, [ydoc]);

    useEffect(() => {
        if (provider == null || editor == null) {
            return;
        }

        const yText = ydoc.getText('Hello');

        const binding = new MonacoBinding(
            yText,
            editor.getModel(),
            new Set([editor]),
            provider.awareness
        );
        setBinding(binding);

        return () => {
            binding.destroy();
        };
    }, [ydoc, provider, editor, language]);

    const onMount = (editor, monaco) => {
        setEditor(editor);
        editor.focus();
    };



    return (
        <>
            <div className="mb-10"> {isConnected ? (
                <div className="flex justify-between  items-center px-4 py-2 bg-[#1C2128] text-white">
                    <div className={`flex items-center gap-1 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        {isConnected ? 'Connected' : 'Disconnected'} {connectedUsers > 0 && `(${connectedUsers} user${connectedUsers > 1 ? 's' : ''})`}
                        {roomname && <span className="ml-2 text-gray-500">Room: {roomname}</span>}
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-center px-4 py-2 bg-[#1C2128] text-white">
                    <div className="text-gray-500">Connecting...</div>
                </div>
            )}</div>
            <Editor
                height="100%"
                width="100%"
                theme="ayu-dark"
                language={language}
                onMount={onMount}
                options={{
                    fontSize: 20,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on'
                }}
            />
        </>
    );
};

export default CodeEditor;
