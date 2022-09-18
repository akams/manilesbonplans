import styled, { keyframes } from 'styled-components'

const rotation = keyframes`
from {
      transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}    
`

export const Div = styled.div`
padding: 16px;
display: flex;
justify-content: center;

.cart {
  padding: 16px;
  display: inline;
}

.checkout {
  padding: 16px;
  font-size: 14px;
  width: 280px;
  display: inline;

  .basic {
    .title {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 0;
    }

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
  }

  .total {
    border-top: 1px #eee solid;
    font-weight: 500;

    .title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 0;
    }

    > div {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      font-size: 16px;
    }

    .order {
      font: inherit;
      border-radius: 10px;
      background: #8e2de2;
      background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
      background: linear-gradient(to right, #8e2de2, #4a00e0);
      color: white;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 48px;
      outline: none;
      cursor: pointer;
      padding: 14px 28px;
      margin-top: 32px;
      border: none;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .loader {
        width: 18px;
        height: 18px;
        border: 2px solid #fff;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: block;
        animation: ${rotation} 1s linear infinite;
      }
    }
  }
}

.title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;

  span {
    font-size: 16px;
    font-weight: 400;
  }
}

@media (max-width: 640px) {
  flex-direction: column;

  .cart {
    padding: 0;
  }

  .checkout {
    margin-top: 16px;
    padding: 0;
    width: 100%;
  }
}
`