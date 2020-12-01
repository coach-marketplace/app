import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'

import { Form, Field, Button, toaster } from '../../ui'
import {
  update as updateUser,
  cleanUpdate,
} from '../../../store/modules/user/actions'
import { ACTION_TYPE, LOCALE } from '../../../helper/constants'
import { localesOptionsForm, genderOptionsForm } from '../../../helper/utils'

const ProfileForm = ({
  user,
  updateUserProfileStatus,
  updateUser,
  cleanUpdateUserStore,
}) => {
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
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      gender: user.gender || '',
      birthDate: user.birthDate || '',
      lang: user.lang || LOCALE.EN_US,
    },
    onSubmit: (values) => {
      updateUser(values)
    },
  })

  useEffect(() => {
    if (updateUserProfileStatus === ACTION_TYPE.SUCCESS) {
      toaster.success('Your changes have been saved')
      cleanUpdateUserStore()
    } else if (updateUserProfileStatus === ACTION_TYPE.FAILED) {
      toaster.danger('An error occurred, please try again later')
      cleanUpdateUserStore()
    }
  }, [cleanUpdateUserStore, updateUserProfileStatus])

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="First name"
        name="firstName"
        type="text"
        placeholder="First name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.firstName}
        errorMessage={touched.firstName && errors.firstName}
        disabled={updateUserProfileStatus === ACTION_TYPE.LOADING}
      />

      <Field
        label="Last name"
        name="lastName"
        type="text"
        placeholder="Last name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.lastName}
        errorMessage={touched.lastName && errors.lastName}
        disabled={updateUserProfileStatus === ACTION_TYPE.LOADING}
      />

      <Field
        label="Phone number"
        name="phone"
        type="text"
        placeholder="+32 476 64 66 71"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
      />

      <Field
        label="Default language"
        name="lang"
        type="select"
        onChange={handleChange}
        onBlur={handleBlur}
        options={localesOptionsForm}
        value={values.lang}
      >
        {localesOptionsForm.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label}
          </option>
        ))}
      </Field>

      <Field
        label="Gender"
        name="gender"
        type="select"
        onChange={handleChange}
        onBlur={handleBlur}
        options={genderOptionsForm}
        value={values.gender}
      >
        {genderOptionsForm.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label}
          </option>
        ))}
      </Field>

      <Button
        type="submit"
        isLoading={updateUserProfileStatus === ACTION_TYPE.LOADING}
        appearance="primary"
      >
        Save
      </Button>
    </Form>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.current,
  updateUserProfileStatus: state.user.actions.update.status,
})

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUser(data)),
  cleanUpdateUserStore: () => dispatch(cleanUpdate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
