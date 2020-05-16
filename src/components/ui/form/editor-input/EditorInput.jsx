/**
 * This component use React Draft Wysiwyg
 *
 * - https://jpuri.github.io/react-draft-wysiwyg/#/
 * - https://openbase.io/js/react-draft-wysiwyg
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";

import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorContainer } from "./styled";

class EditorInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const initialStateContent = props.value
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(props.value))
        )
      : EditorState.createEmpty();

    this.state = {
      editorState: initialStateContent,
    };
  }

  onEditorChange = () => {
    const { onChange } = this.props;
    const { editorState } = this.state;

    const result = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    onChange(result);
  };

  render() {
    const { editorState } = this.state;

    return (
      <EditorContainer>
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
          onChange={this.onEditorChange}
          onEditorStateChange={(data) => this.setState({ editorState: data })}
          editorState={editorState}
        />
      </EditorContainer>
    );
  }
}

export default EditorInput;
