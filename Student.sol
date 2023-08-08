// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "GL-Project/College.sol";
import "GL-Project/PrivateEntity.sol";
import "GL-Project/RegularBoard.sol";

contract StudentContract {

    address studentAddress;
    address collegeAddress;
    address privateAddress;
    address regularSmartContractAddress;
    uint8 private studentId;
    uint8 private privEntityStudentId;
    constructor(address _regularAddr, address _collegeAdress, address _privAddress) {
        regularSmartContractAddress = _regularAddr;
        collegeAddress = _collegeAdress;
        privateAddress = _privAddress;
        studentId = 31;
        privEntityStudentId = 200;

    }    
    struct StudentData {
        uint8 studentId;
        string studentName;
        uint8 collegeId;
        uint8 boardOrPrivId;
        uint8[] coursesList;
    }
    mapping (address => StudentData) studentMapping;
    mapping (address => StudentData) studentMappingAtPrivateEntity;
    mapping (address=>bool) studentExists;
    mapping (address=>bool) studentExistsAtPrivate;
    mapping (address => uint8[]) studentTokens;

    event SampleMSG(string, uint8);
    event Datalog(string ,uint256);

    function registerToCollege(address _studentAddr, string memory _studentName, string memory _collegeName, string memory _boardName) public returns (bool){
        studentAddress = _studentAddr;
        if (studentExists[studentAddress] || (studentId<31 || studentId>100)) {
            return false;
        }
        uint8 collegeid = getCollegeId(_collegeName);
        uint8 boardid = ICollegeContract(collegeAddress).getBoardId(_boardName);
        studentMapping[studentAddress] = StudentData(studentId, _studentName, collegeid , boardid ,new uint8[](0));        
        ICollegeContract(collegeAddress).setStudent(studentId);
        studentId = studentId+1;
        studentExists[studentAddress] = true;
        return true;
    }
    function getCollegeId(string memory _collegeName) public returns (uint8){
        uint8 _collegeId;
        ICollegeContract.CollegeInfo[] memory _collegeInfo =  ICollegeContract(collegeAddress).getColleges();
        emit Datalog(" clg list log 1", _collegeInfo.length);
        for (uint i=0; i < _collegeInfo.length; i++) {
            if (keccak256(abi.encodePacked((_collegeInfo[i].collegeName))) == keccak256(abi.encodePacked((_collegeName)))) {                
                emit Datalog(" clg list log 2", _collegeInfo[i].collegeId);
                return _collegeInfo[i].collegeId;
            }            
        }
        return _collegeId;
    }
    function displayBoards() public view returns(RegularInterface.BoardInfo[] memory) {
        return RegularInterface(regularSmartContractAddress).getBoardList();
    }
    function getColleges() public view returns (ICollegeContract.CollegeInfo[] memory) {
        return ICollegeContract(collegeAddress).getColleges();
    }
    function getCourses() public view returns(ICollegeContract.Course[] memory){
        return ICollegeContract(collegeAddress).listCoures();
    }
    function getCollegeStudentId() public view returns (uint8){
        StudentData memory _studentData = studentMapping[studentAddress];
        return _studentData.studentId;
    }
    function enrollTocourses(string memory _courseName, uint8 _studentId) public{
        ICollegeContract.Course[] memory _courses = ICollegeContract(collegeAddress).listCoures();
        uint8 _tempCourseId;
        for (uint i=0; i < _courses.length; i++) {
            if (keccak256(abi.encodePacked((_courses[i].courseName))) == keccak256(abi.encodePacked((_courseName)))) {
                _tempCourseId = _courses[i].courseId;
                ICollegeContract(collegeAddress).enrollCourse(_courses[i].courseId, _studentId);
                break;
            }            
        }
        emit SampleMSG("hello college ::: ", _tempCourseId);
    }
    function getTransacript() public returns(uint8) {
        StudentData memory _studentData = studentMapping[studentAddress];
        uint8 tokenId = ICollegeContract(collegeAddress).generateTransacript(studentAddress,_studentData.studentId, _studentData.studentName);
        studentTokens[studentAddress].push(tokenId);
        return tokenId;
    }
    function getPrivateEntities() public view returns (IPrivateEntity.PrivEntityInfo[] memory){
        return IPrivateEntity(privateAddress).getEntityList();
    }
    function registerToPrivateEntity(string memory _studentName, string memory _privateName) public returns (bool){
        if (studentExistsAtPrivate[studentAddress] || privEntityStudentId<200 || privEntityStudentId >220) {
            return false;
        }
        uint8 privId = getPrivateEntityId(_privateName);
        studentMappingAtPrivateEntity[studentAddress] = StudentData(privEntityStudentId, _studentName, 0, privId,new uint8[](0));  
        IPrivateEntity(privateAddress).setStudent(privEntityStudentId);  
        privEntityStudentId = privEntityStudentId + 1;
        studentExistsAtPrivate[studentAddress] = true;
        return true;
    }
    function getPrivateEntityId(string memory _privateName) public returns (uint8){
        uint8 _privateId;
        IPrivateEntity.PrivEntityInfo[] memory _privEntityInfo =  IPrivateEntity(privateAddress).getEntityList();
        emit Datalog(" priv list log 1", _privEntityInfo.length);
        for (uint i=0; i < _privEntityInfo.length; i++) {
            if (keccak256(abi.encodePacked((_privEntityInfo[i].privateName))) == keccak256(abi.encodePacked((_privateName)))) {                
                emit Datalog(" priv list log 2", _privEntityInfo[i].privateId);
                return _privEntityInfo[i].privateId;
            }            
        }
        return _privateId;
    }
    function getPrivateStudentId() public view returns (uint8){
        StudentData memory _studentData = studentMappingAtPrivateEntity[studentAddress];
        return _studentData.studentId;
    }
    function getPrivateEntityCourses() public view returns (IPrivateEntity.Course[] memory _courseList){
        return IPrivateEntity(privateAddress).listCoures();
    }
    function enrollAtprivateEntity(string memory _courseName, uint8 _studentId) public {
        IPrivateEntity.Course[] memory _courses = IPrivateEntity(privateAddress).listCoures();
        for (uint i=0; i < _courses.length; i++) {
            if (keccak256(abi.encodePacked((_courses[i].courseName))) == keccak256(abi.encodePacked((_courseName)))) {
                 IPrivateEntity(privateAddress).enrollCourse(_courses[i].courseId, _studentId);
                break;
            }            
        }
    }
    function generatePrivateEntityTransacript(string memory _courseName) public returns(uint8) {
        StudentData memory _studentData = studentMappingAtPrivateEntity[studentAddress];
        uint8 _courseId;
        IPrivateEntity.Course[] memory _courses = IPrivateEntity(privateAddress).listCoures();
        for (uint i=0; i < _courses.length; i++) {
            if (keccak256(abi.encodePacked((_courses[i].courseName))) == keccak256(abi.encodePacked((_courseName)))) {
                _courseId = _courses[i].courseId;
                break;
            }            
        }
        return IPrivateEntity(privateAddress).generateTransacript(studentAddress,_studentData.studentId, _studentData.studentName, _courseId);
    }
}