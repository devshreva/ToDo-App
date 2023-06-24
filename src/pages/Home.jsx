import React from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import illustration from '../assets/Group 23.png';

function Home(props) {
    return (
        <div className='container-fluid h-100'>
        <div className="row h-100">
            <div className="col-lg-6 h-100 d-flex justify-content-center align-items-center bg-primary flex-column">
                <h1 className='display-4 text-uppercase text-danger'>An App to <br/>make your life<br/><span className='display-1'>easy</span></h1>
                <img className='img-fluid' src={illustration}/>
            </div>
            <div className="col-lg-6 h-100 d-flex flex-column align-items-center justify-content-center bg-danger">
                <div className="card w-75 h-75 border-rounded ">
                    <div className='card-header bg-white border-0 btn'>
                        <NavLink to="/Login" style={({isActive})=>{
                            return{color:isActive?'red':'black'};
                        }} className='btn w-50'>Login</NavLink>
                        <NavLink to="/Register" style={({isActive})=>{
                            return{color:isActive?'red':'black'};
                        }} className='btn w-50 '>Register</NavLink>
                    </div>
                    <div className="card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

// API provide endpoint for CRUD operations. Application Programming Interface
// e.g 'Get' - http//exmaple.com/user, get methored will get all the users from the database.

// e.g 'Get' - http//exmaple.com/user/1 - post,put,Patch,Delete

//Payment Gateways

export default Home;