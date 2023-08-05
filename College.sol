// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "Minting.sol";
import "RegularBoard.sol";

contract CollegeContract {
    MintingContract mint;

    address collegeOwner;
    address regularSmartContractAddress;
    address mintSmartContractAddress;


    constructor(address _address, address _regular, address _mint) {
        regularSmartContractAddress = _regular;
        mintSmartContractAddress = _mint;
        collegeOwner = _address;
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
    struct Course {
        uint8 courseId;
        string courseName;
    }
    event LogMessage(string message);
    
    Course[] public CourseDetails; 
    mapping (address => CollegeData) colleMapping;
    mapping (address => bool) collegeExists;
             //StudentId => courseId, marks
    mapping (uint8 => mapping(uint8 => uint8)) marksInfo;
            //studentId, courses
    mapping (uint8 => uint8[]) studentRegisteredCourses;


    

    function registerCollege(uint8 _collegeId, string memory _collegeName, uint8 _boardId) public returns (bool) {
        if (collegeExists[collegeOwner]) {
            return false;
        }  
        //Registe college with empty students
        colleMapping[collegeOwner] = CollegeData(_collegeId, _collegeName, _boardId, new uint8[](0));
        //update college id at Board
        RegularInterface(regularSmartContractAddress).setCollege(_collegeId);
        collegeExists[collegeOwner]=true;
        return true;
    }
    function displayBoards() public view returns(RegularInterface.BoardInfo[] memory) {
        return RegularInterface(regularSmartContractAddress).getBoardList();
    }

    function setStudent(uint8 _studentId) public {
        CollegeData storage _collegeData = colleMapping[collegeOwner];
        _collegeData.studentIds.push(_studentId);
    }
    //addCourse() : colleges will add their courses :: working
    function addCourse(uint8 _courseId, string memory _courseName) public returns (bool){
        for (uint i=0; i < CourseDetails.length; i++) {
            if (CourseDetails[i].courseId == _courseId) {
                return false;
            }
        }
        Course memory _course = Course(_courseId, _courseName);
        CourseDetails.push(_course);
        return true;
    }
    //listCourses : To display at Student node : working
    function listCoures() external view returns (Course[] memory _courseList) {
        return CourseDetails;
    }
    //enrollCourse
    function enrollCourse(uint8 _courseId, uint8 _studentId) public returns(bool) {
        //studentId check
        uint8[] memory _courseList = studentRegisteredCourses[_studentId];
        for (uint i=0; i < _courseList.length; i++) {
            if (_courseList[i] == _courseId) {
                return false;
            }
        }
        studentRegisteredCourses[_studentId].push(_courseId);
        return true;
    }
    //only college can add marks : working
    function addMarks(uint8 _studentId, uint8 _courseId, uint8 _marks) public returns(bool)  {
        
        uint8[] memory _courseList = studentRegisteredCourses[_studentId];
        for (uint i=0; i < _courseList.length; i++) {
            if (_courseList[i] == _courseId) {
                marksInfo[_studentId][_courseId] = _marks;
                return  true;
            }
        }
        return false;
    }
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName) public returns(uint8)  {
        uint8 _marks = 0;
        uint8[] storage _coursesLists = studentRegisteredCourses[_studentId];
        uint noOfCourses = _coursesLists.length;
        if (noOfCourses <= 0) {
            return 0;
        }
        for (uint8 i = 0; i<_coursesLists.length; i++) {
            _marks = _marks + marksInfo[_studentId][_coursesLists[i]];
        } 
        string memory studentStatus = "";
        if (_marks >= 35) {
            studentStatus = "Passed";
        } else {
            studentStatus = "Failed";
        }
        return IMintingContract(mintSmartContractAddress).mintNFT(_to, _studentId, _studentName, colleMapping[collegeOwner].collegeName, _marks, studentStatus);
    }
    function validateTransacript(uint8 tokenId) public view returns (uint8 _studentId, string memory _name, string memory college, uint8 _marks, string memory _message) {
        return IMintingContract(mintSmartContractAddress).validateTranscript(tokenId);
    }
}