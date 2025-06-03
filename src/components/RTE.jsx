import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../config/config";

function RTE({ name = "content", control, label }) {
  return (
    <div>
      {label && <p>{label}</p>}
      <Controller
        name={name}
        control={control}
        defaultValue="" // <-- only used on initial mount
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={config.tinyApikey}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              width: 600,
              resize: false,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
