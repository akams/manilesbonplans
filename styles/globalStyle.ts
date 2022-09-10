import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  *::selection {
    background-color: #b699f2;
  }
`
export default GlobalStyle
