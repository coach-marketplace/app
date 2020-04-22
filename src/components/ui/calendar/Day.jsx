import React, { Component } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

class Day extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { date } = this.props;
    // console.log("a", day);
    return (
      <StyledContainer>
        <p>{date.getDate()}</p>
        {/* <div>{DAYS[day.getDay() - 1]}</div>
        <div>{day.getDate()}</div>
        <div>{day.getWeek()}</div> */}
      </StyledContainer>
    );
  }
}

export default Day;
