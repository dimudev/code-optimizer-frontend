'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language = 'typescript',
  readOnly = false,
}: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      theme="vs-dark"
      value={value}
      onChange={(val) => onChange?.(val ?? '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        readOnly: readOnly,
        automaticLayout: true,
      }}
    />
  );
}