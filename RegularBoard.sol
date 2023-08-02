// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegularBoardContract {
    address public boardOwner;

    constructor() {
        // Set the contract deployer's address as the owner
        boardOwner = msg.sender;
    }

    modifier onlyBoard() {
        require(msg.sender == boardOwner, "Only the Board can access this function.");
        _; 
    }
    struct Board {
        uint8 boardId; 
        string boardName;
        uint8[] listedColleges;
    }
    struct BoardInfo {
        uint8 boardId;
        string boardName;
    }
    BoardInfo[] public boardList;
    mapping(address => Board) private boardMapping;

    function registerBoard(address _boardAddress, uint8 _boardId, string memory _boardname) public {
        boardMapping[_boardAddress] = Board(_boardId, _boardname, new uint8[](0));
        BoardInfo memory _boardInfo = BoardInfo(_boardId, _boardname);
        boardList.push(_boardInfo);
    }

    function setCollege(uint8 _collegeId) public {
        Board storage _board = boardMapping[msg.sender];
        //we can keep limit for number of colleges
        _board.listedColleges.push(_collegeId);
    }
    function getBoardList() external view returns (BoardInfo[] memory) {        
        return boardList;
    }
    function getCollegeList() external view returns(uint8[] memory _collegeList) {
        Board storage _board = boardMapping[msg.sender];
        return _board.listedColleges;
    }
}