import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

// import validationSchema from "./validation";
import { Form, Field, Button, Pane, EditorInput, Text } from "../../ui";

const WorkoutForm = ({ initialValues, onRegister, onSubmit, isLoading }) => {
  const [content, setContent] = useState("");
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
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, content });
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

      <Text>Description</Text>
      <EditorInput onChange={(value) => setContent(value)} />

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
