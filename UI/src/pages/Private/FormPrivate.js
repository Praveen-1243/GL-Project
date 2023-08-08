import React,{useState} from 'react';
import './Form.css';
import Web3 from 'web3';
import { organizationAbi,organizationContractAddress } from '../Regulated/Organization';

const web3 = new Web3(window.ethereum);
const accounts = await web3.eth.requestAccounts();
const account = accounts[0];

const Form =(props)=>{

    const [EntredTitle, setEnteredTitle] = useState("");
    const [courseID,setCourseID] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
      };

      const courseChangeHandler = (event) => {
        setCourseID(event.target.value);
      };

      
     async function tokencheck(){
      const organisationContract = new web3.eth.Contract(organizationAbi,organizationContractAddress);
      const result2 = await organisationContract.methods.validateTransacript(EntredTitle).call({form:account});
      console.log('check certi',result2);
     }
    

      const submitHandler = (event) => {
        event.preventDefault();
        console.log(EntredTitle);
         tokencheck();
        setCourseID("");
        setEnteredTitle("");
        props.onClose();
      
      };

      const cancleHandler =()=>{
        setEnteredTitle("");
        props.onClose();
      }

    return (<>
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>{`${props.type} Name`}</label>
          <input
            type="text"
            value={EntredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        </div>
        <div className="new-expense__actions">
       <button type="button" onClick={cancleHandler}>Cancel</button>
        <button type="submit">Check</button>
      </div>
    </form>
    </>)
}

export default Form;