import React, { Component } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

import Month from "./Months";
import Day from "./Day";

// const MONTHS = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 14.2%;
  }
`;

const MonthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 14.2%;
  }
`;

class MonthView extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      month: new Month(),
    };
  }

  render() {
    const { month } = this.state;

    return (
      <div>
        <HeaderContainer>
          {[...Array(7).keys()].map((i) => {
            return <div key={i}>{DAYS[i]}</div>;
          })}
        </HeaderContainer>
        <MonthContainer>
          {month.getDays().map((dayDate, i) => {
            return <Day key={i} date={dayDate} />;
          })}
        </MonthContainer>
      </div>
    );
  }
}

export default MonthView;
