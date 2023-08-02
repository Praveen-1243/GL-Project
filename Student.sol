// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "College.sol";

contract StudentContract {

    CollegeContract public _collegeContract;
    
    struct StudentData {
        uint8 studentId;
        string studentName;
        uint8[] coursesList;
    }
    mapping (address => StudentData) studentMapping;
    function registerToCollege(address _address, uint8 _studentId, string memory _studentName) public {
        studentMapping[_address] = StudentData(_studentId, _studentName, new uint8[](0));
        _collegeContract.setStudent(_studentId);
    }
    function getCourses() public {

    }
    function enrollTocourses() public {

    }
    function getTransacript() public {

    }
    function validateTranscript() public {

    }


}