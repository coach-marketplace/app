import React from 'react'
import { useFormik } from 'formik'

import validationSchema from './validation'
import { Form, Field, Button, Pane } from '../../ui'

const AddCustomerForm = ({ initialValues, onSubmit, ButtonLabel }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      firstName: initialValues.firstName || '',
      lastName: initialValues.lastName || '',
      email: initialValues.email || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Pane display="flex" width="100%">
        <Field
          id="customer-first-name"
          label="First Name"
          name="firstName"
          type="text"
          placeholder="John"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          errorMessage={touched.firstName && errors.firstName}
          isRequired
          marginRight={20}
        />
        <Field
          id="customer-last-name"
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Doe"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          errorMessage={touched.lastName && errors.lastName}
          isRequired
        />
      </Pane>
      <Field
        label="Email Address"
        name="email"
        type="email"
        placeholder="john@doe.com"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errorMessage={touched.email && errors.email}
        isRequired
      />
      <Field
        label="Phone number"
        name="phone"
        type="text"
        placeholder="+32 476 64 66 71"
        onChange={handleChange}
        value={values.phone}
      />
      <Button
        type="submit"
        disabled={!!Object.keys(errors).length || !Object.keys(touched).length}
      >
        {ButtonLabel || 'Submit'}
      </Button>
    </Form>
  )
}

export default AddCustomerForm
