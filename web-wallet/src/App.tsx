import { useState } from 'react'
import { Key, RefreshCw, Copy, ExternalLink} from 'lucide-react'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { mnemonicToSeed } from "bip39";

import { Wallet, HDNodeWallet } from 'ethers';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from "@solana/web3.js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export default function App() {
    const [seedPhrase, setSeedPhrase] = useState('')
    const [showSeedPhrase, setShowSeedPhrase] = useState(false)
    const [ethWallet, setEthWallet] = useState({ address: '', balance: '' })
    const [solWallet, setSolWallet] = useState({ publicKey: '', balance: '' })
    const [currentETHIndex, setCurrentETHIndex] = useState(0);
    const [currentSOLIndex, setCurrentSOLIndex] = useState(0);

    const mnemonicGenerate = async () => {
        const phrase = generateMnemonic();
        setSeedPhrase(phrase);
        setShowSeedPhrase(true);
    }

    const generateETHWallet = async ({ seedPhrase }) => {
        const seed = await mnemonicToSeed(seedPhrase);
        const derivationPath = `m/44'/60'/${currentETHIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentETHIndex(currentETHIndex + 1);
        setEthWallet({
            address: `${wallet.address}`,
            balance: '1.5 ETH'
        })
    }

    const generateSOLWallet = ({ seedPhrase }) => {
      try {
          const seed = mnemonicToSeedSync(seedPhrase);
          const path = `m/44'/501'/${currentSOLIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString('hex')).key;
          const keypair = Keypair.fromSeed(derivedSeed).secretKey;
          setCurrentSOLIndex(currentSOLIndex + 1);
          setSolWallet({
              publicKey: `${Keypair.fromSecretKey(keypair).publicKey.toBase58()}`,
              balance: '1.5 SOL'
          });
      } catch (error) {
          console.error("Error generating SOL wallet:", error);
      }
  }

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
          <Card className="max-w-6xl mx-auto shadow-xl border-2 border-black">
            <CardHeader className="bg-black text-white">
              <CardTitle className="text-3xl font-bold text-center">Crypto Wallet</CardTitle>
              <CardDescription className="text-center text-gray-300">Manage your Ethereum and Solana assets</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button onClick={mnemonicGenerate} className="bg-black text-white hover:bg-gray-800">
                    <Key className="mr-2 h-5 w-5" /> Generate Seed Phrase
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-seed-phrase"
                      checked={showSeedPhrase}
                      onCheckedChange={setShowSeedPhrase}
                    />
                    <Label htmlFor="show-seed-phrase">Show Seed Phrase</Label>
                  </div>
                </div>
                {seedPhrase && showSeedPhrase && (
                  <Card className="bg-gray-100 border-2 border-black">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Seed Phrase</CardTitle>
                      <CardDescription>Keep this phrase secret and safe!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Input value={seedPhrase} readOnly className="pr-10 bg-white border-black" />
                        <Button variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => navigator.clipboard.writeText(seedPhrase)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              <Tabs defaultValue="ethereum" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="ethereum" className="data-[state=active]:bg-black data-[state=active]:text-white">
                    Ethereum
                  </TabsTrigger>
                  <TabsTrigger value="solana" className="data-[state=active]:bg-black data-[state=active]:text-white">
                     Solana
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="ethereum">
                  <Card className="border-2 border-black">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        Ethereum Wallet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Address:</Label>
                        <div className="relative">
                          <Input value={ethWallet.address || 'Not generated'} readOnly className="pr-10 border-black" />
                          <Button variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => navigator.clipboard.writeText(ethWallet.address)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Balance:</Label>
                        <Input value={ethWallet.balance || 'N/A'} readOnly className="border-black" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={generateETHWallet} className="w-full bg-black text-white hover:bg-gray-800">
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate ETH Wallet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="solana">
                  <Card className="border-2 border-black">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                         Solana Wallet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Public Key:</Label>
                        <div className="relative">
                          <Input value={solWallet.publicKey || 'Not generated'} readOnly className="pr-10 border-black" />
                          <Button variant="ghost" className="absolute right-0 top-0 h-full px-3" onClick={() => navigator.clipboard.writeText(solWallet.publicKey)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1 block">Balance:</Label>
                        <Input value={solWallet.balance || 'N/A'} readOnly className="border-black" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={generateSOLWallet} className="w-full bg-black text-white hover:bg-gray-800">
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate SOL Wallet
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="bg-gray-100">
              <Button variant="link" className="mx-auto text-black hover:text-gray-600">
                <ExternalLink className="mr-2 h-4 w-4" /> Learn more about crypto wallets
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }