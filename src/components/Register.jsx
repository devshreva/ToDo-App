import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoContext from '../context/TodoContext';

function Register(props) {

  // This format for the Add data in the Data
  // This formate work in every Login and Register form
  const[formData,setFromData] = useState();

  const {message, onRegister, setMessage} = useContext(TodoContext);

  useEffect(()=>{
    setMessage("");
  },[])
  
  const changeInput=(event)=>{
    const {name,value} = event.target;
    setFromData((prev)=>({
      ...prev,
      [name]: value
    }))
  }
  //Common Feature to use with API
  const onSubmit=async(event)=>{
    event.preventDefault();
    onRegister(formData);
    
    }
    

    return (
             <form className='p-3 m-3'>
             <div className="mb-3">
    <label for="name" className="form-label"><b>Name</b></label>
    <input type="text" className="form-control" id="name" aria-describedby="name" name="name" onChange={changeInput}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label"><b>Email Address</b></label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"onChange={changeInput}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"><b>Password</b></label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={changeInput}/>
  </div>
  <p>{message}</p>
  <button type="register" className="btn btn-primary w-50" onClick={onSubmit}>Register</button>
</form>
    );
}

export default Register;