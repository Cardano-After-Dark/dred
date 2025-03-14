import { Layout } from './components/Layout'
import './index.css'

export function App() {
  return (
    <Layout>
      <div className="prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Dred Network
        </h1>
        <div className="mt-6 space-y-6 text-lg text-slate-600 dark:text-slate-400">
          <p>
            Dred is a decentralized network that enables secure and private communication between nodes.
          </p>
          <p>
            Get started by exploring our documentation and learn how to become part of the Dred network.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default App 