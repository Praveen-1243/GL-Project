import React, { useState } from 'react';
import Select from 'react-select';
import './Form.css';
import Web3 from 'web3';
import { useEffect } from 'react';

//import configration from abi file.json

const Form = (props) => {

  const [EntredTitle, setEnteredTitle] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dropDownValue, setDropDownValue] = useState({});

  const onDropDownChange = ({ dropDownId }) => (value) => {
    console.log({dropDownId, value});
    setDropDownValue({ ...dropDownValue, [dropDownId]: value?.value });
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const courseChangeHandler = (event) => {
    setCourseID(event.target.value);
  };

async function init(EntredTitle){
  console.log('called');
  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "_boardId",
          "type": "uint8"
        }
      ],
      "name": "Register",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "boardList",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "boardId",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "boardName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "boardOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBoardList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint8",
              "name": "boardId",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "boardName",
              "type": "string"
            }
          ],
          "internalType": "struct RegularBoardContract.BoardInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCollegeList",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "_collegeList",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_boardAddress",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "_boardId",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_boardname",
          "type": "string"
        }
      ],
      "name": "registerBoard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "_collegeId",
          "type": "uint8"
        }
      ],
      "name": "setCollege",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  const contractAddress="0x245bF613070f57BDb8E3A5F5f4bc4F84876C81D6";
  //const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
   
  const web3 = new Web3(window.ethereum);
   const accounts = await web3.eth.requestAccounts();
   const account = accounts[0];
   console.log(account);
  // const networkID = await web3.eth.net.getId();
  let contract;
  try {
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log('cont',contract);
  } catch (err) {
    console.error(err);
  }
  
  
  const result1 = await contract.methods.registerBoard(account,2,EntredTitle).call({from:account});
 console.log(result1);

//  contract.events.on('Register',(success)=>{
//   console.log(success);
//  });

  const result = await contract.methods.getBoardList().send({from:account});
  console.log(result); 
}



  const submitHandler = (event) => {
    event.preventDefault();
    if (props.type === 'Student') {
      console.log("enroll as student to course")
      const expenseData = {
        title: EntredTitle,
        courseId: courseID,
      };
      const registeredCollegeData = {
        courseId: courseID,
        collegeName: dropDownValue?.college,
        boardName: dropDownValue?.board,
        studentName: EntredTitle,
      }
      console.log(registeredCollegeData, dropDownValue);


    }
    else if (props.type === 'Board') {
      console.log("Register board");
      const boardData = {
        boardName:EntredTitle,
      };
      init(EntredTitle);
      console.log(boardData.boardName);
      
    }
    else if (props.type === 'College') {
      console.log("Register college");
      const collegeData = {
        collegeName: EntredTitle,
        courseName: dropDownValue?.course,
      }
      console.log(collegeData);

    }
    else if (props.type === 'Course') {
      console.log("Register a Course as college");
      const courseData = {
        courseName:EntredTitle,
      };
      console.log(courseData.courseName);
    }
    else if (props.type === 'RegisterCollege') {
      console.log("Take admission in College");
      console.log(EntredTitle);
    }
    else if (props.type === 'Platform') {
      console.log("register platform");
      console.log(EntredTitle);
    }
    else if (props.type === 'CoursePlatform') {
      console.log("create paltform course");
      console.log(EntredTitle);
    }
    else if (props.type === 'StudentPlatform') {
      console.log("enroll as student to course in platform")
      const expenseData = {
        title: EntredTitle,
        courseId: courseID,
      };
      const registeredCollegeData = {
        courseId: courseID,
        collegeName: dropDownValue?.college,
        boardName: dropDownValue?.board,
        studentName: EntredTitle,
      }
      console.log(registeredCollegeData, dropDownValue);


    }
    else {
      const expenseData = {
        title: EntredTitle,
      };

    }
    setCourseID("");
    setEnteredTitle("");
    props.onClose();

  };

  const cancleHandler = () => {
    setEnteredTitle("");
    props.onClose();
  }

  return (<>
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        {props.type === 'Student' &&
          <div className="new-expense__control">
            <label>Course Id</label>
            <input
              type="text"
              value={courseID}
              onChange={courseChangeHandler}
            />
            <label>List of Board</label>
            <Select onChange={onDropDownChange({ dropDownId: 'board' })} options={[{ label: 'Board1', value: 'board1' }, { label: 'Board2', value: 'board2' }]} />
            <label>List of College</label>
            <Select onChange={onDropDownChange({ dropDownId: 'college' })} options={[{ label: 'College1', value: 'college1' }, { label: 'College2', value: 'college2' }]} />

          </div>
        }
        <div className="new-expense__control">
          <label>{`${props.type} Name`}</label>
          <input
            type="text"
            value={EntredTitle}
            onChange={titleChangeHandler}
          />
          {props.type === 'College' &&<div> <label>List of Board</label> <Select value={dropDownValue['course']} onChange={onDropDownChange({ dropDownId: 'course' })} options={[{ label: 'Course1', value: 'course1' }, { label: 'Course2', value: 'course2' }]} /></div>}
          {props.type === 'StudentPlatform' &&<div> <label>List of Platform</label> <Select value={dropDownValue['course']} onChange={onDropDownChange({ dropDownId: 'course' })} options={[{ label: 'Course1', value: 'course1' }, { label: 'Course2', value: 'course2' }]} /></div>}
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={cancleHandler}>Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  </>)
}

export default Form;