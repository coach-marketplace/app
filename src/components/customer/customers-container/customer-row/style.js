import styled from 'styled-components'

export const UserRow = styled.div`
  display: flex;
  padding: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colorBorder};
  }
`
export const CellCustomer = styled.div`
  display: flex;
  width: 300px;
`

export const CellEmail = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  ${({ theme }) => `
    font-size: ${theme.fontSizeS};
  `}
`

export const CellActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`

export const CustomerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;

  > .full-name {
    margin-bottom: 5px;
    ${({ theme }) => `
      font-size: ${theme.fontSizeS};
      font-weight: ${theme.fontWeightBold};
    `}
  }
  > .date {
    ${({ theme }) => `
      font-size: ${theme.fontSizeXS};
      font-weight: ${theme.fontWeightNormal};
    `}
  }
`
