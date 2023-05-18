import React, { useEffect ,useState} from 'react';
import "../css/Login.css";
import { Link } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [proPic, setProPic] = useState('');

  function loginWithGithub(event) {
    event.preventDefault();
    const CLIENT_ID = "c7ec00ba244906f99644";
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      exchangeCodeForToken(code)
        .then((accessToken) => getUserProfile(accessToken))
        .then((profile) => {
          const { name, profilePicture } = profile;
          setProPic(profilePicture);
          setName(name);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  function exchangeCodeForToken(code) {
    const CLIENT_ID = "c7ec00ba244906f99644";
    const CLIENT_SECRET = "436e650b0c35a2ef6ea5b391ea4628acd1e8e1d8";
    const REDIRECT_URI = "http://localhost:3000/";

    const requestBody = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    };

    return fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => data.access_token);
  }

  function getUserProfile(accessToken) {
    return fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => ({
        name: data.name,
        profilePicture: data.avatar_url,
        
      }));
      
  }
  

  return (
    <div className='Login'>
      <div className='login_title'>login</div>
      <form className='login_form'>
        <input type='text' placeholder='enter username' className='login_input' />
        <input type='password' placeholder='enter password' className='login_input' />
        <button className='login_button'>submit</button>
        Or
        <div className='login_oauth'>
              {/* <button onClick={loginWithGithub}>login with GitHub</button>
              {name && proPic && (
            <div className='user_info'>
              <h3>Welcome, {name}!</h3>
              <img src={proPic} alt='Profile' />
            </div>
          )} */}
            <a href="http://localhost:8080/login/github">Login with GitHub</a>
        </div>
      </form>
      <div className='forgotpwd'>
        <Link className="fgtpwdlink" to="/forgotPassword">forgot password?</Link>
        <h3>Don't have an account?</h3>
        <Link className="fgtpwdlink" to="/addProfile">register</Link>
      </div>
    </div>
  );
}

export default Login;
