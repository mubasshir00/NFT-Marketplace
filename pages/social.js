import { ethers } from 'ethers'
import { create, create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  marketplaceAddress
} from '../config'
import CreatePost from './social/createpost'

function social() {
  
  return (
    <>
      <CreatePost/>
    </>
  )
}

export default social


// font - bold mt - 4 bg - green - 500 text - white rounded p - 4 shadow - lg