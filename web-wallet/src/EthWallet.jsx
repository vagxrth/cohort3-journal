import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from 'ethers';

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [address, setAddress] = useState([]);
    
    const generateWallet = async() => {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex + 1);
        setAddress([...address, wallet.address]);
    }

    return (
        <div>
            <p>ETH Address</p>
            <button onClick={generateWallet}>Add ETH Wallet</button>
            {address.map(a => <div key='ETHAddress'>{a}</div>)}
        </div>
    )
}