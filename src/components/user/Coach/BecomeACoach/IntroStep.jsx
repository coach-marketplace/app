import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    update as updateUser,
    cleanUpdate as cleanUpdateUser,
  } from "../../../../store/modules/user/actions";
import { Button, toaster, Spinner } from "../../../ui/";

import Heading from "../../../ui/heading/Heading"; 
import { ACTION_TYPE } from "../../../../helper/constants";

export default function IntroStep({feedbackFunc = null}) {
    const userUpdateStatus = useSelector(state => state.user.actions.update.status)
    const user = useSelector(state => state.user.current)
    const dispatch = useDispatch()

    useEffect(() => {
        if(userUpdateStatus){
            console.log(userUpdateStatus)
            if(userUpdateStatus === ACTION_TYPE.SUCCESS) {
                dispatch(cleanUpdateUser())
            }
            if(userUpdateStatus !== ACTION_TYPE.LOADING) {
                if(feedbackFunc) {
                    feedbackFunc(user)
                }
            }
        }
    }, [userUpdateStatus, user])

    const becomeCoach = () => {
        dispatch(updateUser({isCoach:true}))
        return <Spinner/>
    }

    if(!userUpdateStatus && user.isCoach) { //if user is already a coach
        return <Heading size={800}>
            You're already a coach !
        </Heading> 
    }
    return <div >
        <Heading size={800}>
            Become a Coach
        </Heading>
        <p>
            Fitigai is the perfect tool to help you make your career grow as a coach:
            Manage your appointments, create exercises, workouts and programs to share with your trainees,
            get more visible and find new customers easily!
        </p>
        <Button type="submit" label="Start" appearance="primary" onClick={e => {becomeCoach()}}/>
    </div>
}