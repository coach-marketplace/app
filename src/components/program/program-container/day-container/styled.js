import styled from 'styled-components'

import { COLOR } from '../../../../helper/constants'

export const Container = styled.div`
  border: 1px solid ${COLOR.BACKGROUND_LIGHT};
  background-color: white;
  padding: 8px;
  min-height: 150px;
  ${({ cols }) => {
    const minWidth = 14.28
    const width = 100 / cols

    if (width < minWidth) {
      return `width: ${minWidth}%;`
    }

    return `width: ${width}%;`
  }}
`

export const TitleWrapper = styled.div`
  padding: 4px;
  text-align: center;
  border-bottom: 1px solid ${COLOR.BACKGROUND_LIGHT};
  color: ${COLOR.TEXT};
`

export const DroppableContainer = styled.div`
  min-height: 250px;
`
