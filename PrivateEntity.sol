// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
import "GL-Project/Minting.sol";

interface IPrivateEntity {
    struct PrivEntityInfo {
        uint8 privateId;
        string privateName;
    }
    struct Course {
        uint8 courseId;
        string courseName;
    }
    function getEntityList() external view returns (PrivEntityInfo[] memory);
    function setStudent(uint8 _studentId) external ;
    function listCoures() external view returns (Course[] memory _courseList);
    function enrollCourse(uint8 _courseId, uint8 _studentId) external;
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName, uint8 _courseId) external returns(uint8);
}

contract PrivateEntityContract is IPrivateEntity{
    address privateEntityAddress;
    address mintAddress;
    uint8 private privId;
    uint8 private courseId;
    uint8 private randomMarks;
    constructor(address _mintAddr) {
        privateEntityAddress = msg.sender;
        mintAddress = _mintAddr;
        privId = 101;
        courseId = 161;
        randomMarks = 20;
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

    function registerPrivateEntity(string memory _privname) public returns(bool){
        if (privEntityExists[privateEntityAddress] || (privId <101 || privId >110)) {
            return false;
        }  
        privEntityMapping[privateEntityAddress] = PrivEntity(privId, _privname, new uint8[](0));
        PrivEntityInfo memory _privEntity = PrivEntityInfo(privId, _privname);
        privEntityList.push(_privEntity);
        privEntityExists[privateEntityAddress]=true;
        privId = privId+1;
        return true;
    }
    function getEntityList() public view override returns (PrivEntityInfo[] memory) {
        return privEntityList;
    }
    function setStudent(uint8 _studentId) public override {
        PrivEntity storage _privData = privEntityMapping[privateEntityAddress];
        _privData.studentList.push(_studentId);
    }
    function addCourse(string memory _courseName) public returns (bool){
        // for (uint i=0; i < CourseDetails[privateEntityAddress].length; i++) {
        //     if (CourseDetails[privateEntityAddress][i].courseId == _courseId) {
        //         return false;
        //     }
        // }
        Course memory _course = Course(courseId, _courseName);
        CourseDetails[privateEntityAddress].push(_course);
        courseId = courseId + 1;
        return true;
    }
    function listCoures() external view override returns (Course[] memory _courseList) {
        return CourseDetails[privateEntityAddress];
    }
    function enrollCourse(uint8 _courseId, uint8 _studentId) public override{
        //studentId check : check course exists or not
        // uint8[] memory _courseList = studentRegisteredCourses[privateEntityAddress][_studentId];
        // for (uint i=0; i < _courseList.length; i++) {
        //     if (_courseList[i] == _courseId) {
        //         return false;
        //     }
        // }
        studentRegisteredCourses[privateEntityAddress][_studentId].push(_courseId);
        addMarks(_studentId, _courseId);
    }
    function addMarks(uint8 _studentId, uint8 _courseId) public {  
        if (randomMarks > 90) {
            randomMarks =20;
        }
        randomMarks = randomMarks + 5;  
        marksInfo[privateEntityAddress][_studentId][_courseId] = randomMarks;
    }
    function generateTransacript(address _to, uint8 _studentId, string memory _studentName, uint8 _courseId) public override returns(uint8)  {
        uint256 _marks = marksInfo[privateEntityAddress][_studentId][_courseId];
        string memory studentStatus = "";
        string memory collegeName = "";
        for (uint i=0; i < CourseDetails[privateEntityAddress].length; i++) {
            if (CourseDetails[privateEntityAddress][i].courseId == _courseId) {
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