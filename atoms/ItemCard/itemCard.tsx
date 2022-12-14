import Image from 'next/image'
import styled from 'styled-components'
import { BetterLink } from '@Atoms'

import { getFormattedCurrency } from '@Utils/getFormattedCurrency'

const Div = styled.div`
  border: 1px #eee solid;
  font-size: 14px;

  a {
    text-decoration: none;
    color: inherit;
  }

  .info {
    padding: 8px;

    .brand {
      font-weight: 500;
    }

    .name {
      color: #777;
      margin: 8px 0;
    }

    .amount {
      font-weight: 500;
    }
  }
`

const ItemCard = ({ id, imageURL, brand, category, currency, amount, setPriority, subLink }) => {
  return (
    <Div>
      <BetterLink href={`/collections/${subLink}/${id}`}>
        <Image
          src={imageURL}
          width={220}
          height={275}
          layout="responsive"
          priority={setPriority}
          alt={`${brand}-${category}`}
        />
        <div className="info">
          <div className="brand">{brand}</div>
          <div className="name">{category}</div>
          <div className="amount">{`${currency} ${(amount)}`}</div>
        </div>
      </BetterLink>
    </Div>
  )
}

export default ItemCard
