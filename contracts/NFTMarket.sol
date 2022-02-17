// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; //nonReentrant modifier
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    //sold: arrays in soldity doesnt allow dynamically linked arrays
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint uploadPrice = 0.020 ether;
    
    constructor() {
        owner = payable(msg.sender);
    }

    struct Item {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }

    mapping (uint => Item) private idToItem;

    event ItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold
    );

    function getUploadPrice() public view returns (uint){
        return uploadPrice;
    }

    //nftContract is the address for the NFT.sol when dep
    function createItem( address nftContract, uint tokenId, uint price) public payable nonReentrant {
        require(price > 0, "you need to have a nonzero price");
        require(msg.value >= uploadPrice, "price must be greater or equal to upload price");

        _itemIds.increment();
        uint itemId = _itemIds.current();

        //owner is empty address, since its being put for sale and noone owns it at this point
        idToItem[itemId] = Item(itemId, nftContract, tokenId, payable(msg.sender), payable(address(0)), price, false);

        //Transfer ownership of the NFT to the contract itself
        //RN the person who is writing the transaction owns it, so the contract needs to own it
        //Then the contract will transfer the ownership to the buyer
        IERC721(nftContract).transferFrom((msg.sender), address(this), tokenId);

        emit ItemCreated(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    function createMarketSale( address nftContract, uint itemId) public payable nonReentrant {
        uint price = idToItem[itemId].price;
        uint tokenId = idToItem[itemId].tokenId;

        require(msg.value == price, "Please submit the asking price");

        //the seller gets the value/price 
        idToItem[itemId].seller.transfer(msg.value);
         //Transfer ownership to buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToItem[itemId].owner = payable(msg.sender);
        idToItem[itemId].sold = true;
        _itemsSold.increment();
        payable(owner).transfer(uploadPrice);
    }

    //non-purchaed NFTs
    function getMarketItems() public view returns(Item[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemsCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        Item[] memory items = new Item[](unsoldItemsCount);
        for (uint i = 0; i < itemCount; i++){
            if (idToItem[i+1].owner == address(0)){
                uint currentId = idToItem[i+1].itemId;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    //my purchased NFTs
    function getMyNFTS() public view returns (Item[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i+1].owner == msg.sender) {
                itemCount ++;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i+1].owner == msg.sender) {
                uint currentId = idToItem[i+1].itemId;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    //Get the items that I created
    function getItemsCreated() public view returns (Item[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i + 1].seller == msg.sender) {
            itemCount++;
            }
        }
        
        Item[] memory items = new Item[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i + 1].seller == msg.sender) {
                uint currentId = idToItem[i + 1].itemId;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items; 
    }
}

