import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

// import validationSchema from "./validation";
import { Form, Field, Button, Pane } from '../../ui'
import { localesOptionsForm } from '../../../helper/utils'
import { LOCALE } from '../../../helper/constants'

const WorkoutForm = ({
  initialValues,
  onSubmit,
  isLoading,
  submitText,
  onDelete,
}) => {
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
      title: initialValues.title || '',
      instructions: initialValues.instructions || '',
      lang: initialValues.lang || LOCALE.EN_US,
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
        isRequired
        disabled={isLoading}
      />

      <Field
        label="Instructions"
        name="instructions"
        type="editor-input"
        onChange={(value) => setFieldValue('instructions', value)}
        value={values.instructions}
        errorMessage={touched.instructions && errors.instructions}
        disabled={isLoading}
      />

      <Pane display="flex">
        <Button type="submit" isLoading={isLoading} appearance="primary">
          {submitText || 'Create'}
        </Button>
        {onDelete && (
          <Button
            type="button"
            isLoading={isLoading}
            appearance="minimal"
            intent="danger"
            onClick={onDelete}
          >
            {'Delete'}
          </Button>
        )}
      </Pane>
    </Form>
  )
}

WorkoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

WorkoutForm.defaultProps = {
  initialValues: {},
}

export default WorkoutForm
