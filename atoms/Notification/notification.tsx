import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  5% {
    opacity: 1;
    transform: scale(1);
  }
  20% {
    opacity: 1;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
  60% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`

const Notification = styled.div`
  background-color: #333;
  color: white;
  padding: 16px;
  border-radius: 6px;
  font-size: 14px;
  position: fixed;
  top: 138px;
  right: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
  display: none;

  p {
    margin-left: 8px;
  }

  &.activate {
    display: flex;
    animation: ${fade} 3s;
  }

  @media (max-width: 640px) {
    top: auto;
    bottom: 16px;
    padding: 10px;
  }
`
export default Notification
