import React, { useEffect } from "react";
import { useFormik } from "formik";

import { Form, Field, Button, toaster, Tag, Autocomplete, TextInput } from "../../ui";

import { ACTION_TYPE, LOCALE } from "../../../helper/constants";
import { useState } from "react";

/* DATA relevant for coaches:
- Presentation
- company ?
- sports
- level of customers
- classes at home, at coach's home or in another place
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
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      customers: {
        beginner: false,
        intermediate: false,
        confirmed: false,
        pro: false,
      }
      /*firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      gender: user.gender || "",
      birthDate: user.birthDate || "",
      lang: user.lang || LOCALE.EN_US,*/
    },
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  const [sports, setSports] = useState([]);

  const onSportAdded = (sport) => {
    let newSports = [...sports]
    newSports.push(sport)
    setSports(newSports)
  }

  const onSportDeleted = (sport) => {
    let newSports = [...sports]
    const index = newSports.indexOf(sport);
    if (index > -1) {
      newSports.splice(index, 1);
      setSports(newSports);
    }
  };

  useEffect(() => {
    if (updateUserProfileStatus === ACTION_TYPE.SUCCESS) {
      toaster.success("Your changes have been saved");
      cleanUpdateUserStore();
    } else if (updateUserProfileStatus === ACTION_TYPE.FAILED) {
      toaster.danger("An error occurred, please try again later");
      cleanUpdateUserStore();
    }
  }, [cleanUpdateUserStore, updateUserProfileStatus]);


  return (
    <>
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

      <Field
        label="Sports"
        name="Spots"
        type="text"
        placeholder="Tennis, nutrition, yoga..."
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.sports}
      />

      <Button
        type="submit"
        isLoading={updateUserProfileStatus === ACTION_TYPE.LOADING}
        appearance="primary"
      >
        Save
      </Button>
    </Form>
    <div>
		<Autocomplete
			title="Sports"
			onChange={(changedItem) => onSportAdded(changedItem)}
			items={['Swimming', 'Yoga', 'Nutrition', 'Running', 'Tennis']}
		>
			{(props) => {
				const { getInputProps, getRef, inputValue } = props
				return (
					<TextInput
						placeholder="Sports"
						value={inputValue}
						innerRef={getRef}
						{...getInputProps()}
					/>
				)
			}}
		</Autocomplete>
    <div>
      {
        sports.map((item) => {
          return <Tag closeable={true} text={item} onDelete={() => onSportDeleted(item)}/>
        })
      }
    </div>
	</div>    
  </>
  );
};

