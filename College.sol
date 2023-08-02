// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "Minting.sol";
import "RegularBoard.sol";

contract CollegeContract {
    MintingContract public mint;
    RegularBoardContract public regularBoardContract;

    address public collegeOwner;

    constructor() {
        // Set the contract deployer's address as the owner
        collegeOwner = msg.sender;
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
    
    Course[] public CourseDetails; 
    mapping (address => CollegeData) colleMapping;
             //StudentId => courseId, marks
    mapping (uint8 => mapping(uint8 => uint8)) marksInfo;
    mapping (uint8 => uint8[]) studentRegisteredCourses;

    function registerCollege(address _collegeAddress, uint8 _collegeId, string memory _collegeName, uint8 _boardId) public {
        //Registe college with empty students
        colleMapping[_collegeAddress] = CollegeData(_collegeId, _collegeName, _boardId, new uint8[](0));
        //update college id at Board
        regularBoardContract.setCollege(_collegeId);
    }
    function setStudent(uint8 _studentId) public {
        CollegeData storage _collegeData = colleMapping[msg.sender];
        //we can keep limit for number of colleges
        _collegeData.studentIds.push(_studentId);
    }
    //addCourse() : colleges will add their courses
    function addCourse(uint8 _courseId, string memory _courseName) public onlyCollege {
        Course memory _course = Course(_courseId, _courseName);
        CourseDetails.push(_course);
    }
    //listCourses : To display at Student node
    function listCoures() external view returns (Course[] memory _courseList) {
        return CourseDetails;
    }
    function enrollCourse(uint8 _courseId, uint8 _studentId) public {
        //keep condition for maximum students
        studentRegisteredCourses[_studentId].push(_courseId);
    }
    //only college can add marks
    function addMarks(uint8 _studentId, uint8 _courseId, uint8 _marks) public onlyCollege {
        marksInfo[_studentId][_courseId] = _marks;
    }
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName) public  onlyCollege {
        uint8 _marks = 0;
        uint8[] storage _coursesLists = studentRegisteredCourses[_studentId];
        for (uint8 i = 0; i<_coursesLists.length; i++) {
            _marks = _marks + marksInfo[_studentId][_coursesLists[i]];
        }
        //keep condition for marks (pass fail)
        mint.mintNFT(_to, _studentId, _studentName, _marks, "First Class");
    }
    function validateTransacript(uint8 tokenId) public view returns (uint8 _studentId, string memory _name, uint8 _marks, string memory _message) {
        return mint.validateTranscript(tokenId);
    }
}