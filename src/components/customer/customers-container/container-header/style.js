import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorder};
`

export const CellCustomer = styled.div`
  display: flex;
  width: 300px;
  padding: 0 10px;
  ${({ theme }) => `
    font-size: ${theme.fontSizeM};
    font-weight: ${theme.fontWeightBold};
  `}
`

export const CellEmail = styled.div`
  display: flex;
  width: 250px;
  padding: 0 10px;
  ${({ theme }) => `
    font-size: ${theme.fontSizeM};
    font-weight: ${theme.fontWeightBold};
  `}
`

export const CellActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  padding: 0 10px;
  ${({ theme }) => `
    font-size: ${theme.fontSizeM};
    font-weight: ${theme.fontWeightBold};
  `}
`
