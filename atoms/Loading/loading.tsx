import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  0% {
    left: -30%;
  }
  
  50% {
    left: 80%;
  }
  
  100% {
    left: -30%;
  }
`
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Div = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .wrapper {
    width: 144px;
    height: 3px;
    border-radius: 99px;
    background-color: #ddd;
    position: relative;
    overflow-x: hidden;

    .bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      background: linear-gradient(to right, #8e2de2, #4a00e0);
      animation: ${loading} 2000ms infinite;
      transform: translateZ(0);
    }

    .loader {
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: ${rotate360} 2s linear infinite;
    }

  }
`

const Loading = () => {
  return (
    <Div>
      <div className="wrapper">
        <div className="bar"></div>
      </div>
    </Div>
  )
}

export const LoadingSpin = () => {
  return (
    <Div>
      <div className="wrapper">
        <div className="loader"></div>
      </div>
    </Div>
  )
}

export default Loading
