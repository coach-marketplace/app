import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInputField } from "evergreen-ui";
import debounce from "lodash.debounce";

import API from "../../../../services/api";

class AutoComplete extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    formData: {
      address: ""
    },
    propositions: []
  };

  setPropositions = newPropositions => {
    this.setState({ propositions: [...newPropositions] });
  };

  searchAddresses = debounce(async query => {
    try {
      const response = await API.post("geo-spatial/by-address", {
        address: query
      });
      console.log("res", response);
      this.setPropositions(response.data.map(item => item.display_name));
    } catch (e) {
      console.log("err", e.message);
    }
  }, 200);

  onAddressChange = e => {
    const {
      target: { value }
    } = e;

    if (value.length > 3) {
      this.searchAddresses(value);
    }

    this.setState({ formData: { address: value } });
  };

  render() {
    return (
      <div>
        <TextInputField
          label="Location"
          description="Enter your location address, it will help people to find you."
          placeholder="Central station, Brussels"
          value={this.state.formData.address}
          onChange={this.onAddressChange}
        />
        <ul>
          {this.state.propositions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AutoComplete;
