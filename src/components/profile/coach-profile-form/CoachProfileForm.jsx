// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {Formik, FieldArray } from "formik";

import { Form, Field, Button, toaster, Tag, Autocomplete, TextInput, Spinner } from "../../ui";

import { ACTION_TYPE } from "../../../helper/constants";
import { useDispatch, useSelector } from "react-redux";

import { retrieveAll as getAllSports } from "../../../store/modules/sport/actions"

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
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = Formik /*useFormikContext({
    enableReinitialize: true,
    initialValues: {
      selectedSports: [],
      /*firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      gender: user.gender || "",
      birthDate: user.birthDate || "",
      lang: user.lang || LOCALE.EN_US,
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });*/

  const [sports, setSports] = useState([]);
  const sportsList = useSelector(state => state.sport.list)
  const sportsNameList = sportsList.map(({ name }) => name)
  const getSportsStatus = useSelector(state => state.sport.actions.getAll.status)
  const dispatch = useDispatch()

  const onSportAdded = (sport) => {
    let newSports = [...sports]
    newSports.push(sport)
    setSports(newSports)
    return newSports
  }

  const onSportDeleted = (sport) => {
    let newSports = [...sports]
    const index = newSports.indexOf(sport);
    if (index > -1) {
      newSports.splice(index, 1);
      setSports(newSports);
    }
    return newSports
  };

  const submitCoachProfileChanges = () => {
    //TODO
  }

  useEffect(() => {
    if(sportsList.length === 0) {
      dispatch(getAllSports());
    }
    if (updateUserProfileStatus === ACTION_TYPE.SUCCESS) {
      toaster.success("Your changes have been saved");
      cleanUpdateUserStore();
    } else if (updateUserProfileStatus === ACTION_TYPE.FAILED) {
      toaster.danger("An error occurred, please try again later");
      cleanUpdateUserStore();
    }
  }, [cleanUpdateUserStore, updateUserProfileStatus, getSportsStatus]);

  if(!getSportsStatus || getSportsStatus === ACTION_TYPE.LOADING) {
    return <Spinner />
  }
  return (
    <>
    <Formik
      initialValues={
        { 
          description: "",
          company: "",
          selectedSports: [], 
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
                        }
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
