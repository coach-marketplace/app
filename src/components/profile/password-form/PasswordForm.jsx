import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useFormik } from 'formik'

import { Button, Form, Field, toaster } from '../../ui'
import {
  updatePassword,
  cleanUpdatePassword,
} from '../../../store/modules/user/actions'
import { ACTION_TYPE } from '../../../helper/constants'

// TODO: improve validation
const PasswordForm = ({
  updatePasswordStatus,
  cleanUpdatePasswordStore,
  updatePassword,
}) => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    onSubmit: (values) => {
      if (values.newPassword !== values.newPasswordConfirm) {
        toaster.danger("Your new password and confirmation doesn't match")
      } else {
        updatePassword({
          current: values.oldPassword,
          new: values.newPassword,
        })
        resetForm()
      }
    },
  })

  useEffect(() => {
    if (updatePasswordStatus === ACTION_TYPE.SUCCESS) {
      toaster.success('Your password is correctly changed')
      cleanUpdatePasswordStore()
    } else if (updatePasswordStatus === ACTION_TYPE.FAILED) {
      toaster.danger('An error occurred, please try again later')
      cleanUpdatePasswordStore()
    }
  }, [cleanUpdatePasswordStore, updatePasswordStatus])

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Current password"
        name="oldPassword"
        type="password"
        required
        onChange={handleChange}
        value={values.oldPassword}
        errorMessage={touched.oldPassword && errors.oldPassword}
        disabled={updatePasswordStatus === ACTION_TYPE.LOADING}
      />

      <Field
        label="New password"
        name="newPassword"
        type="password"
        required
        onChange={handleChange}
        value={values.newPassword}
        errorMessage={touched.newPassword && errors.newPassword}
        disabled={updatePasswordStatus === ACTION_TYPE.LOADING}
      />

      <Field
        label="Confirm new password"
        name="newPasswordConfirm"
        type="password"
        required
        onChange={handleChange}
        value={values.newPasswordConfirm}
        errorMessage={touched.newPasswordConfirm && errors.newPasswordConfirm}
        disabled={updatePasswordStatus === ACTION_TYPE.LOADING}
      />

      <Button type="submit" label="save" appearance="primary" />
    </Form>
  )
}

const mapStateToProps = (state) => ({
  updatePasswordStatus: state.user.actions.updatePassword.status,
})

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data) => dispatch(updatePassword(data)),
  cleanUpdatePasswordStore: () => dispatch(cleanUpdatePassword()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordForm)
