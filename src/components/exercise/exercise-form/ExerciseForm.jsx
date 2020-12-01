import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'

// import validationSchema from "./validation";
import { Form, Field, Button, Pane } from '../../ui'
import { LOCALE } from '../../../helper/constants'
import { localesOptionsForm } from '../../../helper/utils'

const ExerciseForm = ({
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
  } = useFormik({
    initialValues: {
      name: initialValues.name || '',
      instructions: initialValues.instructions || '',
      videoUrl: initialValues.videoUrl || '',
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
        label="Name"
        name="name"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        errorMessage={touched.name && errors.name}
        disabled={isLoading}
        isRequired
      />

      <Field
        label="Instructions"
        name="instructions"
        type="textarea"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.instructions}
        errorMessage={touched.instructions && errors.instructions}
        disabled={isLoading}
      />

      <Field
        label="Video URL"
        name="videoUrl"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.videoUrl}
        errorMessage={touched.videoUrl && errors.videoUrl}
        disabled={isLoading}
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

ExerciseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

ExerciseForm.defaultProps = {
  initialValues: {},
}

export default ExerciseForm
