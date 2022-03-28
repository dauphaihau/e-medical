import '../styles/globals.scss'
import {AuthProvider} from "../context/auth";
import Layout from '@components/layout';
import {UtilProvider} from "../context/util";

function MyApp({Component, pageProps}) {
  return (
    <AuthProvider>
      <UtilProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UtilProvider>
    </AuthProvider>
  )
}

export default MyApp
