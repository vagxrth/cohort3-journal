import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { createConfig, http, useAccount, useBalance, useConnect, useDisconnect, WagmiProvider } from 'wagmi'
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
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
          {connector.error && <div>(error: {connector.error.message})</div>}
        </button>
      ))
    )
  }

  const Balance = () => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const balance = useBalance({
      address
    })

    return (
      <>
        <div>
        { address && 
          <div>Address: {address} <br />
          Balance: { balance?.data?.formatted }</div>
        }
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
      </>
      
    )
  }

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <Balance />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
