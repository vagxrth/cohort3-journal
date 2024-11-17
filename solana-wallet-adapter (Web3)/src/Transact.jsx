import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const Transact = () => {

    const wallet = useWallet();
    const { connection } = useConnection();

    const transaction = async() => {
        let payee = document.getElementById('payee').value;
        let amount = document.getElementById('amount').value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(payee),
            lamports: amount * LAMPORTS_PER_SOL
        }));
        await wallet.sendTransaction(transaction, connection);
        alert("Transaction Successful");
    }

  return (
    <div>
        <input type="text" id="payee" placeholder="Enter Receiver's Address" />
        <input type="text" id="amount" placeholder="Enter the Amount" />
        <button onClick={transaction}>SEND SOL</button>
    </div>
  )
}

export default Transact