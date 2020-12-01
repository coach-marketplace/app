import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, Main, Footer } from './styled'
import { Pane } from '../../ui'

class MainPageLayout extends Component {
  static propTypes = {
    isMainFull: PropTypes.bool,
  }

  static defaultProps = {
    isMainFull: false,
  }

  render() {
    const { header, main, footer, isMainFull } = this.props

    return (
      <Container>
        {header && (
          <Pane
            elevation={1}
            is="header"
            display="flex"
            paddingLeft={10}
            paddingRight={10}
            paddingTop={5}
            paddingBottom={5}
            borderRadius={3}
            alignItems="center"
            background="white"
          >
            {header}
          </Pane>
        )}
        <Main isFull={isMainFull}>{main}</Main>
        {footer && <Footer>{footer}</Footer>}
      </Container>
    )
  }
}

export default MainPageLayout
