import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogCreateForm from './BlogCreateForm'

test('renders title and author, not likes and url', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tuge',
    likes: 2,
    url: 'google.com',
    user: {
        name: 'Tuukka',
        username: "Tuge",
        id: "iabcfwfcigb33wecf36ic3"
    }
  }

  const user = {
    name: 'Tuukka',
    username: "Tuge",
    id: "iabcfwfcigb33wecf36ic3"
  }

  const { container } = render(<Blog blog={blog} user={user}/>)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Tuge')
  expect(div).not.toHaveTextContent(2)
  expect(div).not.toHaveTextContent('google.com')
})

test('clicking the button shows likes and url', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Tuge',
        likes: 2,
        url: 'google.com',
        user: {
            name: 'Tuukka',
            username: "Tuge",
            id: "iabcfwfcigb33wecf36ic3"
        }
    }

    const user = {
        name: 'Tuukka',
        username: "Tuge",
        id: "iabcfwfcigb33wecf36ic3"
    }

    render(<Blog blog={blog} user={user}/>)

    const button = screen.getByText('view')
    userEvent.click(button)

    const element = await screen.findByText('google.com')
    expect(element).toBeDefined()

    const element2 = await screen.findByText('2')
    expect(element2).toBeDefined()
})

test('clicking like twice calls eventhandler twice', async () => {
  const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Tuge',
      likes: 2,
      url: 'google.com',
      user: {
          name: 'Tuukka',
          username: "Tuge",
          id: "iabcfwfcigb33wecf36ic3"
      }
  }

  const user = {
      name: 'Tuukka',
      username: "Tuge",
      id: "iabcfwfcigb33wecf36ic3"
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={mockHandler}/>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const likeButton = screen.getByText('Like')

  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form test', async () => {
  const createBlog = jest.fn()

  render(<BlogCreateForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('Create')

  userEvent.type(inputs[0], 'title1' )
  userEvent.type(inputs[1], 'author1' )
  userEvent.type(inputs[2], 'url1' )
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title1' )
})