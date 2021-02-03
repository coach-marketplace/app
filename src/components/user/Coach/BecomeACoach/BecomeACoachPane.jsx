import React, {useState} from "react";
import { Pane, Spinner } from "../../../ui/";

import IntroStep from "./IntroStep";
import FinalStep from "./FinalStep";
import CoachProfileStep from "./CoachProfileStep";


import {
    ACTION_TYPE,
  } from "../../../../helper/constants";
import { useCallback } from "react";


export default function BecomeACoachPane() {
    const [step, setStep] = useState("intro")

    let steps = ["intro", "coach-profile", "final"]

    const goForward = useCallback( (feedback =  ACTION_TYPE.SUCCESS) => {
        if(feedback === ACTION_TYPE.FAILED) {
            //TODO
        }
        else if(step === steps[steps.length-1]) { //last step
            //DO something
        }
        else {
            setStep(steps[steps.findIndex((elem) => elem===step)+1])
        }
    })
    
    /*if(userUpdateStatus === ACTION_TYPE.LOADING){
        return <Spinner/>
    }
    else {*/
        return <Pane elevation={4} width="33%" alignItems="center" justifyContent="center" margin="auto">
            {step === steps[0] && <IntroStep feedbackFunc={goForward}/>}
            {step === steps[1] && <CoachProfileStep feedbackFunc={goForward}/>}
            {step === steps[2] && <FinalStep feedbackFunc={goForward}/>}
    {/*step === "intro" && <Button type="submit" label="Start" appearance="primary" onClick={e => goForward()}/>*/}
        </Pane>
    //}
}