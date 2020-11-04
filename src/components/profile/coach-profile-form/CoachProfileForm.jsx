// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {Formik, FieldArray } from "formik";

import { Alert, Form, Field, Button, toaster, Tag, Autocomplete, TextInput, Spinner } from "../../ui";

import { ACTION_TYPE } from "../../../helper/constants";
import { useDispatch, useSelector } from "react-redux";

import { retrieveAll as getAllSports } from "../../../store/modules/sport/actions"
import { fetchCoachProfile } from "../../../store/modules/coach/actions"

/* DATA relevant for coaches:
- Presentation
- company ?
- sports
*/

export default function CoachProfileForm ({
  user,
  updateUserProfileStatus,
  updateUser,
  cleanUpdateUserStore,
}) {

  const sportsList = useSelector(state => state.sport.list)
  const sportsNameList = sportsList.map(({ name }) => name)
  const getSportsStatus = useSelector(state => state.sport.actions.getAll.status)
  
  const coachProfile = useSelector(state => state.coach.coachProfile)
  const fetchCoachProfileStatus = useSelector(state => state.coach.actions.fetchCoachProfile.status)

  const dispatch = useDispatch()
  


  const submitCoachProfileChanges = () => {
    //TODO
  }

  useEffect(() => {
    if(!getSportsStatus) {
      dispatch(getAllSports());
    }
    if(!fetchCoachProfileStatus) {
      dispatch(fetchCoachProfile());
    }
    if (updateUserProfileStatus === ACTION_TYPE.SUCCESS) {
      toaster.success("Your changes have been saved");
      cleanUpdateUserStore();
    } else if (updateUserProfileStatus === ACTION_TYPE.FAILED) {
      toaster.danger("An error occurred, please try again later");
      cleanUpdateUserStore();
    }
  }, [cleanUpdateUserStore, updateUserProfileStatus, getSportsStatus, fetchCoachProfileStatus]);

  if(!getSportsStatus || getSportsStatus === ACTION_TYPE.LOADING ||
    !fetchCoachProfileStatus || fetchCoachProfileStatus == ACTION_TYPE.LOADING) {
    return <Spinner />
  }
  else if(getSportsStatus == ACTION_TYPE.FAILED || fetchCoachProfileStatus == ACTION_TYPE.FAILED) {
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
          selectedSports: [] || coachProfile.sports.map(({ name }) => name), 
        }
      }
      >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
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
            disabled={updateUserProfileStatus === ACTION_TYPE.LOADING}
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
            disabled={updateUserProfileStatus === ACTION_TYPE.LOADING}
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
            isLoading={updateUserProfileStatus === ACTION_TYPE.LOADING}
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
