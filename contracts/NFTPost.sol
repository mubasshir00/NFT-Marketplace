pragma solidity ^0.8.0;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTPost is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _postSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => PostItem) private idToPost;

    struct PostItem{
        uint256 tokenId;
        address payable auther;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event PostItemCreated(
        uint256 indexed tokenId,
        address auther,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("Metaverse Tokens","METT"){
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable{
        require(owner == msg.sender,"Only Marketplace owner can update listing price");
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256){
        return listingPrice;
    }

    function createToken(string memory tokenURI,uint256 price) public payable returns (uint){
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId,tokenURI);
        createPostItem(newTokenId,price);
        return newTokenId;
    }

    function createPostItem(uint256 tokenId,
        uint256 price) private {
        
    }
}