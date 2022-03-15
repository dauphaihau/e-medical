import '../styles/globals.scss'
import {AuthProvider} from "../context/auth";
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

export default MyApp
