import React from "react";
import {
  TextInputField,
  Alert,
  //   RadioGroup,
  SegmentedControl,
  Text,
} from "evergreen-ui";
// import DatePicker from "react-date-picker";
import Button from "../ui/button/Button";
import Spinner from "../ui/loader/Spinner";

import { connect } from "react-redux";
import { getBodyInfos } from "../../store/modules/user/selectors";
import {
  FETCH_USER_PHYSICAL_METRICS_PENDING,
  FETCH_USER_PHYSICAL_METRICS_ERROR,
  FETCH_USER_PHYSICAL_METRICS_SUCCESS,
  ADD_USER_PHYSICAL_METRICS_ERROR,
  ADD_USER_PHYSICAL_METRICS_PENDING,
  ADD_USER_PHYSICAL_METRICS_SUCCESS,
} from "../../store/modules/user/constants";

import {
  fetchUserBodyInfos,
  updateUserBodyInfos,
} from "../../store/modules/user/user";

class UserMetricsForm extends React.Component {
  state = {};

  componentDidMount() {
    this.props.fetchUserBodyInfos();
  }

  onBodyChangeSubmitted = (event) => {
    event.preventDefault();
    this.props.updateUserBodyInfos(this.props.bodyData);
  };

  getBasicScreen() {
    return (
      <form key={1} onSubmit={this.onBodyChangeSubmitted}>
        <TextInputField
          label="Height"
          description=""
          placeholder="Enter your height"
          //   defaultValue={this.props.bodyData.height.value}
          //   onChange={(event) =>
          //     (this.props.bodyData.height = event.target.value)
          //   }
        />
        <SegmentedControl
          name="height unit switch"
          width={80}
          height={24}
          options={[
            { label: "cm", value: "cm" },
            { label: "in", value: "in" },
          ]}
          //   value={this.props.bodyData.height.metric}
          //   onChange={(value) => (this.props.bodyData.height.metric = value)}
        />
        <TextInputField
          label="Weight"
          description=""
          placeholder="Enter your weight"
          //   defaultValue={this.props.bodyData.weight.value}
          //   onChange={(event) =>
          //     (this.props.bodyData.weight = event.target.value)
          //   }
        />
        <SegmentedControl
          name="weight unit switch"
          width={80}
          height={24}
          options={[
            { label: "kg", value: "kg" },
            { label: "lb", value: "lb" },
          ]}
          //   value={this.props.bodyData.weight.metric}
          //   onChange={(value) => (this.props.bodyData.weight.data = value)}
        />
        <Text>Birth date</Text>
        <br />
        {/* <DatePicker 
                            selected={new Date()}  
                        />

                        <RadioGroup
                            marginTop={40}
                            size={16}
                            label="Gender"
                            value={this.props.bodyData.gender}
                            options={[
                                { label: 'Female', value: 'Female' },
                                { label: 'Male', value: 'Male' },
                                { label: 'Other', value: 'Other' },
                            ]}
                            onChange={value => this.props.bodyData.gender = value}
                        />                         */}

        <Button type="submit" label="Save" />
      </form>
    );
  }

  /**
     *  <Component
                        initialState={{
                            options: [
                            { label: 'Female', value: 'Female' },
                            { label: 'Male', value: 'Male' },
                            { label: 'Other', value: 'Other' },
                            ],
                            value: '',
                        }}
                        >
                        {({ state, setState }) => (
                            <RadioGroup
                            marginTop={40}
                            size={16}
                            label="Gender"
                            value={state.value}
                            options={state.options}
                            onChange={value => this.props.bodyData.gender = { value }}
                            />
                        )}
                        </Component>
                          
     */

  render() {
    console.log(this.props.bodyData);
    switch (this.props.bodyData.status) {
      case FETCH_USER_PHYSICAL_METRICS_PENDING ||
        ADD_USER_PHYSICAL_METRICS_PENDING:
        return <Spinner />;
      case FETCH_USER_PHYSICAL_METRICS_ERROR || ADD_USER_PHYSICAL_METRICS_ERROR:
        return <Alert intent="danger" title={this.props.bodyData.error} />;
      case ADD_USER_PHYSICAL_METRICS_SUCCESS:
        return [
          <Alert
            key={0}
            intent="success"
            title={this.props.bodyData.message}
          />,
          this.getBasicScreen(),
        ];
      default:
        return this.getBasicScreen();
    }
  }
}

const mapStateToProps = (state) => {
  return { bodyData: getBodyInfos(state) };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserBodyInfos: () => dispatch(fetchUserBodyInfos()),
  updateUserBodyInfos: (bodyData) => dispatch(updateUserBodyInfos(bodyData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMetricsForm);
