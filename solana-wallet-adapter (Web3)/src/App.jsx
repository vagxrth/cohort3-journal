import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import { useMemo } from 'react';
import Balance from './Balance';
import SignMessage from './SignMessage';
import Transact from './Transact';

function App() {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <div>
            hi there.
          </div>
          <Airdrop />
          <Balance />
          <SignMessage />
          <Transact />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App
