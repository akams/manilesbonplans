import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { signOut } from 'firebase/auth'

import { LogoIcon, WishlistIcon, CartIcon, UserIcon } from '@Assets/icons'
import {
  BetterLink,
  Menu,
} from '@Atoms'
import { auth } from '@FirebaseConfig/firebase'

const Div = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;

  .title {
    margin: 16px 0;
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
        font-size: 24px;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }

  .box {
    display: flex;
    align-items: stretch;

    .nav-items {
      list-style-type: none;
      color: inherit;
      display: flex;
      align-items: center;

      .nav-item {
        display: flex;
        align-items: center;
        padding: 8px;
        position: relative;

        &:first-child {
          margin-right: 8px;
        }

        a {
          text-decoration: none;
          color: inherit;

          .badge {
            font-size: 10px;
            font-weight: 600;
            background-color: #4a00e0;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -2px;
            right: -2px;
            z-index: 10;

            @media (max-width: 640px) {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }

    .user-nav {
      border-top: 3px transparent solid;
      border-bottom: 3px transparent solid;
      display: flex;
      position: relative;

      button {
        background-color: white;
        border: none;
        padding: 16px;
      }

      &.active {
        border-bottom-color: #4a00e0;
      }
    }
  }

  @media (max-width: 640px) {
    .title {
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

    .box {
      .nav-items {
        .nav-item {
          padding: 6px;
        }
      }

      .user-nav {
        button {
          padding: 10px;
        }
      }
    }
  }
`

const NavBar = () => {
  const router = useRouter()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  //@ts-ignore
  const wishlistCount = useSelector((state) => state.wishlist.items.length)
  //@ts-ignore
  const cartItems = useSelector((state) => state.cart.items)
  const cartCount = cartItems.reduce(
    //@ts-ignore
    (prev, cur) => prev + +cur.itemQuantity,
    0,
  )

  const toggleMenuHandler = () => {
    if (isMenuVisible) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const openMenu = () => {
    setIsMenuVisible(true)
  }

  const closeMenu = () => {
    setIsMenuVisible(false)
  }

  const signOutHandler = async () => {
    await signOut(auth)
    closeMenu()
    router.replace('/signin')
  }

  return (
    <Div>
      <h1 className="title">
        <BetterLink href="/">
          <LogoIcon />
          <p>Mani Les Bons Plans</p>
        </BetterLink>
      </h1>
      <div className="box">
        <ul className="nav-items">
          <li className="nav-item">
            <BetterLink href="/wishlist">
              <WishlistIcon />
              {wishlistCount > 0 && (
                <span className="badge">{wishlistCount}</span>
              )}
            </BetterLink>
          </li>
          <li className="nav-item">
            <BetterLink href="/cart">
              <CartIcon />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </BetterLink>
          </li>
        </ul>
        <div className={`user-nav ${isMenuVisible ? 'active' : ''}`}>
          <button onClick={toggleMenuHandler}>
            <UserIcon />
          </button>
          {isMenuVisible && (
            <Menu onClose={closeMenu} onSignOut={signOutHandler} />
          )}
        </div>
      </div>
    </Div>
  )
}

export default NavBar
