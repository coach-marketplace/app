import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInputField } from "evergreen-ui";
import debounce from "lodash.debounce";
import styled from "styled-components";

import Spinner from "../../loader/Spinner";

const StyledDropDown = styled.div`
  border: 1px solid black;
`;

class AutoComplete extends Component {
  static propTypes = {
    onType: PropTypes.func,
    onSelect: PropTypes.func,
    propositions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.string)
      })
    ),
    isLoading: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    propositions: [],
    isLoading: false
  };

  onSearchFunction = debounce(() => this.props.onSearch(), 200);

  onChange = e => {
    const {
      target: { value }
    } = e;
    const { onChange } = this.props;

    onChange(value);
    value.length > 3 && this.onSearchFunction();
  };

  render() {
    const { isLoading, value, propositions, onSelect } = this.props;

    return (
      <div>
        <TextInputField
          label="Location"
          description="Enter your location address, it will help people to find you."
          placeholder="Central station, Brussels"
          value={value}
          onChange={this.onChange}
        />
        <StyledDropDown>
          {isLoading ? (
            <Spinner />
          ) : (
            <ul>
              {propositions.map((item, i) => (
                <li key={i} onClick={() => onSelect(i)}>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </StyledDropDown>
      </div>
    );
  }
}

export default AutoComplete;
