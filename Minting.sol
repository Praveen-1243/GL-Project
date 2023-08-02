// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract MintingContract is ERC721Enumerable, Ownable{

    //NFT
    struct StudentTranscriptMetaData {
        uint8 studentId;
        string name;
        uint8 marks;
        string message;
    }
    uint8 private tokenIdCounter = 0;
    mapping(uint8 => StudentTranscriptMetaData) private studentTranscriptInfoMap;

    function mintNFT(address _to, uint8 _studentId, string memory _name, uint8 _marks, string memory _message) public onlyOwner {
        uint8 _tokenId = tokenIdCounter;
        _mint(_to, _tokenId);
        studentTranscriptInfoMap[_tokenId] = StudentTranscriptMetaData(_studentId, _name, _marks, _message);
        tokenIdCounter++;
    }
    function validateTranscript(uint8 tokenId) public view returns (uint8 _studentId, string memory _name, uint8 _marks, string memory _message) {
        StudentTranscriptMetaData memory info = studentTranscriptInfoMap[tokenId];
        return (info.studentId, info.name, info.marks, info.message);
    }

}