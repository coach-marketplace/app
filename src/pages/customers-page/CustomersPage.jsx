import React from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import Title from "../../components/ui/typography/Title";
import CustomersContainer from "../../components/customer/customers-container/CustomersContainer";

class CustomersPage extends React.Component {
  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <div>
            <Title>Your customers</Title>
            <CustomersContainer />
          </div>
        }
      />
    );
  }
}

export default CustomersPage;
