import './App.css'
import { createConfig, http } from 'wagmi'
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

function App() {

  return (
    <>
      <input type="text" placeholder='Address' />
      <button>Send 0.1 ETH</button>
    </>
  )
}

export default App
