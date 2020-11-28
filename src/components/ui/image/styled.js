import styled from 'styled-components'

export const StyledImage = styled.img`
  object-fit: cover;

  ${({ width, height }) => {
    if ((width && !height) || (!width && height)) {
      return `
        width: ${width || height};
        height: ${width || height};
      `
    }
    return `
      width: auto;
      height: auto;
    `
  }}
`
