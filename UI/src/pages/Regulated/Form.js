import React, { useState,useRef,useEffect, useReducer } from 'react';
import Select from 'react-select';
import './Form.css';
import Web3 from 'web3';
import {regularBoardAbi, regularBoardContractAddress} from './RegularBoard';
import { collegeAbi, collegeContractAddress } from './College';

import { privateEntityAbi,privateEntityContractAddress } from './PrivateEntity';
import { studentAbi,studentContractAddress } from './Student';



const Form = (props) => {

  const [EntredTitle, setEnteredTitle] = useState("");
  const [courseID, setCourseID] = useState("");
  const [dropDownValue, setDropDownValue] = useState({});

  const [boardNameOptions,setBoardNameOption] = useState([]);
  const [courseNameOptions,setCourseNameOptions] = useState([]);
  const [courseCertiNameOptions,setCourseCertiNameOptions] = useState([]);
  const [collegeNameOptions,setCollegeNameOptions] = useState([]);

  const [privateEntityOptions,setPrivateEntityOptions] = useState([]);
  const [platformCourseoptions,setplatformCourseoptions] = useState([]);


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
  const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.requestAccounts();
const account = accounts[0];
  //const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");  
  try {
   if(props.type==='Board'){
    console.log('account',account);
      const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
       const result1 = await regularBoardcontract.methods.registerBoard(account,EntredTitle).send({from:account});
       const result8 = await regularBoardcontract.methods.registerBoard(account,EntredTitle).call({from:account});
       console.log(result8);

      

      // return boardList;
       //return boardNameOptionsData.current.push(result3.map(val => {return { label: val[1], value: val[1] }}));
     
    }
    else if(props.type==='College'){
       const collegecontract = new web3.eth.Contract(collegeAbi, collegeContractAddress);
       const result2 = await collegecontract.methods.registerCollege(account,EntredTitle,dropDownValue.course.value).send({from:account});
        console.log('college input',EntredTitle,dropDownValue.course.value);

        const result8 = await collegecontract.methods.getColleges().call({from:account});
       console.log('collegeList',result8)
      // const boardList = await regularBoardcontract.methods.getBoardList().call({from:account});
     // console.log('Retrieved board list:', boardList);
      // return boardList;
        // const collegeContract  = new web3.eth.Contract(collegeAbi, collegeContractAddress);
        //const result1 = await collegeContract.methods.registerCollege(EntredTitle).send({from:account});
      //console.log(result1);
    }
    else if(props.type ==='Course'){
      const collegecontract = new web3.eth.Contract(collegeAbi, collegeContractAddress);
      const result3 = await collegecontract.methods.addCourse(EntredTitle).send({from:account});
      console.log('course input',EntredTitle);
      console.log(result3);
      const listcourse = await collegecontract.methods.listCoures().call({from:account});
      console.log('listcourse',listcourse);
      const listcollege = await collegecontract.methods.getColleges().call({from:account});
      console.log('listcollege',listcollege);

      
    }
   else if(props.type === 'Platform'){
    const privateContract = new web3.eth.Contract(privateEntityAbi, privateEntityContractAddress);
    console.log('platform name',EntredTitle);
    const result2 = await privateContract.methods.registerPrivateEntity(account,EntredTitle).send({from:account});
      
      console.log(result2);
      

   }
   else if(props.type === 'PlatformCourse'){
    const privateEntityContract = new web3.eth.Contract(privateEntityAbi,privateEntityContractAddress);
    console.log('platform course name',EntredTitle);
      const result6 = await privateEntityContract.methods.addCourse(EntredTitle).send({from:account});
      console.log(result6);
      console.log('platform course name',EntredTitle);
  }
  else if(props.type === 'RegisterCollege'){
    //Admission in Regulated<
      
       const student = new web3.eth.Contract(studentAbi,studentContractAddress);
       const result5 = await student.methods.registerToCollege(account,EntredTitle,dropDownValue.course.value,dropDownValue.college.value).send({from:account});
       console.log(EntredTitle,dropDownValue.course.value,dropDownValue.college.value);
      
  }
  else if(props.type === 'Student'){
    //Enroll to Regulated  

     const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
     const studentId = await studentContract.methods.getCollegeStudentId().call({from:account});
     const result5 = await studentContract.methods.enrollTocourses(dropDownValue.studentCourse.value,studentId).send({from:account});
     console.log('studentId',studentId);
}
  else if(props.type === 'RegCertificate'){
        //Regulated Certificate   getting tokenId 

        const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
        const result4 = await studentContract.methods.getTransacript().call({from:account});

    const result5 = await studentContract.methods.getTransacript().send({from:account});
    console.log(result4,result5);
  }
  else if(props.type === 'PrivateReg'){
    //Register to Private
    
    const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
     const result5 = await studentContract.methods.registerToPrivateEntity(EntredTitle,dropDownValue.privateList.value).send({from:account});
     //const result6 = await studentContract.methods.registerToPrivateEntity(EntredTitle,dropDownValue.privateList.value).call({from:account});
      
     console.log(result5);
  }
  else if(props.type === 'StudentPlatform'){
     //Enroll to Private    
    const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
    const privatestudentId = await studentContract.methods.getPrivateStudentId().call({from:account}); // getting array
    console.log('privatestudentId',privatestudentId);
    const result5 = await studentContract.methods.enrollAtprivateEntity(dropDownValue.platformCOurseList.value,privatestudentId).send({from:account});
    console.log(result5);

   
  }
  else if(props.type === 'PriCertificate'){
    //Private Certificate getting right tokenID
    const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
    const result6 = await studentContract.methods.generatePrivateEntityTransacript(dropDownValue.courseCerti.value).call({from:account});
    const result5 = await studentContract.methods.generatePrivateEntityTransacript(dropDownValue.courseCerti.value).send({from:account});
    
    console.log(result6,result5);
    console.log(dropDownValue.courseCerti.value);
    
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
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];
  if(props.type === 'College'){

    const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
    const data = await regularBoardcontract.methods.getBoardList().call({from:account});
    setBoardNameOption(data.map(({boardName})=>({label:boardName,value: boardName})));
    console.log('list',data);
  }
  if(props.type=== 'RegisterCollege'){
    const regularBoardcontract = new web3.eth.Contract(regularBoardAbi, regularBoardContractAddress);
    const data = await regularBoardcontract.methods.getBoardList().call({from:account});
    setBoardNameOption(data.map(({boardName})=>({label:boardName,value: boardName})));
    const studentContract = new web3.eth.Contract(studentAbi,studentContractAddress);
    const collegeList = await studentContract.methods.getColleges().call({from:account});
    setCollegeNameOptions(collegeList.map(({collegeName})=>({label:collegeName,value: collegeName})))
  }
else if(props.type === 'Student'){
   const studentContract = new web3.eth.Contract(studentAbi,studentContractAddress);
   const courseList = await studentContract.methods.getCourses().call({from:account});
   //console.log(courseList);
   setCourseNameOptions(courseList.map(({courseName})=>({label:courseName,value: courseName})))
   // dropdown
}
else if(props.type==='PrivateReg'){
  const studentContract = new web3.eth.Contract(studentAbi,studentContractAddress);
   const privateList = await studentContract.methods.getPrivateEntities().call({from:account});
   setPrivateEntityOptions(privateList.map(({privateName})=>({label:privateName,value: privateName})));
   //drop down
}
else if(props.type==='StudentPlatform'){
  const studentContract = new web3.eth.Contract(studentAbi,studentContractAddress);
  const privatecourseList = await studentContract.methods.getPrivateEntityCourses().call({from:account});
 setplatformCourseoptions(privatecourseList.map(({courseName})=>({label:courseName,value: courseName})));
  //dropdown 
 }
 else if(props.type==='RegCertificate'){
  const studentContract  = new web3.eth.Contract(studentAbi, studentContractAddress);
  const result5 = await studentContract.methods.getTransacript().call({from:account});
  const result9 = await studentContract.methods.getTransacript().send({from:account});
  console.log(result5,result9);
 }
 else if(props.type==='PriCertificate'){
  const studentContract = new web3.eth.Contract(studentAbi,studentContractAddress);
  const privatecourseList = await studentContract.methods.getPrivateEntityCourses().call({from:account});
 setCourseCertiNameOptions(privatecourseList.map(({courseName})=>({label:courseName,value: courseName})));
  
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
  //console.log('data',props.boardNameOptions);

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
            <label>Course List</label>
            <Select  onChange={onDropDownChange({ dropDownId: 'studentCourse' })} options={courseNameOptions} />
            {/* <label>Student Id</label>
            <Select onChange={onDropDownChange({ dropDownId: 'college' })} options={[{ label: 'College1', value: 'college1' }, { label: 'College2', value: 'college2' }]} /> */}

          </div>
        }
        <div className="new-expense__control">
        {props.type !== 'Student' && props.type !== 'RegCertificate' && props.type!=='RegisterCollege' && props.type!=='PrivateReg' &&
        props.type!=='StudentPlatform' && props.type !== 'PriCertificate' &&
        <>
          <label>{`${props.type} Name`}</label>
          <input
            type="text"
            value={EntredTitle}
            onChange={titleChangeHandler}
          />
         </>
        }
        {props.type==='RegisterCollege' && <>
          <label>Student Name</label>
            <input
              type="text"
              value={EntredTitle}
              onChange={titleChangeHandler}
            />
          <div> <label>List of Board</label> <Select  onChange={onDropDownChange({ dropDownId: 'course' })} options={boardNameOptions} /></div>
          <div> <label>List of College</label> <Select  onChange={onDropDownChange({ dropDownId: 'college' })} options={collegeNameOptions} /></div>
          </>
        }
        {props.type==='PrivateReg' && <>
          <label>Student Name</label>
            <input
              type="text"
              value={EntredTitle}
              onChange={titleChangeHandler}
            />
          <div> <label>List of PrivateEntity</label> <Select  onChange={onDropDownChange({ dropDownId: 'privateList' })} options={privateEntityOptions} /></div>
          </>
        } {props.type === 'PriCertificate' &&<div> <label>List of Course</label> <Select  onChange={onDropDownChange({ dropDownId: 'courseCerti' })} options={courseCertiNameOptions} /></div>}
          {props.type === 'College' &&<div> <label>List of Board</label> <Select  onChange={onDropDownChange({ dropDownId: 'course' })} options={boardNameOptions} /></div>}
          {props.type === 'StudentPlatform' &&<div> <label>Platform Course List</label> <Select onChange={onDropDownChange({ dropDownId: 'platformCOurseList' })} options={platformCourseoptions} /></div>}
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