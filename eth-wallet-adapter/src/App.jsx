import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { createConfig, http, useConnect, WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'

const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
  }
})

const queryClient = new QueryClient()

function App() {

  const WalletConnector = () => {
    const { connectors, connect } = useConnect();

    return (
      connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
          {connector.error && <div>(error: {connector.error.message})</div>}
        </button>
      ))
    )
  }

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
