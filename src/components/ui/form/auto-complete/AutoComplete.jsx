import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInputField, Text } from "evergreen-ui";
import debounce from "lodash.debounce";

import { StyledContainer, StyledDropdownItem } from "./style";
import Dropdown from "./Dropdown";
import Spinner from "../../loader/Spinner";
import NoResultText from "../../empty-states/NoResultText";

class AutoComplete extends Component {
  static propTypes = {
    onType: PropTypes.func,
    onSelect: PropTypes.func,
    propositions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    isLoading: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    propositions: [],
    isLoading: false,
  };

  onSearchFunction = debounce(() => this.props.onSearch(), 200);

  onChange = (e) => {
    const {
      target: { value },
    } = e;
    const { onChange } = this.props;

    onChange(value);
    value.length > 3 && this.onSearchFunction();
  };

  renderDropdownContent = () => {
    const { isLoading, propositions, onSelect } = this.props;

    if (isLoading) return <Spinner />;

    if (!propositions.length) return <NoResultText />;

    return (
      <ul>
        {propositions.map((item, index) => (
          <StyledDropdownItem key={index} onClick={() => onSelect(index)}>
            <Text>{item.label}</Text>
          </StyledDropdownItem>
        ))}
      </ul>
    );
  };

  render() {
    const { value, propositions } = this.props;
    const isDropdownVisible =
      value.length >= 3 && !propositions.some((item) => item.label === value);

    return (
      <StyledContainer>
        <TextInputField
          label="Location"
          description="Enter your location address, it will help people to find you."
          placeholder="Central station, Brussels"
          value={value}
          onChange={this.onChange}
        />

        <Dropdown isVisible={isDropdownVisible}>
          {this.renderDropdownContent()}
        </Dropdown>
      </StyledContainer>
    );
  }
}

export default AutoComplete;
