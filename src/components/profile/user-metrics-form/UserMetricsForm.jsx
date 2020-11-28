import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";

import { Button, Form, Field, DayPicker, Label, toaster, Pane } from "../../ui";

import {
  addPhysicalMetrics,
  cleanAddPhysicalMetrics,
} from "../../../store/modules/user/actions";
import { ACTION_TYPE } from "../../../helper/constants";

const UserMetricsForm = ({
  addMetricsStatus,
  addPhysicalMetrics,
  latestHeight,
  latestWeight,
}) => {
  const [idsDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      height: latestHeight || "",
      weight: latestWeight || "",
      date: moment(),
    },
    onSubmit: (values) => {
      addPhysicalMetrics({
        height: {
          value: values.height,
        },
        weight: {
          value: values.weight,
        },
        date: values.date.toISOString(),
      });
    },
  });

  useEffect(() => {
    if (addMetricsStatus === ACTION_TYPE.SUCCESS) {
      toaster.success("You successfully add a new metric");
      cleanAddPhysicalMetrics();
    } else if (addMetricsStatus === ACTION_TYPE.FAILED) {
      toaster.danger("An error occurred, please try again later");
      cleanAddPhysicalMetrics();
    }
  }, [addMetricsStatus]);

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Your height"
        name="height"
        type="number"
        placeholder="Enter your height"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.height}
        errorMessage={touched.height && errors.height}
        disabled={addMetricsStatus === ACTION_TYPE.LOADING}
      />

      <Field
        label="Your weight"
        name="weight"
        type="number"
        placeholder="Enter your weight"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.weight}
        errorMessage={touched.weight && errors.weight}
        disabled={addMetricsStatus === ACTION_TYPE.LOADING}
      />

      <Pane marginBottom={20} display="flex" flexDirection="column">
        <Label>Date</Label>
        <DayPicker
          disabled={addMetricsStatus === ACTION_TYPE.LOADING}
          date={values.date}
          onDateChange={(date) => setFieldValue("date", date)}
          focused={idsDatePickerOpen}
          onFocusChange={({ focused }) => setIsDatePickerOpen(focused)}
          id="day-picker"
          numberOfMonths={1}
          hideKeyboardShortcutsPanel={true}
          firstDayOfWeek={1}
          appendToBody={false}
          isOutsideRange={() => false}
          isDayHighlighted={(day) => moment().isSame(day, "d")}
          openDirection="up"
        />
      </Pane>

      <Button
        type="submit"
        isLoading={addMetricsStatus === ACTION_TYPE.LOADING}
        appearance="primary"
        disabled={!values.height || !values.weight || !values.date}
      >
        Login
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  addMetricsStatus: state.user.actions.addPhysicalMetrics.status,
});

const mapDispatchToProps = (dispatch) => ({
  addPhysicalMetrics: (data) => dispatch(addPhysicalMetrics(data)),
  cleanAddUserStore: () => dispatch(cleanAddPhysicalMetrics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMetricsForm);
