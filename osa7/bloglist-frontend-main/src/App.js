import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import UserView from './components/UserView'
import { useSelector, useDispatch } from 'react-redux'
import { appendBlog, setBlogs, removeBlog } from './reducers/blogReducer'
import { setMessage, clearMessage } from './reducers/messageReducer'
import { setUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Blg from './components/Blg'


const App = () => {
  const dispatch = useDispatch()
  const padding = {
    padding: 5
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector((state) => {
    return state.blogs.slice().sort(function (blg, blg2) {
        return parseInt(blg2.likes) - parseInt(blg.likes)
    })
  })
  const errorMessage = useSelector((state) => state.message)

  useEffect(() => {
    blogService
      .getAll().then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    userService
      .getUsers().then(urs => dispatch(setUsers(urs)))
  }, [dispatch])

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
      dispatch(setMessage('wrong username or password'))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        dispatch(appendBlog(returnedBlog))
        dispatch(setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`))
        setTimeout(() => {
          dispatch(clearMessage())
        }, 5000)
      })
  }

  const updateBlog = (id,blogObject) => {
    blogService
      .update(id,blogObject)
  }

  const removeBlogFunc = (id, tok, blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      blogService
      .remove(id, `bearer ${tok}`)
        .then(() => {
        dispatch(removeBlog(id))
        dispatch(setMessage(`Blog Deleted`))
        setTimeout(() => {
          dispatch(clearMessage())
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
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <h3>BLOGS</h3>
        <Notification message={errorMessage} type={1} />
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
        </div>

        <Routes>
          <Route path="/:id" element={<Blg blogs={blogs} addLike2={updateBlog} removeBlog={removeBlogFunc} user={user}/>} />
          <Route path="/" element={<BlogList blogs={blogs} addBlog2={addBlog}/>} />
          <Route path="/users" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App