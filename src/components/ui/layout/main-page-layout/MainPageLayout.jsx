import React, { Component } from "react";

import { Container, Header, Main, Footer } from "./styled";

class MainPageLayout extends Component {
  static displayName = "MainPageLayout";

  render() {
    const { header, main, footer } = this.props;

    return (
      <Container>
        <Header>{header}</Header>
        <Main>{main}</Main>
        {footer && <Footer>{footer}</Footer>}
      </Container>
    );
  }
}

export default MainPageLayout;
