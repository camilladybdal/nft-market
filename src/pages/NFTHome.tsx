import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
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

const loadNFTs = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection); 
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    signer
  );

  const data = await marketContract.getMarketItems();

  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);

      //HER ER PROBLEMT: DEN ER UNDEFINED, tokenURI har jo ikke noe image??
      console.log("Tokenuri: " , tokenUri)
      console.log( "metaa " , meta.data.image);

      const price = ethers.utils.formatUnits(i.price.toString(), "ether");

      const item: NftItem = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        sold: i.sold,
      };
      return item;
    })
  );
  return items;

};

const buyNFT = async (nft: any) => {
  console.log("buynft")

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  // let provider = new ethers.providers.Web3Provider(web3.currentProvider);
  
  //const provider = new ethers.providers.JsonRpcProvider(
  //  "https://rpc-mumbai.maticvigil.com"
  //);

  const provider = new ethers.providers.Web3Provider(connection);

  /* User must be able to sign and execute transaction */
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });

  await transaction.wait();
  loadNFTs();
};

const NFTHome = () => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const initNfts = async () => {
    const items = await loadNFTs();

    console.log(items)
    setNfts(items);
    setLoadingState("loaded");
  };

  useEffect(() => {
    console.log("INIT")
    initNfts();
  }, []);

  /* this page will display NFTs which can be bought */
  console.log(loadingState)
  console.log(nfts.length)
  if (loadingState === "loaded" && !nfts.length) {
    return <S.MainHeading>No items in marketplace!</S.MainHeading>;
  }
  return (
    <S.FlexWrapper>
          {nfts.map((nft, i) => (
            <S.NftCard key={i}>
                <div>
                  <img src={nft.image} />
                </div>

                <div>
                  <h2> {nft.name} </h2>
                  <p> {nft.description}</p>
                  <p> {nft.price} ETH </p>
                  <button onClick={() => buyNFT(nft)}> Buy </button>
                </div>
            </S.NftCard>
          ))}
    </S.FlexWrapper>
  );
};

export default NFTHome;
