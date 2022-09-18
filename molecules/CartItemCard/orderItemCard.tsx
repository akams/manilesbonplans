import Image from 'next/image'
import styled from 'styled-components'

import { CloseIcon } from '@Assets/icons'
import { getFormattedCurrency } from '@Utils/getFormattedCurrency'

import {
  BetterLink,
} from '@Atoms'

const Div = styled.div`
  font-size: 14px;
  border: 1px #eee solid;
  margin: 16px;
  display: inline-block;

  .item {
    display: flex;
    align-items: center;
    position: relative;

    a {
      text-decoration: none;
      color: inherit;
      display: block;
      width: 110px;
    }

    .info {
      padding: 8px;

      .brand {
        font-weight: 500;
      }

      .name {
        color: #777;
        margin-top: 8px;
      }

      .actions {
        margin: 16px 0;
        display: flex;

        button {
          background-color: #eee;
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          padding: 3px 12px;
          border: none;
          border-radius: 4px;
          outline: none;

          &:first-child {
            margin-right: 8px;
          }

          &.quantity {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3px 3px 3px 12px;

            .icon {
              margin-left: 3px;
              width: 14px;
              height: 14px;
              stroke-width: 2;
            }
          }
        }
      }

      .amount {
        font-weight: 500;
        display: flex;
        align-items: center;

        .icon {
          width: 14px;
          height: 14px;
          margin: 2px 4px 0 4px;
          stroke-width: 2px;
        }
      }
    }

    .delete {
      border: none;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 5;
      background-color: white;
      cursor: pointer;

      .icon {
        width: 16px;
        height: 16px;
        stroke-width: 2px;
      }
    }
  }

  .cart {
    font: inherit;
    font-weight: 500;
    background-color: white;
    color: #4a00e0;
    display: block;
    outline: none;
    cursor: pointer;
    border: none;
    border-top: 1px #eee solid;
    padding: 8px;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 340px;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

export const OrderItemCard = ({
  id,
  size,
  imageURL,
  brand,
  name,
  amount,
  quantity,
}) => {
  return (
    <>
      <Div>
        <div className="item">
          <BetterLink href={`/collections/${id}`}>
            <Image
              src={imageURL}
              width={50}
              height={50}
              layout="responsive"
            />
          </BetterLink>
          <div className="info">
            <div className="brand">{brand}</div>
            <div className="name">{name}</div>
            <div className="actions">
              <p>Size: {size}</p>
            </div>
            <div className="amount">
              <span>{quantity}</span>
              <CloseIcon />
              <span>{`Rs. ${getFormattedCurrency(amount)}`}</span>
            </div>
          </div>
        </div>
      </Div>
    </>
  )
}
