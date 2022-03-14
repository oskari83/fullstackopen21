import React from 'react'
import '../index.css'

const Notification = ({ message,type }) => {
  if (message === null) {
    return null
  }

  if(type===1){
    return (
      <div className="notification">
        {message}
      </div>
    )
  }else{
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification