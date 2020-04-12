import React, { Component } from "react";
import { Pane } from "evergreen-ui";

import { Container, Main, Footer } from "./styled";

class MainPageLayout extends Component {
  static displayName = "MainPageLayout";

  render() {
    const { header, main, footer } = this.props;

    return (
      <Container>
        {header && (
          <Pane
            is="header"
            display="flex"
            padding={16}
            background="tint2"
            borderRadius={3}
            alignItems="center"
          >
            {header}
          </Pane>
        )}
        <Main>{main}</Main>
        {footer && <Footer>{footer}</Footer>}
      </Container>
    );
  }
}

export default MainPageLayout;
