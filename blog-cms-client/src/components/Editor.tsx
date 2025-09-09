"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
  content: string;
  onUpdate: (html: string) => void;
}

export function Editor({ content, onUpdate }: EditorProps) {
  const [value, setValue] = useState(content);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleChange = (val: string) => {
    setValue(val);
    onUpdate(val);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      }}
    />
  );
}
