import React from "react"
import moment from 'moment';

import Day from "./Day"

class WeekView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            today : moment(),
            days: [],
        }
        
        for(var i = 1; i<=7; i++) {
            this.state.days.push(moment().day(i));
        }

        console.log(this.state)
    }

    render() {
        return(
            <div style= {
                {
                    width: "100%",
                    margin: "auto",
                }
            }>
                {this.state.days.map((value, index) => {
                    return <Day key={index} date={value}></Day>
                })}
            </div>
        )
    }

}

export default WeekView