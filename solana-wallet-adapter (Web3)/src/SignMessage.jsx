// used to verify the ownership

import { useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58';

const SignMessage = () => {

    const { publicKey, signMessage } = useWallet();

    const sign = async() => {
        if (!publicKey) throw new Error('Wallet not connected!');
            const message = document.getElementById('message').value;
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);
            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
            alert(`Message Signed Successfully! Message signature: ${bs58.encode(signature)}`);
            console.log(`Message signature: ${bs58.encode(signature)}`)
    }
 
  return (
    <div>
        <input type="text" name="message" id="message" placeholder="Write a message to sign..." />
        <button onClick={sign}>Sign Message</button>
    </div>
    
  )
}

export default SignMessage