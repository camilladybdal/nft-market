// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Color is ERC721Enumerable {
    string[] public  colors;
    mapping(string => bool) _colorTaken;

    using Counters for Counters.Counter;
    Counters.Counter private counter;

    constructor() ERC721("Color", "COLOR") public {
    }

    /* Mint new tokens*/
    function mint(string memory _color) public {
        require(!_colorTaken[_color]);
        colors.push(_color);
        uint _id = colors.length - 1;
        _mint(msg.sender, _id);
        _colorTaken[_color] = true;
        counter.increment();
    }

    function getCounter() public view returns (uint){
        return counter.current();
    }    
 }