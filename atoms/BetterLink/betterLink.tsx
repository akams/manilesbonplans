import { FC } from 'react'
import Link from 'next/link'

import { Props } from './type'

const BetterLink: FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

export default BetterLink
