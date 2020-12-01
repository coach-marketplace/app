import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { StyledContainer } from './style'
import ServiceCard from '../service-card/ServiceCard'
import Spinner from '../../ui/loader/Spinner'
import NoResultText from '../../ui/empty-states/NoResultText'

class ServicesContainer extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    isLoading: false,
    services: [],
  }

  renderContent = () => {
    const { services } = this.props

    if (!services.length) {
      return <NoResultText />
    }

    return services.map((service) => (
      <ServiceCard title={service.title} key={service.title} />
    ))
  }

  render() {
    const { isLoading } = this.props

    if (isLoading) return <Spinner />

    return <StyledContainer>{this.renderContent()}</StyledContainer>
  }
}

export default ServicesContainer
