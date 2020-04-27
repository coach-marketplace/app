import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

// import validationSchema from "./validation";
import { Form, Field, Button, Pane } from "../../ui";

const WorkoutForm = ({ initialValues, onRegister, onSubmit, isLoading }) => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      title: initialValues.title || "",
      content: initialValues.content || "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Title"
        name="title"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.title}
        errorMessage={touched.title && errors.title}
        isRequired
        marginRight={20}
        disabled={isLoading}
      />
     
      <Pane display="flex">
        <Button type="submit" isLoading={isLoading}>
          Create
        </Button>
      </Pane>
    </Form>
  );
};

WorkoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

WorkoutForm.defaultProps = {
  initialValues: {},
};

export default WorkoutForm;
