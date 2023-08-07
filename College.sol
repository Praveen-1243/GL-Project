// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "GL-Project/Minting.sol";
import "GL-Project/RegularBoard.sol";

interface ICollegeContract {
    struct CollegeInfo {
        uint8 collegeId;
        string collegeName;
    }  
    struct Course {
        uint8 courseId;
        string courseName;
    }
    function setStudent(uint8 _studentId) external ;
    function getColleges() external view returns (CollegeInfo[] memory);
    function listCoures() external view returns (Course[] memory _courseList);
    function enrollCourse(uint8 _courseId, uint8 _studentId) external;
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName) external returns(uint8);
    function getBoardId(string memory _boardName) external view returns (uint8);
    
}

contract CollegeContract is ICollegeContract {
    address collegeOwner;
    address regularSmartContractAddress;
    address mintSmartContractAddress;

    uint8 private collegeId;
    uint8 private courseId;
    uint8 private randomMarks;

    constructor(address _regular, address _mint) {
        regularSmartContractAddress = _regular;
        mintSmartContractAddress = _mint;
        collegeOwner = msg.sender;
        collegeId = 11;
        courseId = 131;
        randomMarks = 20;
    }

    modifier onlyCollege() {
        require(msg.sender == collegeOwner, "Only the College can access this function.");
        _; 
    } 

    struct CollegeData {
        uint8 collegeId; 
        string collegeName;        
        uint8 boardId;
        uint8[] studentIds;
    }
    
    mapping(address =>Course[]) public CourseDetails;
    mapping (address => CollegeData) colleMapping;
    CollegeInfo[] public collegesList;
    mapping (address => bool) collegeExists;
               //StudentId => courseId, marks
    mapping (address => mapping(uint8 => mapping(uint8 => uint256))) marksInfo;
                           //studentId, courses
    mapping (address => mapping(uint8 => uint8[])) studentRegisteredCourses;

    event Datalog(string ,uint256);
    

    function registerCollege(string memory _collegeName, string memory _boardName) public returns (bool) {
        if (collegeExists[collegeOwner] || (collegeId <11 || collegeId>30)) {
            return false;
        }  
        uint8 _boardId = getBoardId(_boardName);
        //Registe college with empty students
        colleMapping[collegeOwner] = CollegeData(collegeId, _collegeName, _boardId, new uint8[](0));
        //update college id at Board
        RegularInterface(regularSmartContractAddress).setCollege(collegeId);
        CollegeInfo memory _college = CollegeInfo(collegeId, _collegeName);
        collegesList.push(_college);
        collegeExists[collegeOwner]=true;
        collegeId = collegeId+1;
        return true;
    }
    function getBoardId(string memory _boardName) public view override returns (uint8) {
        uint8 _boardId;
        RegularInterface.BoardInfo[] memory _boardInfo = RegularInterface(regularSmartContractAddress).getBoardList();
        for (uint i=0; i < _boardInfo.length; i++) {
            if (keccak256(abi.encodePacked((_boardInfo[i].boardName))) == keccak256(abi.encodePacked((_boardName)))) {   
                return _boardInfo[i].boardId;
            }            
        }
        return _boardId;
    }
    function getColleges() public view override returns (CollegeInfo[] memory){
        return collegesList;
    }
    function displayBoards() public view returns(RegularInterface.BoardInfo[] memory) {
        return RegularInterface(regularSmartContractAddress).getBoardList();
    }

    function setStudent(uint8 _studentId) public override {
        CollegeData storage _collegeData = colleMapping[collegeOwner];
        _collegeData.studentIds.push(_studentId);
    }
    //addCourse() : colleges will add their courses :: working
    function addCourse(string memory _courseName) public returns (bool){
        // for (uint i=0; i < CourseDetails[collegeOwner].length; i++) {
        //     if (CourseDetails[collegeOwner][i].courseId == courseId) {
        //         return false;
        //     }
        // }
        Course memory _course = Course(courseId, _courseName);
        courseId = courseId+1;
        CourseDetails[collegeOwner].push(_course);
        return true;
    }
    //listCourses : To display at Student node : working
    function listCoures() external view override  returns (Course[] memory _courseList) {
        return CourseDetails[collegeOwner];
    }
    //enrollCourse
    function enrollCourse(uint8 _courseId, uint8 _studentId) public override {
        //studentId check : check course exists or not
        // uint8[] memory _courseList = studentRegisteredCourses[collegeOwner][_studentId];
        // for (uint i=0; i < _courseList.length; i++) {
        //     if (_courseList[i] == _courseId) {
        //         return false;
        //     }
        // }
        studentRegisteredCourses[collegeOwner][_studentId].push(_courseId);
        addMarks(_studentId, _courseId);
    }
    //only college can add marks : working
    function addMarks(uint8 _studentId, uint8 _courseId) private { 
        if (randomMarks > 90) {
            randomMarks =20;
        }
        randomMarks = randomMarks + 5;  
        marksInfo[collegeOwner][_studentId][_courseId] = randomMarks;       
        // uint8[] memory _courseList = studentRegisteredCourses[collegeOwner][_studentId];
        // for (uint i=0; i < _courseList.length; i++) {
        //     if (_courseList[i] == _courseId) {
        //         marksInfo[collegeOwner][_studentId][_courseId] = _marks;
        //         return  true;
        //     }
        // }
        // return false;
    }
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName) public override returns(uint8)  {
        uint256 _marks = 0;
        uint8[] memory _coursesLists = studentRegisteredCourses[collegeOwner][_studentId];
        uint256 noOfCourses = _coursesLists.length;
        if (noOfCourses <= 0) {
            return 0;
        }
        for (uint8 i = 0; i< _coursesLists.length; i++) {
            _marks = _marks + marksInfo[collegeOwner][_studentId][_coursesLists[i]];
        } 
        _marks = _marks/noOfCourses;
        string memory studentStatus = "";
        if (_marks >= 35) {
            studentStatus = "Passed";
        } else {
            studentStatus = "Failed";
        }
        return IMintingContract(mintSmartContractAddress).mintNFT(_to, _studentId, _studentName, colleMapping[collegeOwner].collegeName, _marks, studentStatus);
    }
    function validateTransacript(uint8 tokenId) public view returns (uint8 _studentId, string memory _name, string memory college, uint256 _marks, string memory _message) {
        return IMintingContract(mintSmartContractAddress).validateTranscript(tokenId);
    }
}