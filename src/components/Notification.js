import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null)
    return null

  else {
    return (
      <div>
        { notification.includes('deleted') ?  // eri värillä poistonotifikaatio
          <Alert variant="warning">
            { notification }
          </Alert>
          :
          <Alert variant="success">
            { notification }
          </Alert>
        }
      </div>
    )
  }
}

export default Notification