import React from 'react'
import { useState , useEffect } from 'react';
import  Axios  from 'axios';
import { Link } from 'react-router-dom'
import {useNavigate, useParams} from "react-router-dom";
import {postsSchema} from '../validations/PostsValidations';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import "../css/Home.css";
import { useLocation } from 'react-router-dom';





export default function Home (){

  // const [listOfUsers,setListOfUsers] =useState([]);
  const [listOfPosts,setListOfPosts] =useState([]);
  const [listOfFilteredPosts,setListOfFilteredPosts] =useState([]);
  const [name,setName] = useState("");
  const [likesnum,setLikesNum] = useState(0);
  const [owner,setOwner] = useState("");
  const [content1,setContent1] = useState("");
  const [content2,setContent2] = useState("");
  const [content3,setContent3] = useState("");
  const [content4,setContent4] = useState("");

  const [caption,setCaption] = useState("");
  const [details,setDetails] = useState("");
  const [ownerid,setOwnerid] = useState("");
  let {username} = useParams();
  const [error,setError] = useState("");

  let navigate = useNavigate();
  const navProfile = (ownerid) => navigate(`profile/${ownerid}`);


  useEffect (()=>{
    Axios.get("http://localhost:8080/posts").then((response)=>{
    setListOfPosts(response.data);  
    setListOfFilteredPosts(response.data);
    })
},[])
const location = useLocation();

useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get('message');
  if (message) {
    setTimeout(() => {
      alert(message);
    }, 0);
  }
}, [location]);

// const updatePost = (id,owner,content) => {
//   const newCaption = prompt("Enter new caption: ");

//   Axios.put("http://localhost:8080/posts", {
//       id: id,
//       owner: owner,
//       content: content,
//       caption: newCaption,
//     }).then((response) =>{
//       alert("edited Successfully!!");
//       window.location.reload();
//     })

// };

// const deletePost = (id) => {
//   Axios.delete(`http://localhost:8080/posts/${id}`);
//   window.location.reload();
// }


// const getDeets = (ownerid) => {
//   Axios.get(`http://localhost:8080/${ownerid}`).then((response)=>{ 
//     setDetails(response.data);  
//     alert(response.data.name);
//     alert(ownerid);

//     // console.log(response.data.name);
//     })
// }



const createPost = async(event,document) => {
  event.preventDefault();
  let formdata = {
    fowner: event.target[0].value,
    fcontent1: event.target[1].value,
    fcontent2: event.target[2].value,
    fcontent3: event.target[3].value,
    fcontent4: event.target[4].value,
    fcaption: event.target[5].value
  };
  const isValid = await postsSchema.isValid(formdata);

  if(isValid){
    Axios.post("http://localhost:8080/posts", {
      owner: owner,
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

// const search = (query) => {
//   let filtered = listOfPosts.filter(ap => {
//     if (query === '') {
//       return ap;
//    } else if (ap.name.toLowerCase().includes(query.toLowerCase())) {  
//       return ap;
//    }
//    })
//   setListOfFilteredPosts(filtered);
//   console.log(query);
// }
  return (<div>
    <div className="sesh">
       </div>
  <div className='pagenav'>
   
     
  </div>

    <div className="PmsApp">
        
        <div className="userDisplay">
          
            
            
            <div className='ExtraFeatures'>
            

            </div>

            <div className='DBdisplay'>


                <div>For you page</div>
                {/* {message && <div>{message}</div>} */}
                <div className='media-scroller'>
                  
                    {listOfFilteredPosts.map((posts)=>{
                      return(  
                          <div className='media-element'>
                            {/* <li>{posts.content}</li> */}
                            {/* <li>{posts.id}</li> */}
                             <div className='slider'>
                              <Slider>
                                  <img  className='m1' src={posts.content1} alt="image1_nonexist"/>
                                  <img  className='m2' src={posts.content2} alt="image2_nonexist"/>
                                  <img  className='m3' src={posts.content3} alt="image3_nonexist"/>
                                  <img  className='m4' src={posts.content4} alt="image4_nonexist"/>
                                  
                              </Slider>    
                             </div>

                            {/* <div>{posts.owner}</div> */}
                            {/* <div>{getName(posts.id)}</div> */}

                            <a className="HomePost_ProfileNav" onClick={()=>{navProfile(posts.ownerid)}}>{posts.owner}</a>
                            <div className='postCaption'>{posts.caption}</div>

                            {/* <div className='postButtons'>
                              <button onClick={()=>{updatePost(posts.id,posts.owner,posts.content)}}>update</button>
                              <button onClick={()=>{deletePost(posts.id)}}>remove post</button>
                              <button onClick={()=>{getDeets(posts.ownerid)}}>go to profile</button>
                            </div> */}
                          </div>
                        );
                      })}
                  
                </div>
             </div>
        
        </div>
    </div>
  </div>
  )
}
