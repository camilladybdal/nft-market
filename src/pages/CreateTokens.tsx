import React, { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { create } from 'ipfs-http-client'
import * as S from "./styles";

import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export interface FormInput {
  name: string;
  description: string;
  price: string;
}

const client = create({host:'ipfs.infura.io', port :5001, protocol: 'https' ,apiPath:  '/api/v0'});

const CreateTokens = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
  
  /* Putting file on ipfs */
  const onChange = async (e: any) => {
    const file = e.target.files[0];
    let url;
    
    try {
      const added = await client.add(file, {
        progress: (prog: any) => console.log('recieved: ${prog}'),
      });
      console.log(added);
      url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url)
    } catch (e) {
      console.log(e)
    } 
  }
    
    /* create and item save it to ipfs */
    const createItem = async () => {
      const {price, name, description } = formInput
      if (! name || !name || ! description || !fileUrl) return 

      const data = JSON.stringify({
        price,
        name, 
        description,
        image: fileUrl
      })

      try{
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setFileUrl(url)
        await createSale (url, formInput);
      } catch (e) {
        console.log('error uploading file:', e);
      }
    }

  
    /* listing the item for sale */
    const createSale = async (url : string, formInput : FormInput) => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(nftaddress, NFT.abi, signer);
      let transaction = await contract.mint(url);
      const tx = await transaction.wait();

      const event = tx.events[0];
      const value = event.args[2];
      const tokenId = value.toNumber();
      
      const price = ethers.utils.parseUnits(formInput.price, "ether"); // one ether is 10^18 wei

      const marketcontract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
      let listingPrice = await marketcontract.getUploadPrice();
      listingPrice = listingPrice.toString();

      transaction = await marketcontract.createItem(nftaddress, tokenId, price, {
        value: listingPrice,
      });
      await transaction.wait();
    }


  return (
    <S.Wrapper>
      <S.MainHeading> Create Token!</S.MainHeading>

      <S.FormWrapper>
        <S.Form>
          <input 
            placeholder="Asset Name"
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Asset Description"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            placeholder="Asset Price in Eth"
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            type="file"
            name="Asset"
            onChange={onChange}
          />
          {
            fileUrl && (
              <img src={fileUrl} />
            )
          }
          <button onClick={createItem}>
          Create Digital Asset
        </button>
        </S.Form>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default CreateTokens
