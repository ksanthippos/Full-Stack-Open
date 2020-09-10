import React from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
         Username
          <Form.Control
            id="username"
            value={username}
            onChange={handleUsernameChange}
          /><p/>
         Password
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          /><p/>
          <Button
            id="login-button"
            type="submit"
            variant="primary">
          Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm