import { useState } from 'react'

const BlogCreateForm = ({ createBlog2 }) => {
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

  const addBlog2 = (event) => {
      event.preventDefault()
      createBlog2({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
  }

  return (
    <div className='formDiv'>
      <div>
        <h2>Create new</h2>
      </div>
      <form onSubmit={addBlog2}>
        <p>Title:<input id="title-input" value={newTitle} onChange={handleTitleChange}/></p>
        <p>Author:<input id="author-input" value={newAuthor} onChange={handleAuthorChange}/></p>
        <p>Url:<input id="url-input" value={newUrl} onChange={handleUrlChange}/></p>
        <button
          id="create-button"
          type="submit">Create
        </button>
      </form>
    </div>
  )
}

export default BlogCreateForm