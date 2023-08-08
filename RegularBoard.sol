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
    uint8 private boardId;
    constructor() {
        boardId = 1;
    }
    modifier onlyBoard() {
        require(msg.sender == boardOwner, "Only the Board can access this function.");
        _; 
    }
    mapping(address => Board) private boardMapping;
    mapping(address => bool) public boardDataExists;
    BoardInfo[] public boardList;
    
    event sampleMsg(address);

    function registerBoard(address _boardAddr, string memory _boardname) public returns (bool) {  
        boardOwner = _boardAddr;
        if (boardDataExists[boardOwner] || (boardId < 1 ||boardId>10)) {
            return false;
        }                  
        boardMapping[boardOwner] = Board(boardId, _boardname, new uint8[](0));        
        boardDataExists[boardOwner] = true;
        BoardInfo memory _boardInfo = BoardInfo(boardId, _boardname);
        boardId = boardId+1;
        boardList.push(_boardInfo);
        return true;
    }

    function setCollege(uint8 _collegeId) public  override  {
        Board storage _board = boardMapping[boardOwner];         
        _board.listedColleges.push(_collegeId);
    }
    function getBoardList() external view override returns (BoardInfo[] memory) {
        BoardInfo[] storage _boardList = boardList;  
        return _boardList;
    }
    function getCollegeList() external view override returns(uint8[] memory _collegeList) {        
        Board storage _board = boardMapping[boardOwner];
        return _board.listedColleges;
    }
}