import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)
  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const save = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setFinished(!finished)
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    save()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    save()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    save()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  return (


    <>
      <Navbar />
      <div className="containor mx-auto my-5 rounded-xl p-5 bg-violet-100 w-3/4">
        <h1 className='my-5 font-bold text-2xl flex justify-center'>iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold mx-5">Add Todo</h2>
          <div className="flex gap-5 items-center justify-center">
            <input onChange={handleChange} value={todo} type="text" className='w-4/5 h-8 rounded-full' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-500 hover:bg-violet-700 my-4 py-2 px-4 rounded-md font-bold'>Save</button>

          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkBox" checked={finished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <h2 className='text-xl font-bold text-black'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item => {

            return (finished || !item.isCompleted) && (<div className="todo flex justify-between my-3" key={item.id}>
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex gap-3">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-red-600 hover:bg-red-800 rounded-md py-1 px-4'><MdEditSquare /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-red-600 hover:bg-red-800 rounded-md py-1 px-4'><MdDelete /></button>
              </div>
            </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
}

export default App
