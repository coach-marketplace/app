import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    update as updateUser,
    cleanUpdate as cleanUpdateUser,
  } from "../../../../store/modules/user/actions";
import Pane from "../../../ui/pane/Pane";
import Button from "../../../ui/button/Button";

import IntroStep from "./IntroStep";
import FinalStep from "./FinalStep";


export default function BecomeACoachPane() {
    const [step, setStep] = useState("intro")
    const user = useSelector(state => state.user.current)
    const dispatch = useDispatch()

    let steps = ["intro", "final"]

    function goForward() {
        let nextStepIndex = steps.findIndex((elem) => elem===step)+1 
        if(nextStepIndex === steps.length-1) {
            dispatch(updateUser({isCoach: true}))
            dispatch(cleanUpdateUser())
        }
        setStep(steps[nextStepIndex])
    }
    

    return <Pane elevation={4} width="33%" alignItems="center" justifyContent="center" margin="auto">
        {step === "intro" && <IntroStep />}
        {step === "final" && <FinalStep />}
        {step === "intro" && <Button onClick={e => goForward()}>Start!</Button>}
    </Pane>
}