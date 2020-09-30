import React from "react";

import Button from "../../ui/button/Button";
import Heading from "../../ui/heading/Heading"; 
import Pane from "../../ui/pane/Pane";

export default function BecomeACoachPane() {



    return <Pane elevation={4} width="33%" alignItems="center" justifyContent="center" margin="auto">
        <Heading size={800}>
            Become a Coach
        </Heading>
        <p>
            Fitigai is the perfect tool to help you make your career grow as a coach:
            Manage your appointments, create exercises, workouts and programs to share with your trainees,
            get more visible and find new customers easily!
        </p>
        <Button>Start</Button>
    </Pane>
}