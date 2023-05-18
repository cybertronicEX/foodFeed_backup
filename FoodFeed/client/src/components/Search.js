import { useEffect, useState } from "react";
import React from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import  "../css/Search.css"
import * as IoIcons5 from 'react-icons/io5';
function Search() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    
    // const { id } = useParams();
    useEffect(() => {
        Axios.get("http://localhost:8080/").then((response) => {
          setListOfUsers(response.data);
        });
      }, []);

      const handleSearchInput = (e) => {
        // const searchoutput = e.target.value;
        setSearchInput(e.target.value);
        // if (searchoutput==='') {
        //     setListOfUsers([]);
        //     return ;
        //   }
      };
      
      
    
      const filteredUsers = listOfUsers.filter((user) => {
        return user.name.toLowerCase().includes(searchInput.toLowerCase());
      });

  return (
    <div className="searchPage">Search
        
        <div>
            <input   
                className="mainsearchbar"
                type='text'
                placeholder='Search by name'
                value={searchInput}
                onChange={handleSearchInput}
            />
      </div>
        {filteredUsers.map((search)=>{
            return<div key={search.id} className="searchOutputContainer">
                <Link to={`/profile/${search.id}`}>
                    <div className="searchoutput">
                        <img className="searchoutputimage" src={search.imgurl}  alt=""/>
                        {search.name}
                    </div>
                </Link>
            </div>
        })}
    </div>
  )
}

export default Search