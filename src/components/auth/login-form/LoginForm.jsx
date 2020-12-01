import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

import validationSchema from './validation'
import { Form, Field, Button, Pane } from '../../../components/ui'

const LoginForm = ({ initialValues, onRegister, onSubmit, isLoading }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      email: initialValues.email || '',
      password: initialValues.password || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder="john@doe.com"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errorMessage={touched.email && errors.email}
        isRequired
        marginRight={20}
        disabled={isLoading}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        placeholder="********"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        errorMessage={touched.password && errors.password}
        isRequired
        marginRight={20}
        disabled={isLoading}
      />
      <Pane display="flex">
        <Button type="submit" isLoading={isLoading} appearance="primary">
          Login
        </Button>
        {onRegister && (
          <Button
            label="No account yet? Register"
            appearance="minimal"
            onClick={onRegister}
            disabled={isLoading}
          />
        )}
      </Pane>
    </Form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  initialValues: {},
}

export default LoginForm
