import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

function RTE({ name = "content", control, label }) {
  // Validate API key
  if (!config.tinyApiKey) {
    console.error("TinyMCE API key is missing!");
    return <div>Rich text editor failed to load (missing API key).</div>;
  }

  return (
    <div>
      {label && <p>{label}</p>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={config.tinyApiKey}  // Use consistent naming
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              width: "100%",  // Better responsiveness
              menubar: false,  // Disable if not needed
              plugins: "lists link image table help",  // Explicit plugins
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;