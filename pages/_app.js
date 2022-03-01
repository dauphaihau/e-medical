import '../styles/globals.scss'
import App from "next/app"
import { AuthProvider, getUser } from "../context/auth";
import Layout from '@components/layout';

function MyApp({Component, pageProps}) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const auth = await getUser(appContext.ctx)
  return { ...appProps, auth: auth }
}

export default MyApp
