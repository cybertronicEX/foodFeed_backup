import React from 'react'
import { useParams  } from 'react-router-dom';
import "../css/EditProfile.css"
import { useState,useEffect } from 'react';
import  Axios  from 'axios';
import {useNavigate} from 'react-router-dom'
function EditProfile(props) {
  const {id}=useParams();
  const [listOfUsers,setListOfUsers] = useState([]);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [bio,setBio]=useState("");
  const [imgurl,setImgurl]=useState("");
  const [password,setPassword]=useState("");
  const naviagate = useNavigate();
  
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [images, setImages] = useState([]);


  console.log(id,"edit");

  useEffect (()=>{
    Axios.get("http://localhost:8080/"+id).then((response)=>{
    setListOfUsers(response.data);  
    console.log(listOfUsers,"arghhhh")
    })
},[]);
  // const deleteAcc = async (id) => {
  //   alert(id);
  //   Axios.delete("http://localhost:8080/"+id)
  //     .then((response) => {
  //       alert("deleted")
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }
  
  // const fileSelectedHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  

  // const uploadHandler = () => {
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   Axios.post("http://localhost:8080/images", formData).then((response) => {
  //     setImages([...images, response.data]);
  //   });
  // };

  
  const deleteAcc = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this account?");
    if(shouldDelete){
    console.log(id, "delete ");
    Axios.delete(`http://localhost:8080/${id}`)
      .then((response) => { alert("deleted") })
      .catch((e) => { console.error(e) });
    naviagate('/');
    }
  };

  const editAcc =(event,id)=>{
    event.preventDefault();
    const shouldUpdate = window.confirm("Are you sure you want to update this account?");
    if(shouldUpdate){

      if (!name || !email || !password || !bio || !imgurl) {
        alert("Please fill in all required fields");
        return;
      }
    
      // Add validation for email format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }
      Axios.put("http://localhost:8080/", {
        id:id,
        name: name,
        email: email,
        password: password,
        bio:  bio,
        imgurl:  imgurl,
      })
        .then((response) => {
          alert('updated');
        })
        .catch((e) => {
          console.error(e);
        });

        naviagate('/');
      }
 }

  return (
    <div className='editprofile'>
      Edit Profile
      <form className='editform'>
        <input className='editInput' onChange={(e)=>{setName(e.target.value)}} type="text"  value={name} placeholder="name"/>
        <input className='editInput' onChange={(e)=>{setEmail(e.target.value)}} type="text" value={email}  placeholder="email"/>
        <input className='editInput' onChange={(e)=>{setPassword(e.target.value)}} type="text"  value={password} placeholder="password"/>
        <input className='editInput' onChange={(e)=>{setBio(e.target.value)}} type="text"  value={bio} placeholder="bio"/>
        <input className='editInput' onChange={(e)=>{setImgurl(e.target.value)}} type="text"  value={imgurl} placeholder="image url"/>
        <button className='editInputbutton' onClick={(event)=>{editAcc(event,id)}}>update</button>
        {/* <button onClick={(event)=>{editAcc(event,id)}}>pls work</button> */}
   
        {/* <button onClick={handleDelete}>Delete User</button> */}
      </form>
      {[listOfUsers].map((bla)=>{return<div key={bla.id}>
        <button className='deleteInputbutton' onClick={()=>deleteAcc(bla.id)}> Delete profile</button></div>})}
     {/* <div>
        <input type="file" onChange={fileSelectedHandler} />
        <button onClick={uploadHandler}>Upload</button>
      </div> */}
        

    </div>
    
  ) 
}

export default EditProfile;