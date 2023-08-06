// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "GL-Project/Minting.sol";

contract OrganizationContract {
    address orgAddress;
    address mintSmartContractAddress;
    constructor(address _orgAddr, address _mintAddress) {
        orgAddress = _orgAddr;
        mintSmartContractAddress = _mintAddress;
    }
    function validateTransacript(uint8 tokenId) public view returns (uint8 _studentId, string memory _name, string memory details, uint256 _marks, string memory _message) {
        return IMintingContract(mintSmartContractAddress).validateTranscript(tokenId);
    }
    
}