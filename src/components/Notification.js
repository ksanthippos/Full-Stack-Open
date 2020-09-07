import React from 'react'
import { useSelector } from 'react-redux'
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