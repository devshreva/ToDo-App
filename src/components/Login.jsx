import React, { useContext, useEffect, useRef } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TodoContext from '../context/TodoContext';


function Login(props) {

  const[formData,setFromData] = useState({
    user:"",
    password:""
  });
  const inputField = useRef(null);
  const {message, onLogin, setMessage} = useContext(TodoContext);

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

  const onSubmit =async(e)=>{
    e.preventDefault();
    if(isValid()){
      onLogin(formData);
  }

  else{
      const currValue = inputField.current.value;
      if(!currValue){
      Object.keys(dirty).forEach((abc) => dirty[abc] = true)
  }
      setMessage(<div className="text-danger">Please resolve errors in the form</div>)
      }
    
  }

  //Validation Dirty means (when mouse on the box its means dirty) and presstege
  const [error,setError] = useState({
    email:[],
    password:[]
  })

  const [dirty,setDirty] = useState({
    email:false,
    password:false
  })

  const validate =()=>{
    let errorData={};
    //create property for each field to store its error in an array
    errorData.email=[];
    errorData.password=[];

    //Error Conditions
    //if Email is blank
    if(!formData.email){
      errorData.email.push("Please Provide Email");
    }
    let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        if(formData.email){
            if(!emailreg.test(formData.email)){
                errorData.email.push("Please enter valid email")
         }
      }
      if(!formData.password){
        errorData.password.push("Please Provide Password");
      }
      setError(errorData);
  };

  useEffect(validate,[formData]);

  let isValid = ()=>{
    let valid = true;
    for(let control in error){
        if(error[control].length>0){
            valid = false;
        }
    }
   return valid;
 }

 const onblurHandle=(event)=>{
  const {name} = event.target;
  setDirty((dirty)=>({
      ...dirty,
      [name]: true
  }))
  validate();
  }

    return (
        <form className='p-3 m-3'>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label"><b>Email address</b></label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={changeInput} onBlur={onblurHandle} ref={inputField}/>
    <div className="text-danger">{dirty["email"]&&error["email"][0]?error["email"]:""}</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"><b>Password</b></label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={changeInput} onBlur={onblurHandle} ref={inputField}/>
    <div className="text-danger">{dirty["password"]&&error["password"][0]?error["password"]:""}</div>
  </div>
  <p>{message}</p>
  <button type="submit" className="btn btn-primary w-50" onClick={onSubmit}>Login</button>
</form>
    );
}

export default Login;