import React, { Component } from "react";
import { TextInputField, Label, Textarea } from "evergreen-ui";

import Button from "../../ui/button/Button";

class ServiceForm extends Component {
  static displayName = "ServiceForm";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: ""
      }
    };
  }

  onServiceSubmitted = event => {
    event.preventDefault();
    console.log(this.state.formData);
  };

  onFieldChange = event => {
    // console.log(event.target.value);
    this.setState({ formData: { title: event.target.value } });
  };

  render() {
    return (
      <form onSubmit={this.onServiceSubmitted}>
        <TextInputField
          label="Title of the service that you propose"
          description="Try to be short, use keyword and be clear about what you are coaching."
          placeholder="Crossfit personnal trainer"
          value={this.state.formData.title}
          onChange={this.onFieldChange}
        />
        <Label htmlFor="description" marginBottom={4} display="block">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="Textarea placeholder..."
          marginBottom={4}
        />
        <Button type="submit" label="Create" />
      </form>
    );
  }
}

export default ServiceForm;
