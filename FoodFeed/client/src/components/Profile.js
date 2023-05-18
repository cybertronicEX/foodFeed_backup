import React, { useEffect } from 'react'
import { useState } from 'react';
import  Axios from 'axios'
import "../css/Profile.css"
import { useParams } from 'react-router-dom';
import * as IoIcons5 from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {postsSchema} from '../validations/PostsValidations';

export default function Profile(props) {

  const [listOfUsers,setListOfUsers] =useState([]);
  const [listOfPosts,setListOfPosts] =useState([]);
  const {id}= useParams();
  const [owner,setOwner] = useState("");
  const [ownerid,setOwnerId] = useState("");
  const [content1,setContent1] = useState("");
  const [content2,setContent2] = useState("");
  const [content3,setContent3] = useState("");
  const [content4,setContent4] = useState("");
  const [caption,setCaption] = useState("");

  const createPost = async(event,document) => {
    event.preventDefault();
    let formdata = {
      fowner: event.target[0].value,
      fownerid: event.target[1].value,
      fcontent1: event.target[2].value,
      fcontent2: event.target[3].value,
      fcontent3: event.target[4].value,
      fcontent4: event.target[5].value,
      fcaption: event.target[6].value
    };
    const isValid = await postsSchema.isValid(formdata);
  
    if(isValid){
      Axios.post("http://localhost:8080/posts", {
        owner: owner,
        ownerid:id,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        caption: caption,
        // date: Date.now()
      }).then((response) =>{
        alert("posted Successfully!!");
        setListOfPosts([...listOfPosts, {owner,content1,content2,content3,content4,caption,}]); 
        window.location.reload();
      })
    }
    // else setError("Incorrect inputs");
    else alert("Incorrect inputs");
  };


  useEffect (()=>{
    Axios.get("http://localhost:8080/"+id).then((response)=>{
    setListOfUsers(response.data);  
    console.log(listOfUsers,"arghhhh")
    })
},[])


useEffect (()=>{
    Axios.get("http://localhost:8080/posts")
    .then((response)=>{
      const filteredPosts = response.data.filter(post => post.ownerid === id);
        setListOfPosts(filteredPosts);
    // setListOfPosts(response.data);  
    // setListOfFilteredPosts(response.data);
    console.log(listOfPosts,"possysghsbjbj")
    })
},[id])

const updatePost = (id,owner,content) => {
  const newCaption = prompt("Enter new caption: ");

  Axios.put("http://localhost:8080/posts", {
      id: id,
      owner: owner,
      content: content,
      caption: newCaption,
    }).then((response) =>{
      alert("edited Successfully!!");
      window.location.reload();
    })

};

const deletePost = (id) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this account?");
  if(shouldDelete){
  Axios.delete(`http://localhost:8080/posts/${id}`);
  alert("deleted");
  console.log("postsdelete",id)
  // window.location.reload();
  }
}


console.log(id,"sdasdas")
// console.log(name,"sdasd")
  return (
    <div className='profile_Base'>
      {/* Profile base */}
      {/* <div className='profile_details_container'> */}
      <div className='inputs'>
              <span>Make a new post!!!</span>
              <form onSubmit={createPost}>
                <input 
                  type="text" 
                  placeholder="set nickname." 
                  onChange={(event)=>{
                  setOwner(event.target.value);
                  }}
                />
                <input 
                  type="text" 
                  placeholder="pic 1"
                  onChange={(event)=>{
                    setContent1(event.target.value);
                    }}
                />
                <input 
                  type="text" 
                  placeholder="pic 2"
                  onChange={(event)=>{
                    setContent2(event.target.value);
                    }}
                />
                <input 
                  type="text" 
                  placeholder="pic 3"
                  onChange={(event)=>{
                    setContent3(event.target.value);
                    }}
                />
                <input 
                  type="text" 
                  placeholder="pic 4"
                  onChange={(event)=>{
                    setContent4(event.target.value);
                    }}
                />
                
                <input 
                type="text" 
                placeholder="caption..."
                onChange={(event)=>{
                  setCaption(event.target.value);
                  }}
                />

                <button type="submit">Add Post</button>
                
              </form>
            </div>
          { [listOfUsers].map((art)=>{
            return<div className='profile_details'> 
                    <div className='profile_details_content'>
                      <div className='name_bio'>
                        <div className='profile_name'>
                          <h2>{art.name}</h2>
                        </div>
                        <div className='bio'>
                          <h4>{art.bio}</h4>
                        </div>
                      </div>
                      <Link to={`/EditProfile/${id}`} className='editprofileicon'>< IoIcons5.IoSettingsSharp/></Link>
                      {/* <div className='profile_pic'> */}
                        <img className='profile_pic' src={art.imgurl} alt="propic"/>
                      {/* </div> */}
                    </div>
                  </div>
          })}   
        
      {/* </div> */}
{/*       
      <div className='profile_addPost'>
        <button>add</button>
      </div> */}
      <hr></hr>
      <div className='profile_posts_container'>
        {listOfPosts.map((posts)=>{
          return<div className='profile_posts' key={posts.id}>
                 <img className="profile_posts_images" src={posts.content1} alt="post"/>
                  {posts.caption}
                  <div className='postButtons'>
                              <button onClick={()=>{updatePost(posts.id,posts.owner,posts.content)}}>update</button>
                              <button onClick={()=>{deletePost(posts.id)}}>remove post</button>
                              {/* <button onClick={()=>{getDeets(posts.ownerid)}}>go to profile</button> */}
                            </div>
                </div>
        })}
      </div>
    </div>
  )
}