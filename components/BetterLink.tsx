import Link from 'next/link'

//@ts-ignore
const BetterLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}

export default BetterLink
