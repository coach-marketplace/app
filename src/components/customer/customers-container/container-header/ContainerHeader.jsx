import React from 'react'

import { Container, CellCustomer, CellEmail, CellActions } from './style'

const ContainerHeader = () => (
  <Container>
    <CellCustomer>Customer</CellCustomer>
    <CellEmail>Email</CellEmail>
    <CellActions>Actions</CellActions>
  </Container>
)

export default ContainerHeader
