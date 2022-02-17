const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFTMarket', function () {
  it('Should create and execute market sales', async function () {
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getUploadPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('100', 'ether')

    await nft.mint('https://mytokenlocation.com')
    await nft.mint('https://mytokenlocation2.com')

    // TODO: Kind of weird hard coding the token id. Should be returned when generating the NFT
    await market.createItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    // Can destruct how many addresses we want.
    const [_, buyerAddress] = await ethers.getSigners()

    // Simulate a user buying marketItem1
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice })

    let items = await market.getItemsCreated()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      const item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))

    console.log('items: ', items)
  })
})