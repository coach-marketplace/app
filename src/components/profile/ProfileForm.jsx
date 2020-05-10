import React, { useEffect } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { getProfileInfos } from "../../store/modules/user/selectors"
import { Form, Field, Button, toaster } from "../../components/ui";
import { updateUserProfile, resetProfileUpdateStatus } from "../../store/modules/user/user";

const ProfileForm = () => {
    const dispatch = useDispatch();
    let profileData = useSelector(state => getProfileInfos(state));
    const { 
        handleSubmit, 
        handleChange,
        values,
        errors,
        touched,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: profileData.data.firstName,
            lastName: profileData.data.lastName,
            email: profileData.data.email,
            phone: "",
            gender: "",
            birthDate: "",
        },
        onSubmit: values => {
            dispatch(updateUserProfile(values))
        }
    })

    useEffect(() => {
        //console.log(profileData.updateUserProfile.status)
        if(profileData.updateUserProfile.status.success) {
            toaster.success("Your changes have been saved");
            //TODO: dispatch(resetProfileUpdateStatus())
        }
        else if(profileData.updateUserProfile.status.error
            || profileData.getAuthUser.status.error) {
                toaster.danger("An error occured, please try again later")
                //TODO: dispatch(resetProfileUpdateStatus());
        }
    })

    return (
        <Form onSubmit={handleSubmit} isLoading={profileData.updateUserProfile.status.isLoading}>
            <Field
            label="First name"
            name="firstName"
            type="text"
            placeholder="First name"
            onChange={handleChange}
            value={values.firstName || ""}
            errorMessage={touched.firstName && errors.firstName}
            marginRight={20}
            disabled={profileData.updateUserProfile.status.isLoading}
        />
        <Field
            label="Last name"
            name="lastName"
            type="text"
            placeholder="Last name"
            onChange={handleChange}
            value={values.lastName || ""}
            errorMessage={touched.lastName && errors.lastName}
            marginRight={20}
            disabled={profileData.updateUserProfile.status.isLoading}
        />
        <Field
            label="Email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={values.email || ""}
            errorMessage={touched.email && errors.email}
            marginRight={20}
            disabled={profileData.updateUserProfile.status.isLoading}
        />
        <Button type="submit" isLoading={profileData.updateUserProfile.status.isLoading} appearance="primary">
        Save
      </Button>
        </Form>
        
    )
}

export default ProfileForm