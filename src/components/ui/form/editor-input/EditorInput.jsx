import React, { useState } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Input from "../input/Input";

const EditorInput = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorChange = (e) => {
    // console.log("e", e);
    const result = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    // const obj = { target: { value: result } };
    onChange(result);
  };

  return (
    <>
      <Editor
        toolbar={{
          options: ["blockType", "list", "link"],
          blockType: {
            inDropdown: false,
            options: ["Normal", "H1"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          link: {
            defaultTargetOption: "_blank",
            options: ["link", "unlink"],
          },
        }}
        onChange={onEditorChange}
        onEditorStateChange={(data) => setEditorState(data)}
      />
      {/* <Input
        type="textarea"
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </>
  );
};

EditorInput.propTypes = {};

EditorInput.defaultProps = {};

export default EditorInput;
