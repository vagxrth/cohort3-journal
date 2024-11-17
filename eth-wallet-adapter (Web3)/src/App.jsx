import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { createConfig, http, useAccount, useBalance, useConnect, useDisconnect, useSendTransaction, WagmiProvider } from 'wagmi'
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

  const SendETH = () => {
    const { data: hash, sendTransaction }  = useSendTransaction();

    const sendTxn = async() => {
      const to = document.getElementById('to').value;
      sendTransaction({ to, value: '100000000000000000'});
    }

    return (
      <div>
        <input type="text" id='to' placeholder='To Address' />
        <button onClick={sendTxn}>Send 0.1 ETH</button>
        { hash && <div>Transaction Hash: { hash }</div> }
      </div>
    )
  }

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnector />
          <Balance />
          <SendETH />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App
