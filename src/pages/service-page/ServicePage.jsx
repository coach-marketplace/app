import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { retrieveAll as retrieveServices } from '../../store/modules/service/actions'
import Layout from '../../components/layout/main-page-layout/MainPageLayout'
import Header from '../../components/layout/header/Header'
import Button from '../../components/ui/button/Button'
import Title from '../../components/ui/typography/Title'
import ServicesContainer from '../../components/service/services-container/ServicesContainer'
import CreateServiceModal from '../../components/service/create-service-modal/CreateServiceModal'

class ServicePage extends React.Component {
  state = {
    isCreateServiceModalOpen: false,
  }

  componentDidMount() {
    const { retrieveServices, serviceList } = this.props

    !serviceList.length && retrieveServices()
  }

  render() {
    const { isCreateServiceModalOpen } = this.state
    const { isFetchServicesLoading, serviceList } = this.props

    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <CreateServiceModal
              onClose={() => this.setState({ isCreateServiceModalOpen: false })}
              isOpen={isCreateServiceModalOpen}
            />
            <Title>Your services</Title>
            <Button
              label="New"
              iconBefore="plus"
              appearance="minimal"
              onClick={() => this.setState({ isCreateServiceModalOpen: true })}
            />
            <ServicesContainer
              services={serviceList}
              isLoading={isFetchServicesLoading}
            />
          </Fragment>
        }
      />
    )
  }
}

const mapStateToProps = (state) => ({
  serviceList: state.service.list,
  isFetchServicesLoading: state.service.actions.getAll.loading,
})

const mapDispatchToProps = (dispatch) => ({
  retrieveServices: () => dispatch(retrieveServices()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage)
