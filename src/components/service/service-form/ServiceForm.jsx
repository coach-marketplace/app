import React, { Component } from "react";
import { TextInputField, Label, Textarea } from "evergreen-ui";

import API from "../../../services/api";
import Button from "../../ui/button/Button";
import AutoComplete from "../../ui/form/auto-complete/AutoComplete";

class ServiceForm extends Component {
  static displayName = "ServiceForm";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        address: "",
        coordinates: []
      },
      proposition: [],
      isAutoCompleteLoading: false
    };
  }

  onServiceSubmitted = event => {
    event.preventDefault();
    console.log(this.state.formData);
  };

  onFieldChange = (value, field) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [field]: value } });
  };

  searchAddresses = async () => {
    try {
      const {
        formData: { address }
      } = this.state;
      this.setState({ isAutoCompleteLoading: true });
      const response = await API.post("geo-spatial/by-address", { address });
      this.setState({
        propositions: [
          ...response.data.map(item => ({
            label: item.display_name,
            value: [item.lat, item.lon]
          }))
        ],
        isAutoCompleteLoading: false
      });
    } catch (e) {
      console.log("err", e.message);
    }
  };

  onAddressSelected = addressIndex => {
    const { propositions } = this.state;
    this.onFieldChange(propositions[addressIndex].label, "address");
  };

  render() {
    const { propositions, formData, isAutoCompleteLoading } = this.state;

    return (
      <form onSubmit={this.onServiceSubmitted}>
        <TextInputField
          label="Title of the service that you propose"
          description="Try to be short, use keyword and be clear about what you are coaching."
          placeholder="CrossFit personal trainer"
          value={formData.title}
          onChange={e => this.onFieldChange(e.target.value, "title")}
        />

        <Label htmlFor="description" marginBottom={4} display="block">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Textarea placeholder..."
          marginBottom={4}
          value={formData.description}
          onChange={e => this.onFieldChange(e.target.value, "description")}
        />

        <AutoComplete
          propositions={propositions}
          onChange={value => this.onFieldChange(value, "address")}
          onSearch={this.searchAddresses}
          onSelect={this.onAddressSelected}
          value={formData.address}
          isLoading={isAutoCompleteLoading}
        />

        <Button type="submit" label="Create" />
      </form>
    );
  }
}

export default ServiceForm;
