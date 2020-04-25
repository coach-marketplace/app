import React from "react"
import moment from 'moment';
import styled from "styled-components";

import Day from "./Day";

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 14.2%;
  }
`;

const DayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 14.2%;
  }
`;

class WeekView extends React.Component {

    dayContainerStyle = {
        float: 'left',
        width: '14%',
    } 

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
            
                <HeaderContainer>
                {   this.state.days.map((value, index) => {
                        return <div>{value.format('dddd')}</div>
                    })}
                </HeaderContainer>

                <DayContainer>
                    {this.state.days.map((value, index) => {
                        return <Day key={index} date={value}></Day>
                    })}
                </DayContainer>
            </div>
        )
    }

}

export default WeekView