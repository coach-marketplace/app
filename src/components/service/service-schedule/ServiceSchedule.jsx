import React, { Component } from "react";
// import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import "./main.scss";

class ServiceSchedule extends Component {
  static displayName = "ServiceSchedule";

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          customButtons={{
            myCustomButton: {
              text: "custom!",
              click: function() {
                alert("clicked the custom button!");
              }
            }
          }}
        />
      </div>
    );
  }
}

export default ServiceSchedule;
