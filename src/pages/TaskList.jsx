import React, { useContext, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../components/Popup';
import TodoContext, { TodoProvider } from '../context/TodoContext';
import { dateFormat } from '../helper';

function reducer(state,action){
    switch(action.type){
        case 'view': return {type:"view", data:action.payload};
        case 'edit': return {type: "edit", data:action.payload};
        case 'delete': return {type: "delete", data:action.payload};
        default: return state;
    }
}
const init={
    type:"",
    date:""
}

function TaskList(props) {
    const {taskList} = useContext(TodoContext);
    const [state,dispatch] = useReducer(reducer,init);
    const [search,setSearch] = useState("");

    const filterTasks = taskList.filter(
        (task)=> task.title.toLowerCase().indexOf(search.toLowerCase()) >=0
    );

    const cancelTask = () =>{
        dispatch({type: 'edit', payload:""})
    }
    const handleChange =(event)=>{
        let text = event.target.value;
        setSearch(text);
    }

    return (
        <div className='container-fluid'>
            <div className='bg-primary text-white p-5'>
                <div className='d-flex'>
                <h5>Task List</h5>
                <Link className='btn btn-info ms-auto' to='/create-task'>Create Task</Link>
                </div>
                <input type="text" className='form-control w-25 ms-auto my-3' onChange={handleChange} placeholder="Search"/>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterTasks.map((item)=>{
                                return(
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{dateFormat(item.duedate)}</td>
                                        <td>
                                        <span className='px-2'data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"view", payload:item})}}><i class="fa-solid fa-eye"></i></span>
                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"delete",payload:item.id})}}><i class="fa-solid fa-trash-can"></i></span>
                                        <span className='px-2' data-bs-toggle="modal" data-bs-target="#task-modal" onClick={()=>{dispatch({type:"edit", payload:item})}}><i class="fa-solid fa-pen-to-square"></i></span></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Popup type={state.type} data={state.data} cancelTask={cancelTask}/>
        </div>
    );
}

export default TaskList;