import React, {useState} from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Register() {
      const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    function registerUser(e){
        e.preventDefault();
        console.log(userName, password)
         fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userName":userName,
                "password":password,
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log(data)
            navigate("/login")
        })
        .catch(e => console.log(e.message))
    }
    return (
        <div>
            <h2>Create New Account</h2>
             <form >
               <label >Username</label>
               <input type="text" name="username" onChange={e => setUserName(e.target.value)} />
               <label >Password</label>
               <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
               <button onClick={registerUser}>Log in</button>
           </form>
             <div>
               <p>Already have an acc ? <Link to="/login">Login</Link> </p>
           </div>
        </div>
    )
}

export default Register
