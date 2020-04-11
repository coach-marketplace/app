import React, { Component } from "react";
import PropTypes from "prop-types";
import { Label } from "evergreen-ui";

import Input from "../../ui/form/input/Input";
import Button from "../../ui/button/Button";
import Pane from "../../ui/pane/Pane";

class ExerciseForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      instructions: PropTypes.string,
      lang: PropTypes.string,
      isPrivate: PropTypes.bool,
      videoUrl: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        instructions: "",
        lang: "en",
        isPrivate: false,
        videoUrl: "",
        ...props.initialValues,
      },
    };
  }

  onExerciseSubmitted = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(this.state.formData);
  };

  onFieldChange = (value, field) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: value } });
  };

  isFormValid = () => {
    // TODO: form validation

    return true;
  };

  render() {
    const { onCancel, isLoading } = this.props;
    const { formData } = this.state;

    return (
      <form onSubmit={this.onExerciseSubmitted}>
        <Label htmlFor="name" marginTop={30} display="block">
          Exercise Name
        </Label>

        <Input
          id="name"
          marginTop={10}
          placeholder="Squat"
          value={formData.name}
          onChange={(e) => this.onFieldChange(e.target.value, "name")}
        />

        <Label htmlFor="instructions" marginTop={30} display="block">
          Instruction
        </Label>

        <Input
          type="textarea"
          id="instructions"
          marginTop={10}
          placeholder="Textarea placeholder..."
          value={formData.instructions}
          onChange={(e) => this.onFieldChange(e.target.value, "instructions")}
        />

        <Label htmlFor="video-url" marginTop={30} display="block">
          Video URL
        </Label>

        <Input
          id="video-url"
          placeholder="http://..."
          marginTop={10}
          value={formData.videoUrl}
          onChange={(e) => this.onFieldChange(e.target.value, "videoUrl")}
        />

        <Pane marginTop={30}>
          <Button type="submit" label="Create" disabled={!this.isFormValid()} />
          {onCancel && (
            <Button
              type="text"
              label="Cancel"
              onClick={onCancel}
              appearance="minimal"
            />
          )}
        </Pane>
      </form>
    );
  }
}

export default ExerciseForm;
