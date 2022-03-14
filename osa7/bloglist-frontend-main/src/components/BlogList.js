import BlogCreateForm from './BlogCreateForm'
import {
    Link,
} from "react-router-dom"

//updateBlog,user,removeBlogFunc,
const BlogList = ({ blogs,addBlog2 }) => {
    return(
        <div>
            {blogs.map(blog =>
                <li key={blog.id}>
                    <Link to={`/${blog.id}`}>{blog.title}</Link>
                </li>
            )}
            <BlogCreateForm createBlog2={addBlog2}/>
        </div>
    )
}

export default BlogList