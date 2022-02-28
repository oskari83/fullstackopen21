import { useState } from 'react'
import '../index.css'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
    marginTop: 2
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(parseInt(blog.likes))
  const showWhenVisible = { display: user.username===blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = () => {
    removeBlog(blog.id,user.token, blog)
  }

  const addLike = (event) => {
    event.preventDefault()
    updateBlog(blog.id,{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id
    })

    setLikes(likes + 1)
}

  if(visible){
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{likes}<button id="like-button" onClick={addLike}>Like</button></p>
        <p>{blog.user.username}</p>
        <div style={showWhenVisible}>
          <button id="remove-button" onClick={deleteBlog}>Remove</button>
        </div>
      </div>
    )
  }else{
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }
}

export default Blog