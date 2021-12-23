import React ,{useState} from 'react'
import {useNavigate} from "react-router-dom"

function NewBlog() {
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const navigate = useNavigate();

    function createBlog(e) {
        e.preventDefault();
        fetch("http://localhost:5000/blogs", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title":title,
                "body":body
            })
        })
        .then(res => res.text())
        .then(txt => navigate("/blog"))
        .catch(e => console.log(e.message))
    }
    return (
        <div>
            <h1>Create A New Blog</h1>
            <form>
                <label >Title</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
                <label >Body</label>
                <input type="text" name="body" onChange={(e) => setBody(e.target.value)}/>
                <button  onClick={createBlog}>Create Blog</button>
            </form>
        </div>
    )
}

export default NewBlog;
