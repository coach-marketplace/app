import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Textarea } from 'evergreen-ui'

export const StyledTextarea = styled(Textarea)`
  resize: ${({ isResizable }) => isResizable};
`

StyledTextarea.propTypes = {
  resize: PropTypes.oneOf([
    'none',
    'both',
    'horizontal',
    'vertical',
    'initial',
    'inherit',
  ]),
}

StyledTextarea.defaultProps = {
  resize: 'none',
}
