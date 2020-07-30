import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

let blog, user

beforeEach(() => {
  blog = {
    title: 'test blog',
    author: 'Tester Dude',
    url: 'www.hidden.com',
    likes: 7,
    user: {
      username: 'tester',
      password: 'secret'
    }
  }

  // Blog-komponentissa tarkistetaan kirjautunut käyttäjä, kun klikataan view-nappia
  user = {
    username: 'tester',
    password: 'secret'
  }
})

test('as default renders title/author but not url/likes', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('Tester Dude')
  expect(component.container).not.toHaveTextContent('www.hidden.com')
  expect(component.container).not.toHaveTextContent('likes')

})

test('renders also url/likes when clicked view button', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('Tester Dude')
  expect(component.container).toHaveTextContent('www.hidden.com')
  expect(component.container).toHaveTextContent('likes')

})

test('event handler called when like is clicked', () => {


  const component = render(
      <Blog blog={blog} user={user} />
  )
  jest.mock('blogService')

  const button = component.getByText('view')
  fireEvent.click(button)

  // klikataan likeä
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  blogService.update(mockResolvedValue(blog))


})

