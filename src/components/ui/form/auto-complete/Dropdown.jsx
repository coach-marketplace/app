import React, { Component } from "react";
import PropTypes from "prop-types";

import { StyledDropdown } from "./style";

// TODO: Handle the click outside functionality
class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
  };

  state = {
    shouldBeClosed: false,
  };

  // componentDidMount() {
  //   window.addEventListener("click", this.onClick);
  // }

  // componentWillMount() {
  //   window.removeEventListener("click", this.onClick);
  // }

  // onClick = (event) => {
  //   console.log("test", event);
  // };

  render() {
    const { children, isVisible } = this.props;
    const { shouldBeClosed } = this.state;

    if (!isVisible || shouldBeClosed) return null;

    return <StyledDropdown>{children}</StyledDropdown>;
  }
}

export default Dropdown;
