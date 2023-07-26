import { Layout } from './components/Layout.js'
import Router from './components/Router.js'
import { useScreen } from './hooks/useScreen.js'
import Landing from './routes/Landing.js'

export default function App() {


  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>

  )
}