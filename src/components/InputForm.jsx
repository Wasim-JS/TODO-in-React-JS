import { useEffect, useState } from 'react'
import Todos from './Todos'

const InputForm = () => {
    const [formData,setFromData] = useState("")
    const [todos,setTodos] = useState(()=>{
        let todosData = localStorage.getItem('todos')
        return todosData.length>0?JSON.parse(todosData) : []
    })
    const [editId,setEditId] = useState("")

    useEffect(()=>{
          localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    const handleCheck = (id) =>{

        setTodos(p=>{
            return p.map(data=>{
                 if(data.id === id)
                 {
                    return {...data,isComplete:!data.isComplete}
                 }
                 return data
            })
        })

    }

    const handleEdit = (id,data) =>{
        setEditId(id)
        setFromData(data)

    }
    const handleUpdate = (e) =>{
        e.preventDefault()
        setTodos(p=>{
            return p.map(data=>{
                 if(data.id === editId)
                 {
                    return {...data,task:formData}
                 }
                 return data
            })
        })

        setFromData('')
        setEditId('')
    }

    const handleDelete = id => setTodos(p=> p.filter(data=>data.id !== id))

    const handleSubmit = (e) =>{
       e.preventDefault()
       if(!formData.trim()) return alert('Write a Task')

       let ob = {
        id:crypto.randomUUID(),
        task:formData,
        isComplete:false
       }

       setTodos(p=>[...p,ob])
       setFromData("")
    }

    
    let progressData = todos.length>0? Math.trunc((todos.filter(data=>data.isComplete).length/todos.length)*100) :0
    progressData = Math.floor(progressData)
  return (
    <>
   <form className='data-form' onSubmit={handleSubmit}>
         <input type="text" value={formData} placeholder='Add Your Tasks Here...'
         onChange={(e)=>setFromData(e.target.value)}
         />
         {
            editId? <button type="submit" onClick={handleUpdate}>Update Task</button> : <button type="submit">Add</button>
         }
   </form>
    
   
   <div className='range'>
    {
        todos.length>0?(<label htmlFor="">{progressData}% Completed</label>):("No Tasks Yet..")
    }
    
   <progress
    style={{accentColor:`${progressData<40?"red":(progressData>40 && progressData<65)?"yellow":"green"}`}}
    id="" max="100" value={progressData}></progress>
   </div>

   <div className="todos-data">
    {
        todos.map(data=> <Todos  key={data.id} handleCheck={handleCheck}  handleEdit={handleEdit} handleDelete={handleDelete} {...data}/>)
    }
   
   </div>
    </>
  )
}

export default InputForm