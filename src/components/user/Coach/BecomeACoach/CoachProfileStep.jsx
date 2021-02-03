import React from "react";


import CoachProfileForm from "../../../profile/coach-profile-form/CoachProfileForm";

export default function coachProfileStep({feedbackFunc = null}) {

    return <div >
        <CoachProfileForm feedbackFunction={feedbackFunc}/>
    </div>
}