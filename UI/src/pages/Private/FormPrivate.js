import React,{useState} from 'react';
import './Form.css';

const Form =(props)=>{

    const [EntredTitle, setEnteredTitle] = useState("");
    const [courseID,setCourseID] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
      };

      const courseChangeHandler = (event) => {
        setCourseID(event.target.value);
      };

      
     async function tokencheck(tokenId){
///// implementation for check
     }
    

      const submitHandler = (event) => {
        event.preventDefault();
        console.log(EntredTitle);
        /// Add check button handler
          tokencheck(EntredTitle);
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
        {props.type === 'Student' && 
             <div className="new-expense__control">
             <label>Course Id</label>
             <input
               type="text"
               value={courseID}
               onChange={courseChangeHandler}
             />
           </div>
        }
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