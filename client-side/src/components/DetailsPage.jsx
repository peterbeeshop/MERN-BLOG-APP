import React,{useState,useEffect} from 'react'
import {useParams, useNavigate } from "react-router-dom"



function DetailsPage() {
    const [blog,setBlog] = useState({})

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const params = useParams()
    const navigate = useNavigate()

    //fetch a specific blog
    useEffect(() => {
        function getBlog() {
            fetch("http://localhost:5000/blogs/"+params.id, {
                method: "GET",
                headers: {"content-type": "application/json"}
            })
            .then(res => res.json())
            .then(data => setBlog(data))
            .catch(err => console.log(err.message))
        }
        getBlog()
    },[params.id])

//delete functions

    function deleteBlog() {
       fetch("http://localhost:5000/blogs/"+blog._id, {
           method: "DELETE"
       })
       .then(() => navigate("/blog"))
       .catch(err => console.log(err.message))

    }

    //update blog
    function updateBlog(e) {
         e.preventDefault();
        fetch(`http://localhost:5000/blogs/${blog._id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title":title,
                "body":body
            })
        })
        .then(res => res.text())
        .then(txt => {
            console.log(txt)
            navigate("/blog/")
        })
        .catch(e => console.log(e.message))
    }

    return (
        <div>
            <h1>Detail for {blog.title} </h1>
            <div>
                <h2>Title:</h2>
                <div>
                    <h3>{blog.title}</h3>
                </div>
                <h2>Body:</h2>
                <div>
                    <h3>{blog.body}</h3>
                </div>
                <h5>Created On: {blog.createdAt}</h5> 
            </div>
            <div>
                <button onClick={deleteBlog}>Delete</button>
            </div>
               <form styles={{backgrounColor:"red"}}>
                   <h2>Update {blog.title}</h2>
                <label >Title</label>
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
                <label >Body</label>
                <input type="text" name="body" onChange={(e) => setBody(e.target.value)}/>
                <button  onClick={updateBlog}>Update</button>
            </form>
        </div>
    )
}

export default DetailsPage
