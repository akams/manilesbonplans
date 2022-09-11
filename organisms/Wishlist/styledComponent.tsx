import styled from 'styled-components'

export const Div = styled.div`
  padding: 16px;

  .title {
    font-size: 18px;
    font-weight: 500;

    span {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .clothes {
    margin: 16px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`