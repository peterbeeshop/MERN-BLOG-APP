import React, {useState} from 'react'
import {Link} from "react-router-dom"
// import Register from "./Register"
import { useNavigate } from "react-router-dom";

function Log({user,setUser}) {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    let navigate = useNavigate();

    function logInUser(e) {
        e.preventDefault();
        // console.log(userName, password)
        fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userName":userName,
                "password":password,
            }),
            credentials: "include"
        })
        .then(res => res.text())
        .then(txt => {
            setUser(txt);
            console.log("user is")
            // console.log(user)
            navigate("/blog")
        })
        .catch(e => console.log(e.message))
    }

    return (
        <div>
            <h2>Login </h2>
           <form >
               <label >Username</label>
               <input type="text" name="userName" onChange={e => setUserName(e.target.value)} />
               <label >Password</label>
               <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
               <button onClick={logInUser}>Log in</button>
            
           </form>
           <div>
               <p>Dont have an acc ? <Link to="/register">Sign up</Link> </p>
           </div>
        </div>
    )
}

export default Log
