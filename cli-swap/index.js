import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import { Wallet } from '@project-serum/anchor';
import bs58 from 'bs58';
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config();

// It is recommended that you use your own RPC endpoint.
// This RPC endpoint is only for demonstration purposes so that this example will run.
const connection = new Connection('https://api.mainnet-beta.solana.com');

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || '')));

// Swapping SOL to USDC with input 0.1 SOL and 0.5% slippage
const quoteResponse = await (
    await axios.get('https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
  &outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v\
  &amount=100000000\
  &slippageBps=50'
    )
  ).json();
  // console.log({ quoteResponse })