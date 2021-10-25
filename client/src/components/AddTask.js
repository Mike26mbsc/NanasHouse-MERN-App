import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [details, setDetails] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

      if(!text){
      alert('Please add a task')
        return
    }

      onAdd({ text, day,details, reminder  })

      setText('')
      setDay('')
      setDetails('')
      setReminder(false)
  }

  return(
    <form className='add-form' onSubmit={ onSubmit }>
      <div className='form-control'>
        <label>Name</label>
        <input type='text' placeholder='Add Recipe Name'
            value={text} onChange={(e) =>
          setText(e.target.value)}
        />
      </div>  
      <div className='form-control'>
        <label>Category</label>
        <input type='text' placeholder='Add Category'
             value={day} onChange={(e) =>
          setDay(e.target.value)}
        />
      </div>  
      <div className='form-control'>
        <label>Details</label>
        <textarea placeholder='Add Details Here'
             value={details} onChange={(e) =>
          setDetails(e.target.value)}
      > </textarea>
      </div>  
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox' checked={reminder} value={reminder} 
         onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>  
        <input type='submit' value='Save Task'
        className='btn btn-block'/>
    </form>
    )
}
export default AddTask
