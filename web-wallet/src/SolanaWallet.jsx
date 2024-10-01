import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from "@solana/web3.js";

export const SolanaWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKey, setPublicKey] = useState([]);

    const generateWallet = () => {
        const seed = mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const secret = Keypair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setPublicKey([...publicKey, keypair.publicKey]);
    }

    return (
        <div>
            <button onClick={generateWallet}>Add SOL Wallet</button>
            <div>
                <p>Public Key</p>
                {publicKey.map(p => <div key="SOLPublicKey">{p.toBase58()}</div>)}
            </div>
        </div>
    )
}