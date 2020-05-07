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
            elevation={1}
            is="header"
            display="flex"
            padding={16}
            borderRadius={3}
            alignItems="center"
            background="white"
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
