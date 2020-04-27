import React, { Component } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

class Day extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { date } = this.props;
    return (
      <div style={
        {
          float: 'left',
          width: '14%',
          height: '250px',
          border: "1px solid grey",
        }
      }>
        <p>{date.date()}</p>
      </div>
    )
  }
}

export default Day;
