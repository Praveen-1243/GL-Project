// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


abstract contract MintingInterface is ERC721Enumerable, Ownable {
    constructor() ERC721("TranscriptToken", "NFT") {}
}
interface IMintingContract {
    function mintNFT(address _to, uint8 _studentId, string memory _name, string memory details, uint8 _marks, string memory _message) external returns(uint8);
    function validateTranscript(uint8 tokenId) external view returns (uint8 _studentId, string memory _name,string memory details, uint8 _marks, string memory _message);
}

contract MintingContract is MintingInterface, IMintingContract {

    //Data saved as NFT
    struct StudentTranscriptMetaData {
        uint8 studentId;
        string name;
        uint8 marks;
        string collegeOrCourse;
        string message;
    }

    uint8 private tokenIdCounter = 1;
    mapping(uint8 => StudentTranscriptMetaData) private studentTranscriptInfoMap;

    function mintNFT(address _to, uint8 _studentId, string memory _name, string memory _details, uint8 _marks, string memory _message) public override returns(uint8)  {
        uint8 _tokenId = tokenIdCounter;
        super._mint(_to, _tokenId);
        studentTranscriptInfoMap[_tokenId] = StudentTranscriptMetaData(_studentId, _name, _marks, _details, _message);
        tokenIdCounter++;
        return _tokenId;

    }
    function validateTranscript(uint8 tokenId) public view override returns (uint8 _studentId, string memory _name, string memory details, uint8 _marks, string memory _message) {
        StudentTranscriptMetaData memory info = studentTranscriptInfoMap[tokenId];
        return (info.studentId, info.name, info.collegeOrCourse, info.marks, info.message);
    }
}

