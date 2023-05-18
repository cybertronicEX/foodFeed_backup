import React, { useState } from 'react'
import "../css/AddProfile.css"
import Axios from 'axios';
function AddProfile() {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const addingposts = async(event)=>{
    event.preventDefault();
    Axios.post("http://localhost:8080/",{
        name :event.target[0].value,
        email :event.target[1].value,
        password :event.target[2].value,
             }).then((response)=>{
            alert("added");
        })
        console.log({name:name, email:email, password:password})

    }
  return (
    <div className='registration'>
      <div className='reg_title' >register form</div>
      <form className='reg_form' onSubmit={addingposts}>
        <input type ="text"
        placeholder='enter username'
        className='reg_input'
        onChange={(event)=>{setName(event.target.value);}}
        />
        
        <input type ="email"
        placeholder=' email'
        className='reg_input'
        onChange={(event)=>{setEmail(event.target.value);}}
        />
        
        <input type ="password"
        placeholder=' password'
        className='reg_input'
        onChange={(event)=>{setPassword(event.target.value);}}/>

        <button className='reg_button' type="submit">submit</button>
        <div className='reg_oauth'>
          oauth2 registration
        </div>
      </form>
      
    </div>


  )
}

export default AddProfile;