import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

// import validationSchema from "./validation";
import { Form, Field, Button, Pane } from '../../ui'
import { localesOptionsForm } from '../../../helper/utils'
import { LOCALE } from '../../../helper/constants'

const ProgramForm = ({ initialValues, onSubmit, isLoading }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      days: initialValues.days || 1,
      lang: initialValues.lang || LOCALE.EN_US,
      isPrivate: initialValues.isPrivate || false,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values),
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Language"
        name="lang"
        type="select"
        width={150}
        onChange={handleChange}
        options={localesOptionsForm}
        onBlur={handleBlur}
        value={values.lang}
        disabled={true}
      >
        {localesOptionsForm.map((locale) => (
          <option
            key={locale.value}
            value={locale.value}
            selected={locale.selected}
          >
            {locale.label}
          </option>
        ))}
      </Field>

      <Field
        label="Title"
        name="title"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        errorMessage={touched.title && errors.title}
        disabled={isLoading}
        isRequired
      />

      <Field
        label="Description"
        name="description"
        type="textarea"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        errorMessage={touched.description && errors.description}
        disabled={isLoading}
      />

      <Field
        label="Number of days"
        name="days"
        type="number"
        description="Enter the length of your program in number of days (e.g. for a 7 days program enter 7)."
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.days}
        errorMessage={touched.days && errors.days}
        disabled={isLoading}
        isRequired
      />

      {/* <Field
        label="Is Private?"
        name="isPrivate"
        type="switch"
        onChange={handleChange}
        checked={values.isPrivate}
        disabled={isLoading}
      /> */}

      <Pane display="flex">
        <Button type="submit" isLoading={isLoading} appearance="primary">
          Create
        </Button>
      </Pane>
    </Form>
  )
}

ProgramForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

ProgramForm.defaultProps = {
  initialValues: {},
}

export default ProgramForm
