import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, notificationClass }) => {
  if (message === null)
    return null

  return (
    <div>
      <Alert variant="success">
        {message}
      </Alert>
    </div>
  )
}

export default Notification