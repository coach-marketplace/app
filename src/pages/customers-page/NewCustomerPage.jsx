import React from "react";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";
import AddCustomerForm from "../../components/customer/add-customer-form/AddCustomerForm";

class NewCustomersPage extends React.Component {
  render() {
    return <Layout header={<Header />} main={<AddCustomerForm />} />;
  }
}

export default NewCustomersPage;
