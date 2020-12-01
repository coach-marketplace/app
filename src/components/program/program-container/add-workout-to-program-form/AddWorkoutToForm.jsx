import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

import { Form, Field } from '../../../ui'

const AddWorkoutToForm = ({ initialValues, day, onSubmit }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      day: initialValues.day || '',
      startTime: initialValues.instructions || '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values),
  })

  const dayOptions = [...Array(day).keys()]

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Day"
        name="day"
        type="select"
        onChange={handleChange}
        options={dayOptions}
        onBlur={handleBlur}
        value={values.lang}
      >
        {dayOptions.map((dayNumber) => (
          <option key={dayNumber} value={dayNumber + 1}>
            {dayNumber + 1}
          </option>
        ))}
      </Field>
    </Form>
  )
}

AddWorkoutToForm.propTypes = {
  initialValues: PropTypes.shape({}),
  maxDays: PropTypes.number,
  onSubmit: PropTypes.func,
}

AddWorkoutToForm.defaultProps = {
  initialValues: {},
}

export default AddWorkoutToForm
