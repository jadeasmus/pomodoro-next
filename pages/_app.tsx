import type { AppProps } from 'next/app'
import { useContext, useEffect } from 'react'
import { v4 } from 'uuid'
import NotificationProvider from '../src/components/Notifications/NotificationProvider'
import { NotificationContext } from '../src/components/Notifications/NotificationProvider'
import '../src/styles/globals.css'


export default function MyApp ({ Component, pageProps }: AppProps) {

 const dispatch = useContext(NotificationContext)

//  useEffect(() => {
//    dispatch({
//      type: 'ADD_NOTIFICATION',
//      payload: {
//        id: v4(),
//        type: 'WORK',
//        title: 'Notification',
//        message: 'new notification'
//      }
//    })

//  }, [])

  return (
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
  )
}
