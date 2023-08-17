// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OnchainSummerPFP is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant MINT_PRICE = 0.01 ether;

    constructor() ERC721("OnchainSummerLove", "OSL") {}

    function mint(address to, string memory tokenURI) external payable {
        require(msg.value >= MINT_PRICE, "Insufficient Ether sent");
        
        uint256 tokenId = _tokenIdCounter.current();
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenIdCounter.increment();
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}