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


      const submitHandler = (event) => {
        event.preventDefault();
        if(props.type === 'Student'){
          console.log("enroll as student to course")
            const expenseData = {
                title: EntredTitle,
                courseId: courseID,
              };

            
        }
        else if(props.type === 'Board'){
          console.log("Register board");
        }
        else if(props.type === 'College'){
          console.log("Register college");
        }
        else if(props.type === 'Course'){
          console.log("Register a Course as college");
        }
        else if(props.type === 'RegisterCollege'){
          console.log("Take admission in College");
        }
        else{
            const expenseData = {
                title: EntredTitle,
              };
            
        }
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
        <button type="submit">Add</button>
      </div>
    </form>
    </>)
}

export default Form;