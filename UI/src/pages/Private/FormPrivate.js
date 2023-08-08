import React,{useEffect, useState} from 'react';
import './Form.css';
import Web3 from 'web3';
import { organizationAbi,organizationContractAddress } from '../Regulated/Organization';



const Form =(props)=>{

    const [EntredTitle, setEnteredTitle] = useState("");
    const [tokenResult,setTokenResult] = useState({});


    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
      };

      

      async function tokencheck(){
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        const organisationContract = new web3.eth.Contract(organizationAbi,organizationContractAddress);
        const result2 = await organisationContract.methods.validateTransacript(EntredTitle).call({form:account});
        console.log('check certi',result2);
        setTokenResult(result2);
       }

     useEffect(()=>{

      if(Object.keys(tokenResult).length!==0){
        props.valResult(tokenResult);
      }

       
     },[tokenResult])



      const submitHandler = async (event) => {
        event.preventDefault();
        
        tokencheck();
        setEnteredTitle("");
      };

      const cancleHandler =()=>{
        setEnteredTitle("");
        
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