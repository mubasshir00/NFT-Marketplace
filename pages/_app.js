import '../styles/globals.css'
import Link from 'next/link'
import { Web3ReactProvider } from '@web3-react/core'
import {Web3Provider} from "@ethersproject/providers"
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

function getLibrary(provider){
  return new Web3Provider(provider)
}

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName:"nft-marketplace",
  supportedChainIds:[1,2,3,5,42],
});

const WalletConnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/14a516fe324b4f40a57212bf4eae56c2`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
})

const injected = new InjectedConnector({
  supportedChainIds:[1,3,4,5,42]
})

function MyApp({ Component, pageProps }) {
  const { activate, deactivate } = useWeb3React();

  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-green-500">
              Home
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-green-500">
              Sell NFT
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-green-500">
              My NFTs
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-green-500">
              Dashboard
            </a>
          </Link>
          <Link href="/social">
            <a className="mr-6 text-green-500">
             Social  
            </a>
          </Link>
        </div>
        <button className="mr-6 text-red-500" onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</button>
        <button className="mr-6 text-red-500" onClick={() => { activate(WalletConnect) }}>Wallet Connect</button>
        <button className="mr-6 text-red-500" onClick={() => { activate(Injected) }}>Metamask</button>
        <button className="mr-6 text-red-500" onClick={deactivate}>Disconnect</button>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
