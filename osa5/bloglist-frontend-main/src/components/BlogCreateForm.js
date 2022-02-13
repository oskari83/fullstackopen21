import { useState } from 'react' 

const BlogCreateForm = ({createBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
    
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
    
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
      event.preventDefault()
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
  }
  
  return (
    <div>
      <div>
        <h2>Create new</h2>
      </div>
      <form onSubmit={addBlog}>
        <p>Title:<input value={newTitle} onChange={handleTitleChange}/></p>
        <p>Author:<input value={newAuthor} onChange={handleAuthorChange}/></p>
        <p>Url:<input value={newUrl} onChange={handleUrlChange}/></p>
        <button 
          type="submit">Create
        </button>
      </form>  
    </div>
  )
}

export default BlogCreateForm