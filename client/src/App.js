import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState
    (false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
          setTasks(tasksFromServer)
      } 
      getTasks()
  }, [])
//http://localhost:5000/tasks/
 //fetch tasks
 const fetchTasks = async() => {
  const res = await fetch('/api/tasks/')
  const data = await res.json()
    return data
}
 //fetch task
 const fetchTask = async(id) => {
	 console.log("fetching task: " + id);
  const res = await fetch(`/api/tasks/${id}`)
  const data = await res.json()
    return data
}

  //Add Task
    const addTask = async (task) => {
	    console.log(task);
        const res = await fetch('/api/tasks/', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              }, 
              body: JSON.stringify(task)
        
        })
        const data = await res.json()
        console.log(data);
	console.log(data._id);
        setTasks([...tasks, data])
	//const id = some number
     // const newTask = {id, ...task}
     // setTasks([...tasks, newTask])
    }  
  
  //delete task
  const deleteTask = async (id) => {
//	  console.log("this is the id passed to delete task "+ id);
       await fetch(`/api/tasks/${id}`, {
           method: 'DELETE',
         
       })
      setTasks(tasks.filter((task) => task._id !==
      id))
  }
  
  //toggle reminder
  const toggleReminder = async (id) => {
	 // console.log("this is the id passed to toggle reminder " + id);
      const taskToToggle = await fetchTask(id)
	 // console.log(taskToToggle.reminder)
      const updTask = {...taskToToggle,
          reminder: !taskToToggle.reminder}
	 // console.log(updTask.reminder);
	 // console.log(updTask);

      const res = await fetch(`/api/tasks/${id}`, {
        method:'PUT',
        headers: {
         'Content-type':'application/json'
        },
	      body: JSON.stringify(updTask)
      })

	      console.log(updTask);
	  console.log(res);
      const data = await fetchTask(id);
//	  console.log(data);
      setTasks(tasks.map((task) => task._id === id 
      ? {...task, reminder: data.reminder } : task ))
  }
    

  
  return (
    <Router>
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
                showAdd={showAddTask}/>
        <Route path='/' exact render={(props) =>(
            <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? 
                (<Tasks tasks={tasks} 
                        onDelete={deleteTask}   
                           onToggle={toggleReminder} 
                />) : ('NO TASKS')}

            </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
    </div>
    </Router>
  );
}

export default App;
