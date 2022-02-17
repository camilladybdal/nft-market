import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import * as S from "./styles";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

interface NftItem {
    price: string;
    tokenId: string;
    seller: string;
    owner: string;
    image: string;
    name: string;
    description: string;
    sold: boolean;
  }

const CreatorDashbord = () => {

    const [nfts, setNfts] = useState<any[]>([]);
    const [sold, setSold] = useState<any[]>([]);
    const [loadingState, setLoadingState] = useState("not-loaded");

    useEffect(() => {
      loadNFTs()
    }, [])

    async function loadNFTs() {
        const web3Modal = new Web3Modal({
          network: "mainnet",
          cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
          
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const data = await marketContract.getItemsCreated()
        
        const items = await Promise.all(data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        const item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            sold: i.sold,
            image: meta.data.image,
          }
          return item
        }))
        
        /* create a filtered array of items that have been sold */
        const soldItems = items.filter((item: NftItem) => item.sold);

        setSold(soldItems)
        setNfts(items)
        setLoadingState('loaded') 
      }

      if (loadingState === 'loaded' && !nfts.length) return (<S.MainHeading> No assets created </S.MainHeading>)
      return (

        <S.Wrapper>          
          <S.MainHeading> Items Created </S.MainHeading>
          <S.FlexWrapper>
              {
                nfts.map((nft, i) => (
                  <S.NftCard key={i} >
                    <img src={nft.image}/>
                    <p> Price - {nft.price} Eth</p>
                   </S.NftCard>
                ))
              }
             </S.FlexWrapper>
             
             {Boolean(sold.length) && (
            <div>
            <S.MainHeading> Items Sold </S.MainHeading>
                <S.FlexWrapper>
                        {
                          sold.map((nft, i) => (
                            <S.NftCard key={i} >
                              <img src={nft.image} />
                              <p> Price - {nft.price} Eth</p>
                            </S.NftCard> 
                          ))
                        }    
                </S.FlexWrapper>    
            </div>      
              )
            }
        </S.Wrapper>
        )
      }

export default CreatorDashbord