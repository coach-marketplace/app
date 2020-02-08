import React from "react";

import Layout from "../../components/ui/layout/main-page-layout/MainPageLayout";
import Header from "../../components/ui/layout/header/Header";

class CustomersPage extends React.Component {
  state = {
    customers: []
  };

  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
            nesciunt, magni dolores ratione iusto repellat. Eum adipisci, illum
            qui distinctio accusamus fugiat unde est iste dolor aspernatur
            cupiditate omnis soluta.
          </div>
        }
      />
    );
  }
}

export default CustomersPage;
