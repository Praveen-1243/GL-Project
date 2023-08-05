// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

interface RegularInterface {
    struct Board {
        uint8 boardId; 
        string boardName;
        uint8[] listedColleges;
    }

    struct BoardInfo {
        uint8 boardId;
        string boardName;
    }    

    function setCollege(uint8 _collegeId) external ;
    function getBoardList() external view returns (BoardInfo[] memory);
    function getCollegeList() external view returns(uint8[] memory _collegeList) ;
}


contract RegularBoardContract is RegularInterface{
    address boardOwner;
    constructor(address _address) {
        boardOwner = _address;
    }
    modifier onlyBoard() {
        require(msg.sender == boardOwner, "Only the Board can access this function.");
        _; 
    }
    mapping(address => Board) private boardMapping;
    mapping(address => bool) public boardDataExists;
    BoardInfo[] public boardList;
    
    event sampleMsg(address);

    function registerBoard(uint8 _boardId, string memory _boardname) public returns (bool) {  
        if (boardDataExists[boardOwner]) {
            return false;
        }                  
        boardMapping[boardOwner] = Board(_boardId, _boardname, new uint8[](0));
        boardDataExists[boardOwner] = true;
        BoardInfo memory _boardInfo = BoardInfo(_boardId, _boardname);
        boardList.push(_boardInfo);
        return true;
    }

    function setCollege(uint8 _collegeId) public  override  {
        Board storage _board = boardMapping[boardOwner];         
        _board.listedColleges.push(_collegeId);
    }
    function getBoardList() external view override returns (BoardInfo[] memory) {        
        return boardList;
    }
    function getCollegeList() external view override returns(uint8[] memory _collegeList) {        
        Board storage _board = boardMapping[boardOwner];
        return _board.listedColleges;
    }
}