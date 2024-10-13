import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Airdrop = () => {

    const wallet = useWallet(); // useWallet 'hook' 'provides' the wallet variable inside the 'component' as Airdrop Component is wrapped inside the wallet provider class 
    const { connection } = useConnection();

    const sendAirdrop = async() => {
        const amount = document.getElementById('airdrop').ariaValueMax;
        await connection.requestAirdrop(wallet.publicKey, amount*LAMPORTS_PER_SOL);
        alert("Airdropped Succesfully");
    }
 
  return (
    <div>
        <input type="text" name="airdrop" id="airdrop" placeholder="Amount to Airdrop" />
        <button onClick={sendAirdrop}>Airdrop</button>
    </div>
  )
}

export default Airdrop