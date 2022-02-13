import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Notification from './components/Notification'
import BlogCreateForm from './components/BlogCreateForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(function (blg, blg2) {
        return parseInt(blg2.likes) - parseInt(blg.likes)
      })) 
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("loggin in")
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (id,blogObject) => {
    blogService
      .update(id,blogObject)
        .then(returnedBlog => {
        //setBlogs(blogs.map(blog => blog.id!==returnedBlog.id ? blog.likes : returnedBlog.likes))
      })
  }

  const removeBlog = (id, tok, blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      blogService
      .remove(id, `bearer ${tok}`)
        .then(returnInfo => {
        setBlogs(blogs.filter(per => per.id !== id))
        setErrorMessage(`Blog Deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={0} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h3>BLOGS</h3>
      <Notification message={errorMessage} type={1} />
      <div>
        <p>{user.name} logged in <button onClick={()=> handleLogout()}>logout</button></p>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog}/>
      )}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogCreateForm createBlog={addBlog}/>
      </Togglable>
    </div>

  )
}

export default App