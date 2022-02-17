import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import * as S from "./styles";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";


const loadNFTs = async () => {   
  const web3Modal = new Web3Modal()
  //we need a signer, since we need to know who msg.sender is
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()

  const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
  const data = await marketContract.getMyNFTS()

  const items = await Promise.all(data.map(async (i: any )=> {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    return items;
}


const MyTokens = () => {
    const [nfts, setNfts] = useState<any[]>([]);
    const [loadingState, setLoadingState] = useState("not-loaded");

    const initNfts = async () => {
      const items = await loadNFTs();
      setNfts(items)
      setLoadingState('loaded') 
    }

    useEffect(() => {
      initNfts();
      }, []);

      if (loadingState === 'loaded' && !nfts.length) return (<S.MainHeading> No assets owned </S.MainHeading>)

      return (

        <S.Wrapper>
          <S.MainHeading> My Tokens </S.MainHeading>
          <S.FlexWrapper>
              {
                nfts.map((nft, i) => (
                  <S.NftCard key={i}>
                    <img src={nft.image}/>
                    <div >
                      <p> Price - {nft.price} Eth</p>
                    </div>
                  </S.NftCard>
                ))
              }
        </S.FlexWrapper>
      </S.Wrapper>

      )
  
}

export default MyTokens;