/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import { authActions } from '@Store/authSlice'
import { wishlistActions } from '@Store/wishlistSlice'
import { cartActions } from '@Store/cartSlice'
import { Loading } from '@Atoms'

import { auth, db } from '@FirebaseConfig/firebase'

import { Props } from './type'

const ReactReduxFirebaseWrapper: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  //@ts-ignore
  const subscriptions = []

  useEffect(() => {
    const authSub = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log('user from onAuthStateChanged', user);
          const userInfoSub = onSnapshot(
            doc(db, user.uid, 'account'),
            (document) => {
              const items = document.data()
              dispatch(authActions.setUser({
                email: user.email,
                uid: user.uid,
                emailVerified: user.emailVerified,
                ...items,
              }))

              const wishlistSub = onSnapshot(
                doc(db, user.uid, 'wishlist'),
                (document) => {
                  try {
                    //@ts-ignore
                    const items = document.data().items
                    dispatch(wishlistActions.setItems(items))

                    const cartSub = onSnapshot(
                      doc(db, user.uid, 'cart'),
                      (document) => {
                        try {
                          //@ts-ignore
                          const items = document.data().items
                          dispatch(cartActions.setItems(items))
                          setIsLoading(false)
                        } catch (error) {
                          setIsLoading(false)
                        }
                      },
                      () => {
                        setIsLoading(false)
                      },
                    )

                    subscriptions.push(cartSub)
                  } catch (error) {
                    setIsLoading(false)
                  }
                },
                () => {
                  setIsLoading(false)
                },
              )
              subscriptions.push(wishlistSub)
            }
          )

          subscriptions.push(userInfoSub)
        } else {
          dispatch(authActions.setUser(null))
          dispatch(wishlistActions.setItems([]))
          dispatch(cartActions.setItems([]))
          setIsLoading(false)
        }
      },
      () => {
        setIsLoading(false)
      },
    )

    subscriptions.push(authSub)

    const unSubscribeAll = () => {
      //@ts-ignore
      subscriptions.forEach((sub) => sub())
      subscriptions.length = 0
    }

    return unSubscribeAll
  }, [])

  return isLoading ? <Loading /> : <>{children}</>
}

export default ReactReduxFirebaseWrapper
