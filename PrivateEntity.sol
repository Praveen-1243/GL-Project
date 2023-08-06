// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "Minting.sol";

interface IPrivateEntity {
    struct PrivEntityInfo {
        uint8 collegeId;
        string collegeName;
    }
    struct Course {
        uint8 courseId;
        string courseName;
    }
    function getEntityList() external view returns (PrivEntityInfo[] memory);
    function setStudent(uint8 _studentId) external ;
    function listCoures() external view returns (Course[] memory _courseList);
    function enrollCourse(uint8 _courseId, uint8 _studentId) external returns(bool);
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName, uint8 _courseId) external returns(uint8);
}

contract PrivateEntityContract is IPrivateEntity{
    address privateEntityAddress;
    address mintAddress;
    constructor(address _addr, address _mintAddr) {
        privateEntityAddress = _addr;
        mintAddress = _mintAddr;
    }

    struct PrivEntity {
        uint8 privId;
        string privName;
        uint8[] studentList;
    }

    mapping(address => PrivEntity) privEntityMapping;
    mapping(address => bool) privEntityExists;
    PrivEntityInfo[] public privEntityList;
    mapping(address =>Course[]) public CourseDetails; 
    mapping (address => mapping(uint8 => uint8[])) studentRegisteredCourses;
    mapping (address => mapping(uint8 => mapping(uint8 => uint256))) marksInfo;

    function registerPrivateEntity(uint8 _privId, string memory _privname) public returns(bool){
        if (privEntityExists[privateEntityAddress]) {
            return false;
        }  
        privEntityMapping[privateEntityAddress] = PrivEntity(_privId, _privname, new uint8[](0));
        PrivEntityInfo memory _privEntity = PrivEntityInfo(_privId, _privname);
        privEntityList.push(_privEntity);
        privEntityExists[privateEntityAddress]=true;
        return true;
    }
    function getEntityList() public view override returns (PrivEntityInfo[] memory) {
        return privEntityList;
    }
    function setStudent(uint8 _studentId) public override {
        PrivEntity storage _privData = privEntityMapping[privateEntityAddress];
        _privData.studentList.push(_studentId);
    }
    function addCourse(uint8 _courseId, string memory _courseName) public returns (bool){
        for (uint i=0; i < CourseDetails[privateEntityAddress].length; i++) {
            if (CourseDetails[privateEntityAddress][i].courseId == _courseId) {
                return false;
            }
        }
        Course memory _course = Course(_courseId, _courseName);
        CourseDetails[privateEntityAddress].push(_course);
        return true;
    }
    function listCoures() external view override returns (Course[] memory _courseList) {
        return CourseDetails[privateEntityAddress];
    }
    function enrollCourse(uint8 _courseId, uint8 _studentId) public override returns(bool) {
        //studentId check : check course exists or not
        uint8[] memory _courseList = studentRegisteredCourses[privateEntityAddress][_studentId];
        for (uint i=0; i < _courseList.length; i++) {
            if (_courseList[i] == _courseId) {
                return false;
            }
        }
        studentRegisteredCourses[privateEntityAddress][_studentId].push(_courseId);
        return true;
    }
    function addMarks(uint8 _studentId, uint8 _courseId, uint8 _marks) public returns(bool)  {        
        uint8[] memory _courseList = studentRegisteredCourses[privateEntityAddress][_studentId];
        for (uint i=0; i < _courseList.length; i++) {
            if (_courseList[i] == _courseId) {
                marksInfo[privateEntityAddress][_studentId][_courseId] = _marks;
                return  true;
            }
        }
        return false;
    }
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName, uint8 courseId) public override returns(uint8)  {
        uint256 _marks = marksInfo[privateEntityAddress][_studentId][courseId];
        string memory studentStatus = "";
        string memory collegeName = "";
        for (uint i=0; i < CourseDetails[privateEntityAddress].length; i++) {
            if (CourseDetails[privateEntityAddress][i].courseId == courseId) {
                collegeName = CourseDetails[privateEntityAddress][i].courseName;
            }
        }
        if (_marks >= 35) {
            studentStatus = "Passed";
        } else {
            studentStatus = "Failed";
        }
        return IMintingContract(mintAddress).mintNFT(_to, _studentId, _studentName, collegeName, _marks, studentStatus);
    }

}