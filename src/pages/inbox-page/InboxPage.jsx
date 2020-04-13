import React, { Component } from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import Title from "../../components/ui/typography/Title";

class InboxPage extends Component {
  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <>
            <Title>Your messages</Title>
          </>
        }
      />
    );
  }
}

export default InboxPage;
