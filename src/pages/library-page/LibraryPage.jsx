import React from "react";

import Layout from "../../components/layout/main-page-layout/MainPageLayout";
import Header from "../../components/layout/header/Header";
import LibraryContainer from "../../components/library/library-container/LibraryContainer";

class LibraryPage extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <Layout
        header={<Header />}
        main={<LibraryContainer type={match.params.type} />}
      />
    );
  }
}

export default LibraryPage;
