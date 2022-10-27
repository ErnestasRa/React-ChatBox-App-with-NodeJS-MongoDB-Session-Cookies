import * as React from 'react'
import { get, post } from '../plugins/https'
import '../App.css'
import ChatBoxMessage from '../components/chat-box-message'
import MainContext from '../context/main-context';

const MainPage = () => {
    const messageRef = React.useRef()
    const {message, setMessage} = React.useContext(MainContext)

    async function sendMessage() {
        const data = {
            message: messageRef.current.value,
        }
        const res = await post('sendmessage', data)
        console.log(res)
   
        messageRef.current.value = ''
        getAllMessages()
    }

    async function getAllMessages(){
        const res = await get('allmessages')
        if(!res.error){
            setMessage(res)
        }
    }

    React.useEffect(() => {
        getAllMessages()
    }, [])

  return (
    <div className='chat-box'>
        {message.map((chatMessage,i) => {
            return <ChatBoxMessage 
                message={chatMessage.message}            
                color={chatMessage.color}
                date={new Date().getFullYear()}
                messagesCount={message.length}
                name={chatMessage.email}
                symbolCount={chatMessage.message.length}
                key={i}
            />
        })}

       <div>
            <input type={'text'} ref={messageRef}/>
            <button onClick={sendMessage}>send message</button>
        </div> 
    </div>
  )
}

export default MainPage
 