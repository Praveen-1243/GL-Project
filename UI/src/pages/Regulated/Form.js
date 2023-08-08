import React, { useState,useRef,useEffect, useReducer } from 'react';
import Select from 'react-select';
import './Form.css';
import Web3 from 'web3';
import {regularBoardAbi, regularBoardContractAddress} from './RegularBoard';
import { collegeAbi, collegeContractAddress } from './College';
import { organizationAbi,organizationContractAddress } from './Organization';
import { privateEntityAbi,privateEntityContractAddress } from './PrivateEntity';
import { studentAbi,studentContractAddress } from './Student';


const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.requestAccounts();
const account = accounts[0];


const Form = (props) => {

  const [EntredTitle, setEnteredTitle] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dropDownValue, setDropDownValue] = useState({});

  const [boardNameOptions,setBoardNameOption] = useState([]);


  const onDropDownChange = ({ dropDownId }) => (value) => {
    console.log({dropDownId, value});
    setDropDownValue({ ...dropDownValue, [dropDownId]: value });
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const courseChangeHandler = (event) => {
    setCourseID(event.target.value);
  };

async function init(){
  //const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");  
  try {
    if(props.type === 'Student'){
        // const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
        // const result5 = await studentContract.methods.registerToCollege("Nks").send({from:account});
        // console.log(result5);
    }
    else if(props.type==='Board'){
      const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
      // const result1 = await regularBoardcontract.methods.registerBoard(EntredTitle).send({from:account});
      // console.log(result1);

      const boardList = await regularBoardcontract.methods.getBoardList().call({from:account});
      console.log('Retrieved board list:', boardList);
      // return boardList;
       //return boardNameOptionsData.current.push(result3.map(val => {return { label: val[1], value: val[1] }}));
     
    }
    else if(props.type==='College'){
      // const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
        console.log('selectedabc',dropDownValue.course.value);
        console.log('selected',dropDownValue);

      // const boardList = await regularBoardcontract.methods.getBoardList().call({from:account});
     // console.log('Retrieved board list:', boardList);
      // return boardList;
        // const collegeContract  = new web3.eth.Contract(collegeAbi, collegeContractAddress);
        //const result1 = await collegeContract.methods.registerCollege(EntredTitle).send({from:account});
      //console.log(result1);
    }

    // return [];
  
    
  //  privateEntityContract  = new web3.eth.Contract(privateEntityAbi, privateEntityContractAddress);
  
  // organizationContract  = new web3.eth.Contract(organizationAbi, organizationContractAddress);
    
  } catch (err) {
    console.error(err);
  }
  
  
  
  
//  const result2 = await collegeContract.methods.registerCollege("NIT","CBSE").send({from:account});
//  console.log(result2);
//  const result3 = await collegeContract.methods.displayBoards().call({from:account});
//  console.log(result3);

//  const result4 = await collegeContract.methods.addCourse("CSE").send({from:account});
//  console.log(result4);
}

useEffect(() => {
 async function fetch(){
  if(props.type === 'College'){

    const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
    const data = await regularBoardcontract.methods.getBoardList().call({from:account});
    setBoardNameOption(data.map(({boardName})=>({label:boardName,value: boardName})));
  }

  
 }
 fetch();
}, []);


// const fetchBoardData = async () => {
//   try {
//     const boardData = await init(); 
//     console.log('boardData inside fetchBoardData:',boardData)
//     const formattedOptions = boardData.map(val => ({ label: val[1], value: val[1] }));
//     console.log(formattedOptions)
//     setBoardNameOption(formattedOptions);
//   } catch (error) {
//     console.error(error);
//   }
// };

  const submitHandler = async (event) => {
    event.preventDefault();
    init();
   
    setCourseID("");
    setEnteredTitle("");
    props.onClose();

  };

  const cancleHandler = () => {
    setEnteredTitle("");
    props.onClose();
  }
  console.log('data',props.boardNameOptions);

  const getFomattedBoardNameOption=()=>{
    return props.boardNameOptions.map((ele)=>{
      return {label:ele.boardName,option:ele.boardName }
    })
  }


  return (<>
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        {props.type === 'Student' &&
          <div className="new-expense__control">
            {/* <label>Course Id</label>
            <input
              type="text"
              value={courseID}
              onChange={courseChangeHandler}
            /> */}
            <label>Student Id</label>
            <Select  onChange={onDropDownChange({ dropDownId: 'board' })} options={boardNameOptions} />
            <label>Course Name</label>
            <Select onChange={onDropDownChange({ dropDownId: 'college' })} options={[{ label: 'College1', value: 'college1' }, { label: 'College2', value: 'college2' }]} />

          </div>
        }
        <div className="new-expense__control">
        {props.type !== 'Student' && props.type !== 'RegCertificate' && <>
          <label>{`${props.type} Name`}</label>
          <input
            type="text"
            value={EntredTitle}
            onChange={titleChangeHandler}
          />
         </>
        }
          {props.type === 'College' &&<div> <label>List of Board</label> <Select  onChange={onDropDownChange({ dropDownId: 'course' })} options={boardNameOptions} /></div>}
          {props.type === 'StudentPlatform' &&<div> <label>List of Platform</label> <Select onChange={onDropDownChange({ dropDownId: 'course' })} options={[{ label: 'Course1', value: 'course1' }, { label: 'Course2', value: 'course2' }]} /></div>}
        </div>
      </div>
      {props.type !== 'RegCertificate' && <div className="new-expense__actions">
        <button type="button" onClick={cancleHandler}>Cancel</button>
        <button type="submit">Add</button>
      </div>}
    </form>
  </>)
}

export default Form;