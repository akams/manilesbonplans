/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'

import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@FirebaseConfig/firebase'

import { authActions } from '@Store/authSlice'
import { wishlistActions } from '@Store/wishlistSlice'
import { cartActions } from '@Store/cartSlice'
import apiClient, { setHeaders } from '@Utils/http-common';

import { Loading } from '@Atoms'

import { Props } from './type'

const ReactReduxFirebaseWrapper: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const dispatch = useDispatch()

  //@ts-ignore
  const subscriptionAuth = []
  useEffect(() => {
    const authSub = onAuthStateChanged(
      auth, (user) => {
        setCurrentUser(user)
      },
      () => {
        setIsLoading(false)
      },
    )
    subscriptionAuth.push(authSub)

    const authInterceptor = apiClient.interceptors.request.use(
      async (config) => {
        const token = await auth.currentUser?.getIdToken()
        config.headers = {
          ...setHeaders(token),
        };
        return config;
      },
      (error) => Promise.reject(error)
    )

    const unSubscribeAll = () => {
      //@ts-ignore
      subscriptionAuth.forEach((sub) => sub())
      subscriptionAuth.length = 0
      apiClient.interceptors.request.eject(authInterceptor);
    }

    return unSubscribeAll
  }, [])

  //@ts-ignore
  const subcriptions = []
  useEffect(() => {
    if (currentUser && currentUser.emailVerified) {
      const userInfoSub = onSnapshot(
        doc(db, currentUser.uid, 'account'),
        (document) => {
          const items = document.data()
          dispatch(authActions.setUser({
            email: currentUser.email,
            uid: currentUser.uid,
            emailVerified: currentUser.emailVerified,
            ...items,
          }))

          const wishlistSub = onSnapshot(
            doc(db, currentUser.uid, 'wishlist'),
            (document) => {
              try {
                //@ts-ignore
                const items = document.data().items
                dispatch(wishlistActions.setItems(items))

                const cartSub = onSnapshot(
                  doc(db, currentUser.uid, 'cart'),
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

                subcriptions.push(cartSub)
              } catch (error) {
                setIsLoading(false)
              }
            },
            () => {
              setIsLoading(false)
            },
          )
          subcriptions.push(wishlistSub)
        }
      )
      subcriptions.push(userInfoSub)
    } else {
      dispatch(authActions.setUser(null))
      dispatch(wishlistActions.setItems([]))
      dispatch(cartActions.setItems([]))
      setIsLoading(false)
    }

    const unSubscribeAll = () => {
      //@ts-ignore
      subcriptions.forEach((sub) => sub())
      subcriptions.length = 0
    }

    return unSubscribeAll
  }, [currentUser])

  return isLoading ? <Loading /> : <>{children}</>
}

export default ReactReduxFirebaseWrapper
