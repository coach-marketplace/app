import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ServiceForm from '../service-form/ServiceForm'
import SideModal from '../../ui/modal/SideModal'
import Title from '../../ui/typography/Title'
import toaster from '../../ui/toaster/toaster'
import {
  create as createService,
  cleanCreate,
} from '../../../store/modules/service/actions'

const CreateServiceModal = ({
  createService,
  onClose,
  isOpen,
  cleanCreateActionStore,
  isCreateServicesSuccess,
  isCreateServicesError,
  isCreateServicesLoading,
}) => {
  useEffect(() => {
    if (!isCreateServicesLoading && isCreateServicesSuccess) {
      toaster.success('Service successfully created')
      cleanCreateActionStore()
    } else if (!isCreateServicesLoading && isCreateServicesError) {
      toaster.danger('Error in creation, retry later')
      cleanCreateActionStore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateServicesError, isCreateServicesLoading, isCreateServicesSuccess])

  return (
    <SideModal isShown={isOpen} onCloseComplete={onClose}>
      <Title>Create a service</Title>
      <ServiceForm
        onSubmit={createService}
        isLoading={isCreateServicesLoading}
      />
    </SideModal>
  )
}

CreateServiceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isCreateServicesSuccess: state.service.actions.create.success,
  isCreateServicesError: state.service.actions.create.error,
  isCreateServicesLoading: state.service.actions.create.loading,
})

const mapDispatchToProps = (dispatch) => ({
  createService: (data) => dispatch(createService(data)),
  cleanCreateActionStore: () => dispatch(cleanCreate()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateServiceModal)
