import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,
  #root {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    width: 100vw;
    height: 100vh;
  }

  a {
    text-decoration: none;
  }
`
