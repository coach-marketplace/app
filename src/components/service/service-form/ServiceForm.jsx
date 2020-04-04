import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInputField, Label } from "evergreen-ui";

import Input from "../../ui/form/input/Input";
import AutoComplete from "../../ui/form/auto-complete/AutoComplete";
import Button from "../../ui/button/Button";
import API from "../../../services/api";

class ServiceForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    isLoading: PropTypes.bool,
    initialValues: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      address: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.string),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        title: "",
        description: "",
        address: "",
        coordinates: [],
        /**
         * We use initialValues prop to make the parent able to init the state
         * before use this component. Useful for the edition of service.
         */
        ...props.initialValues,
      },
      proposition: [],
      isAutoCompleteLoading: false,
    };
  }

  onServiceSubmitted = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(this.state.formData);
  };

  onFieldChange = (value, field) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: value } });
  };

  searchAddresses = async () => {
    try {
      const {
        formData: { address },
      } = this.state;
      this.setState({ isAutoCompleteLoading: true }, async () => {
        const response = await API.post("geo-spatial/by-address", { address });
        this.setState({
          propositions: [
            ...response.data.map((item) => ({
              label: item.display_name,
              value: [item.lat, item.lon],
            })),
          ],
          isAutoCompleteLoading: false,
        });
      });
    } catch (e) {
      console.log("err", e.message);
    }
  };

  onAddressSelected = (addressIndex) => {
    const { propositions } = this.state;
    this.onFieldChange(propositions[addressIndex].label, "address");
  };

  isFormValid = () => {
    // TODO: form validation

    return true;
  };

  render() {
    const { onCancel, isLoading } = this.props;
    const { propositions, formData, isAutoCompleteLoading } = this.state;

    return (
      <form onSubmit={this.onServiceSubmitted}>
        {isLoading && <p>Loading...</p>}
        <TextInputField
          label="Title of the service that you propose"
          description="Try to be short, use keyword and be clear about what you are coaching."
          placeholder="CrossFit personal trainer"
          value={formData.title}
          onChange={(e) => this.onFieldChange(e.target.value, "title")}
        />

        <Label htmlFor="description" marginBottom={4} display="block">
          Description
        </Label>

        <Input
          type="textarea"
          id="description"
          placeholder="Textarea placeholder..."
          marginBottom={4}
          value={formData.description}
          onChange={(e) => this.onFieldChange(e.target.value, "description")}
        />

        <Label htmlFor="address" marginBottom={4} display="block">
          Location
        </Label>

        <AutoComplete
          propositions={propositions}
          onChange={(value) => this.onFieldChange(value, "address")}
          onSearch={this.searchAddresses}
          onSelect={this.onAddressSelected}
          value={formData.address}
          isLoading={isAutoCompleteLoading}
          id="address"
          placeholder="Central Station, Brussels"
        />

        <Button type="submit" label="Create" disabled={!this.isFormValid()} />
        {onCancel && <Button type="text" label="Cancel" onClick={onCancel} />}
      </form>
    );
  }
}

export default ServiceForm;
