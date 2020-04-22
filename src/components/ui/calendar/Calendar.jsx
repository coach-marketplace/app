import React, { Component } from "react";
// import PropTypes from "prop-types";

import MonthView from "./MonthView";

class Calendar extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <MonthView month={3} />
      </div>
    );
  }
}

export default Calendar;
