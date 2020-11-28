import styled from 'styled-components'

import { COLOR } from '../../../../helper/constants'

export const EditorContainer = styled.div`
  width: 100%;
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.3),
    inset 0 1px 2px rgba(67, 90, 111, 0.14);

  .rdw-editor-main {
    padding: 0 18px;
  }

  h1 {
    font-size: 24px;
  }

  a {
    color: ${COLOR.PRIMARY};
  }
`
