import '../src/styles/globals.css'
import type { AppProps } from 'next/app'
import NotificationProvider from '../src/components/Notifications/NotificationProvider'

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
  )
}
