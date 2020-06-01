/**
 * https://www.npmjs.com/package/react-dates#singledatepicker
 */
// TODO: Redesign the input to make it fit with other inputs
import React from "react";
import { SingleDatePicker } from "react-dates";

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

const DayPicker = (props) => {
  return <SingleDatePicker {...props} />;
};

export default DayPicker;
