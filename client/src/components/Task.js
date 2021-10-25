import { useState } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle}) => {
  const  [a, setA] = useState(true);
  return(
      <div className=
            { `task ${ task.reminder ? 'reminder' : '' }` } 
          onDoubleClick=
            { () => onToggle(task._id) }>
        <h3>{ task.text } 
          <div>
            <FaTimes 
              style={{ color: 'red', cursor:'pointer'}} 
              onClick={() => onDelete(task._id)} 
            />&nbsp;&nbsp;
             <FaPlus onClick={()=>setA(!a)}/> 
          </div>
        </h3>
        <p>{task.day}</p>
        <p  style={ a ?  {display:'none'} : {display:'block'} }  >{task.details}</p>
    </div>

  ) 
}
export default Task
