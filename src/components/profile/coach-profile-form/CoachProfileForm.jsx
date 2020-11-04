// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {Formik, FieldArray } from "formik";

import { Alert, Form, Field, Button, toaster, Tag, Autocomplete, TextInput, Spinner } from "../../ui";

import { ACTION_TYPE } from "../../../helper/constants";
import { useDispatch, useSelector } from "react-redux";

import { retrieveAll as getAllSports } from "../../../store/modules/sport/actions"
import { fetchCoachProfile, updateCoachProfile } from "../../../store/modules/coach/actions"


export default function CoachProfileForm () {

  const sportsList = useSelector(state => state.sport.list)
  const sportsNameList = sportsList.map(({ name }) => name)
  const getSportsStatus = useSelector(state => state.sport.actions.getAll.status)
  
  const coachProfile = useSelector(state => state.coach.coachProfile)
  const fetchCoachProfileStatus = useSelector(state => state.coach.actions.fetchCoachProfile.status)

  const updateCoachProfileStatus = useSelector(state => state.coach.actions.updateCoachProfile.status)

  const dispatch = useDispatch()
  

  const submitCoachProfileChanges = (values) => {
    let selectedSportsId = []
    values.selectedSports.forEach((sportName) => {
      selectedSportsId.push(sportsList.find(elem => elem.name === sportName)._id)
    })
    dispatch(updateCoachProfile(
      {
        description: values.description,
        company: values.company,
        sports: selectedSportsId
      }
    ))
  }

  useEffect(() => {
    if(!getSportsStatus) {
      dispatch(getAllSports());
    }
    if(!fetchCoachProfileStatus) {
      dispatch(fetchCoachProfile());
    }
    if (updateCoachProfileStatus === ACTION_TYPE.SUCCESS) {
      toaster.success("Your changes have been saved");
    } else if (updateCoachProfileStatus === ACTION_TYPE.FAILED) {
      toaster.danger("An error occurred, please try again later");
    }
  }, [dispatch, getSportsStatus, fetchCoachProfileStatus, updateCoachProfileStatus]);

  if(!getSportsStatus || getSportsStatus === ACTION_TYPE.LOADING ||
    !fetchCoachProfileStatus || fetchCoachProfileStatus === ACTION_TYPE.LOADING) {
    return <Spinner />
  }
  else if(getSportsStatus === ACTION_TYPE.FAILED || fetchCoachProfileStatus === ACTION_TYPE.FAILED) {
    return  <Alert intent="danger"
              title="We could not retrieve your data. Please try again later"
            />
  }
  return (
    <>
    <Formik
      initialValues={
        { 
          description: "" || coachProfile.description,
          company: "" || coachProfile.company,
          selectedSports: coachProfile.sports.map((id) => {
              return sportsList.find((elem) => elem._id === id).name
            }) 
            || []
        }
      }
      onSubmit={(values) => submitCoachProfileChanges(values)}
      >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
        <Form onSubmit={handleSubmit}>
          <Field
            label="About you"
            name="description"
            type="textarea"
            placeholder="Tell us a bit about yourselve"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            errorMessage={touched.description && errors.description}
            disabled={updateCoachProfileStatus === ACTION_TYPE.LOADING}
          />

          <Field
            label="Company"
            name="company"
            type="text"
            placeholder="Company (if applicable)"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.company}
            errorMessage={touched.company && errors.company}
            disabled={updateCoachProfileStatus === ACTION_TYPE.LOADING}
          />

          <FieldArray
            name="selectedSports"
            id="selectedSports">
            {(arrayHelpers) => { return (
              <>
              <label>Sports</label>
              <Autocomplete
                title="Sports"
                onChange={(changedItem) => {
                  arrayHelpers.push(changedItem)
                  //TODO clear input value
                }}
                items={sportsNameList}
              >
                {(props) => {
                  const { getInputProps, getRef, inputValue, openMenu } = props
                  return (
                    <TextInput
                      placeholder="Sports"
                      value={inputValue}
                      innerRef={getRef}
                      {...getInputProps({
                        onFocus: () => {
                          openMenu()
                        },
                      })}
                    />
                  )
                }}
              </Autocomplete>
              <div style={{display: "flex"}}>
                {values.selectedSports.map((item, index) => { return(
                  <Tag closeable={true} text={item} onDelete={() => arrayHelpers.remove(index)}/>
                )})}
              </div>
              </>
            )}}
          </FieldArray>

          

          <Button
            type="submit"
            isLoading={updateCoachProfileStatus === ACTION_TYPE.LOADING}
            appearance="primary"
          >
            Save
          </Button>
        </Form>
        )}}
  </Formik>
  </>
  );
};
