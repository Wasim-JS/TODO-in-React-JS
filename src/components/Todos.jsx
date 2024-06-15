/* eslint-disable react/prop-types */

const Todos = ({id,task,isComplete,handleCheck,handleEdit,handleDelete}) => {
  return (
    <div className="todos">
         <div className="left">
            <input type="checkbox" onChange={()=>handleCheck(id)} checked={isComplete} name="" id="" />
            <div className={`${isComplete?"task-complete":""} task-data`}>
             {task}
            </div>
         </div>
         <div className="right">
             <button onClick={()=>handleEdit(id,task)}>Edit</button>
             <button onClick={()=>handleDelete(id)}>Delete</button>
         </div>
    </div>
  )
}

export default Todos