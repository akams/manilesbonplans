import styled from 'styled-components'

import {
  BetterLink,
} from '@Atoms'

const Div = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding: 0 50px;
  position: relative;
  background-color: black;
  color: white;
  margin-bottom: 30px;

  .titleCategoryProduct {
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      text-decoration: none;
      color: inherit;

      .icon {
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
      }

      p {
        font-size: 16px;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }

  @media (max-width: 640px) {
    .titleCategoryProduct {
      a {
        padding: 0;

        .icon {
          width: 38px;
        }

        p {
          font-size: 22px;
        }
      }
    }
  }
`

const ChooseCategoryProduct = () => {
  return (
    <Div>
      <h1 className="titleCategoryProduct">
        <BetterLink href="/collections/cloths">
          <p>Vetements</p>
        </BetterLink>
      </h1>
      <h1 className="titleCategoryProduct">
        <BetterLink href="/collections/shoes">
          <p>Chaussures</p>
        </BetterLink>
      </h1>
      <h1 className="titleCategoryProduct">
        <BetterLink href="/collections/accessoiry">
          <p>Accessoires</p>
        </BetterLink>
      </h1>
    </Div>
  )
}

export default ChooseCategoryProduct
