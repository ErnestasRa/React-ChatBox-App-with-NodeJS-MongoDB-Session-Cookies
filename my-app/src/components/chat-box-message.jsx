import * as React from 'react'
import '../App.css'

const ChatBoxMessage = ({name, date, messagesCount, symbolCount, color, message}) => {
  return (
    <div className='chat-box-message' >
            <span>{name}</span>
            <span>{date}</span>
            <span>{message}</span>
            <span>Messages in this session: {messagesCount}</span>
            <span>Symbols this session: {symbolCount}</span>
            <span style={{'background': color, 'height': '30em'}}></span>
     </div>  
  )
}

export default ChatBoxMessage