/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { onAuthStateChanged, getIdToken } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@FirebaseConfig/firebase'

import { authActions } from '@Store/authSlice'
import { wishlistActions } from '@Store/wishlistSlice'
import { cartActions } from '@Store/cartSlice'
import { getHeaders } from '@Utils/headersApi'

import { Loading } from '@Atoms'

import { Props } from './type'

const ReactReduxFirebaseWrapper: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})
  const dispatch = useDispatch()

  //@ts-ignore
  const subscriptions = []
  //@ts-ignore
  let authInterceptor = null
  useEffect(() => {
    const authSub = onAuthStateChanged(
      auth,
      (user) => {
        if (user && user.emailVerified) {
          setCurrentUser(user)
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

    if (currentUser && Object.keys(currentUser).length) {
      authInterceptor = axios.interceptors.request.use(
        async (config) => {
          //@ts-ignore
          const token = await getIdToken(currentUser)
          console.log('token', token);
          config.headers = {
            ...getHeaders(token),
          };
          return config;
        },
        (error) => Promise.reject(error)
      )
    }

    const unSubscribeAll = () => {
      //@ts-ignore
      subscriptions.forEach((sub) => sub())
      subscriptions.length = 0
      //@ts-ignore
      axios.interceptors.request.eject(authInterceptor);
    }

    return unSubscribeAll
  }, [])

  return isLoading ? <Loading /> : <>{children}</>
}

export default ReactReduxFirebaseWrapper
