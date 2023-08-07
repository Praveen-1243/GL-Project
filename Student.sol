// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "College.sol";
import "PrivateEntity.sol";

contract StudentContract {

    address studentAddress;
    address collegeAddress;
    address privateAddress;
    uint8 private studentId;
    constructor(address _studentaddress, address _collegeAdress, address _privAddress) {
        studentAddress = _studentaddress;
        collegeAddress = _collegeAdress;
        privateAddress = _privAddress;
        studentId = 31;

    }    
    struct StudentData {
        uint8 studentId;
        string studentName;
        uint8[] coursesList;
    }
    mapping (address => StudentData) studentMapping;
    mapping (address => StudentData) studentMappingAtPrivateEntity;
    mapping (address=>bool) studentExists;
    mapping (address=>bool) studentExistsAtPrivate;
    mapping (address => uint8[]) studentTokens;

    function registerToCollege(string memory _studentName) public returns (bool){
        if (studentExists[studentAddress] &&(studentId<31 || studentId>100)) {
            return false;
        }
        studentMapping[studentAddress] = StudentData(studentId, _studentName, new uint8[](0));        
        ICollegeContract(collegeAddress).setStudent(studentId);
        studentId = studentId+1;
        studentExists[studentAddress] = true;
        return true;
    }
    function getColleges() public view returns (ICollegeContract.CollegeInfo[] memory) {
        return ICollegeContract(collegeAddress).getColleges();
    }
    function getCourses() public view returns(ICollegeContract.Course[] memory){
        return ICollegeContract(collegeAddress).listCoures();
    }
    function enrollTocourses(uint8 _courseId, uint8 _studentId) public returns (bool) {
        return ICollegeContract(collegeAddress).enrollCourse(_courseId, _studentId);
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
    function registerToPrivateEntity(uint8 _studentId, string memory _studentName) public returns (bool){
        if (studentExistsAtPrivate[studentAddress]) {
            return false;
        }
        studentMappingAtPrivateEntity[studentAddress] = StudentData(_studentId, _studentName, new uint8[](0));  
        IPrivateEntity(privateAddress).setStudent(_studentId);  
        studentExistsAtPrivate[studentAddress] = true;
        return true;
    }
    function getPrivateEntityCourses() public view returns (IPrivateEntity.Course[] memory _courseList){
        return IPrivateEntity(privateAddress).listCoures();
    }
    function enrollAtprivateEntity(uint8 _courseId, uint8 _studentId) public returns(bool){
        return IPrivateEntity(privateAddress).enrollCourse(_courseId, _studentId);
    }
    function generatePrivateEntityTransacript(address _to, uint8 _studentId, string memory _studentName, uint8 courseId) public returns(uint8) {
        return IPrivateEntity(privateAddress).generateTransacript(_to, _studentId, _studentName, courseId);
    }
}