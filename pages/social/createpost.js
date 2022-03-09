import styles from './createpost.module.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import { create, create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { marketplaceAddress } from '../../config'

function CreatePost() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput,setFormInput] = useState({post:''})
  const router = useRouter()
  async function onChange(e){
    // upload image to IPFS
    const file = e.target.files[0]
    console.log('file',e.target.files[0]);
    try{
        const added = await client.add(
            file,
            {
                progress : (prog) => console.log(`received: ${prog}`)
            }
        )
        console.log(added.path);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setFileUrl(url)
    } catch (error) {
        console.log('Error uploading file',error);
    }
  }

  async function uploadToIPFS(){
      const {post} = formInput 
      if(!post || !fileUrl) return
      const data = JSON.stringify({
          post , image:fileUrl
      })
      try {
          const added = await client.add(data)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          return url
      } catch(error){
          console.log('Error uploading file : ',error);
      }
      router.push('/social')
  }

    async function listNFTPost(){
        const url = await uploadToIPFS()
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        //create NFT
        const price = ethers.utils.parseUnits(formInput.price,'ether')
        let contract = new ethers.Contract(marketplaceAddress)
    }

  return (
      <div className={styles.container}>
          <div className={styles.inputContainer}>
              <textarea
                  className={[styles.input]}
                  placeholder="What's on your mind"
                  rows="" cols="" 
                  onChange={e => setFormInput({
                      ...formInput,post:e.target.value
                  })}
                  />
              <div className={styles.buttonContainer}>
                  <div>
                      <input type="file" name="Asset"
                        className="my-2" 
                        onChange={onChange} 
                        />
                        {
                        fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl}/>
                        )
                        }
                  </div>
                  <button
                  onClick={listNFTPost}
                      className={[styles.button]}
                  >
                    Post
                  </button>
              </div>
          </div>
      </div>
  )
}

export default CreatePost