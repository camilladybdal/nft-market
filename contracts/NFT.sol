// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    //we want to give the nft-market the ability to change the ownership of the tokens
    constructor(address marketplaceAddress) ERC721("NFT", "NFTTOKENS") {
        contractAddress = marketplaceAddress;
    }

    function mint(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();

        // mints tokenIds and transfers it to "to"
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        //give the markedplace approval to transact this token between users within another contract
        setApprovalForAll(contractAddress, true); 
        return newTokenId;
    }
}