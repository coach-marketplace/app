import React, {useState} from "react";

import Pane from "../../../ui/pane/Pane";
import Button from "../../../ui/button/Button";

import IntroStep from "./IntroStep";
import FinalStep from "./FinalStep";


export default function BecomeACoachPane() {
    const [step, setStep] = useState("intro")

    console.log(step)

    let steps = ["intro", "final"]

    function goForward() {
        console.log("coucou")
        setStep(steps[steps.findIndex((elem) => elem===step)+1])
    }
    

    return <Pane elevation={4} width="33%" alignItems="center" justifyContent="center" margin="auto">
        {step === "intro" && <IntroStep />}
        {step === "final" && <FinalStep />}
        {step === "intro" && <Button onClick={e => goForward()}>Start!</Button>}
    </Pane>
}