import React, { Component } from "react";
// import PropTypes from "prop-types";

import MonthView from "./MonthView";
import WeekView from "./WeekView";

class Calendar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <WeekView />
      </div>
    );
  }
}

export default Calendar;
