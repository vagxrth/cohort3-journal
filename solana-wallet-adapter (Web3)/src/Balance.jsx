import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Balance = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

    const getBalance = async() => {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById('balance').innerHTML = balance / LAMPORTS_PER_SOL;
        }
    }
    getBalance();
  return (
   <div>
        SOL BALANCE: <span id="balance"></span>
    </div>
  )
}

export default Balance