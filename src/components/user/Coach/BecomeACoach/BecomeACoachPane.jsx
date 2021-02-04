import React, { useState, useCallback } from "react";
import { Pane, Spinner } from "../../../ui/";

import IntroStep from "./IntroStep";
import CoachProfileStep from "./CoachProfileStep";
import FinalStep from "./FinalStep";
import ErrorScreen from "./ErrorScreen"


import {
    ACTION_TYPE,
  } from "../../../../helper/constants";


export default function BecomeACoachPane() {
    const [stepComponent, setStepComponent] = useState(null)
    let stepIndex = 0;
 

    const goForward = useCallback( (feedback =  ACTION_TYPE.SUCCESS) => {
        if(feedback === ACTION_TYPE.FAILED) {
            setStepComponent(<ErrorScreen message="Service unavailable. Please try again later."/>)
        }
        else if(feedback === ACTION_TYPE.LOADING) {
            setStepComponent(<Spinner/>)
        }
        else {
            stepIndex++;
            switch(stepIndex){
                case 1:
                    setStepComponent(<CoachProfileStep feedbackFunc={goForward} />)
                    break
                case 2:
                    setStepComponent(<FinalStep feedbackFunc={goForward} />)
                    break
                default:
                    setStepComponent(<IntroStep feedbackFunc={goForward} />)
            }

        }
    })
    

    return <Pane elevation={4} width="33%" alignItems="center" justifyContent="center" margin="auto">
        {stepComponent
        ? stepComponent
        : <IntroStep feedbackFunc={goForward} />}
    </Pane>
}