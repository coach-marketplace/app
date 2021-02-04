import React from "react";


import CoachProfileForm from "../../../profile/coach-profile-form/CoachProfileForm";
import Heading from "../../../ui/heading/Heading";

export default function coachProfileStep({feedbackFunc = null}) {

    return <div >
        <Heading size={800}>
            About yourself
        </Heading>
        <CoachProfileForm feedbackFunction={feedbackFunc}/>
    </div>
}