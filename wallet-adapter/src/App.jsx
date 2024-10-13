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

function App() {

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={'https://few-soft-seed.solana-devnet.quiknode.pro/f13be9ddc489cb4c8b71bf78b63f1129532e0281'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <div>
            hi there.
          </div>
          <Airdrop />
          <Balance />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App
