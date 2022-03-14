import {
    useParams
} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog } from "../reducers/blogReducer"

const Blg = ({ blogs, addLike2, removeBlog, user }) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)
    if (!blog) {
        return null
    }
    const likes = useSelector(state => state.blogs.find(per => per.id === id).likes)
    const showWhenVisible = { display: user.username===blog.user.username ? '' : 'none' }
    console.log(blog)

    const addLike = (event) => {
        event.preventDefault()
        addLike2(blog.id,{
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: likes + 1,
          user: blog.user.id
        })
        dispatch(voteBlog(blog.id))
    }

    const deleteBlog = () => {
        removeBlog(blog.id,user.token, blog)
    }

    return (
      <div>
        <h2>{blog.title}</h2>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>Added by user {blog.user.name}</div>
        <p>{likes}<button id="like-button" onClick={addLike}>Like</button></p>
        <div style={showWhenVisible}>
          <button id="remove-button" onClick={deleteBlog}>Remove</button>
        </div>
      </div>
    )
}

export default Blg