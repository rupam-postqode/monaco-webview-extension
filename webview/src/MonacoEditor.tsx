import * as monaco from "monaco-editor";
import React, { useEffect, useRef } from "react";

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    return `./${label}.worker.bundle.js`;
  },
};

const MonacoEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {

      monaco.editor.create(editorRef.current, {
        value: "// Start coding...",
        language: "typescript",
        theme: "vs-dark",
        automaticLayout: true,
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />;
};

export default MonacoEditor;
