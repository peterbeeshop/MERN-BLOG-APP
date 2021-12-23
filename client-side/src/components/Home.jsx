import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import "../App.css"
function Home() {
    const [blogs,setBlogs] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        function fetchBlogs() {
            fetch("http://localhost:5000/blogs", {
                method:"GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.log(err.message))
        }
        fetchBlogs()
    })



    return (
        <div>
            <h1 className="home__h1">List of Blogs</h1>
            <div>
                {
                    blogs.map(blog => {
                        return (
                            <div className="home" key={blog._id} onClick={() => navigate(`/blogs/${blog._id}`)}>
                                <h2>{blog.title}</h2>
                                <h3>{blog.body}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
