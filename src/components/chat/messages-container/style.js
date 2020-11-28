import styled from 'styled-components'

import { COLOR, SPACER } from '../../../helper/constants'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  border: 1px solid ${COLOR.BACKGROUND_LIGHT};
  overflow-y: auto;
  padding: ${SPACER.M};
`
