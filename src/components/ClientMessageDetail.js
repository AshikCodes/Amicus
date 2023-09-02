import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";
import { Button, Heading } from "@chakra-ui/react";
import { animateScroll } from "react-scroll";

const ClientMessageDetail = ({socket}) => {
    const userObj = useSelector(state => state.user)
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const { roomid } = useParams()
    const [messageReceived, setMessageReceived] = useState([])
    const [message, setMessage] = useState('')
    const location = useLocation()


    useEffect(() => {
        scrollToBottom()
      }, [messageReceived]);

     const scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "message-container",
            duration: 300
          });
      }

    useEffect(() => {
        
        if(roomid){
            let room = roomid
            socket.emit("join_room", {room})
        }
    }, [roomid, socket])

    const sendMessage = async () => {
        console.log(`clicked send btn: ${message}`)
        console.log(`SendMessage Function: sender: ${sender} - receiver: ${receiver}`)
        if(roomid){
            let messagecontent = message
            await axios.post('http://localhost:3001/new_message', {sender, receiver, roomid, content: message})
            socket.emit('send_message', {messagecontent, room: roomid, senderid: sender, receiverid: receiver})
            console.log(`message received here is ${messagecontent}`)
            setMessage('')
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data) => {
          let newElements = { messagecontent: data.messagecontent, senderid: data.senderid, receiverid: data.receiverid };
          let newElement = _.uniqWith(newElements, _.isEqual);
          console.log(`new elements here is ${JSON.stringify([...messageReceived, newElements])}`);
          console.log(`new element here is ${JSON.stringify(messageReceived)}`);
          setMessageReceived((oldArray) => [...oldArray, newElements]);
        };
      
        socket.on('receive_message', handleReceiveMessage);
      
        return () => {
          socket.removeListener('receive_message', handleReceiveMessage); // Use removeListener instead of off
        };
      }, [socket]);

    useEffect(() => {
        console.log(`userObj.usertype here is ${JSON.stringify(userObj.usertype)}`)
        console.log(`userObj.id here is ${userObj}`)
        if(userObj.usertype === 1){
            setSender(userObj.id)
            setReceiver('00e01d43-9571-4d1b-badd-b3cfdf4dcae7')
        }

        const getMessages = async () => {
            try {
                console.log(`cheese`)
                let sender1 = userObj.id
                let receiver1 = '00e01d43-9571-4d1b-badd-b3cfdf4dcae7'
                if(roomid){
                    let result = await axios.post('http://localhost:3001/get_messages', {sender: sender1, receiver: receiver1, roomid})
                    
                    let newArray = result.data.messages
                    console.log(`cheese 2 ${JSON.stringify(newArray)}`)
                    setMessageReceived(newArray)
                }

            }
            catch(err){
                console.log(`could not retrieve messages: ${err}`)
            }
        }
        getMessages()
    },[])
    return ( 
        <div className="scrollable-msg-view">
            {/* <h1 className="message-page-title">Welcome to the details page for message!</h1> */}
            {roomid && <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Chat Room</Heading>}
            {/* {roomid && <h2>Room ID: {roomid}</h2>} */}
            {roomid && <div>
            <div className="dialog-window">
                <div id="message-container">
                {messageReceived && messageReceived.length > 0 && messageReceived.map((m,index) => (
                    <div className="message-box">
                        {m.senderid === userObj.id ? <h3 className="sender-box">{m.messagecontent}</h3> 
                        :<h3 className="receiver-box">{m.messagecontent}</h3>}
                    </div>
                ))}
                </div>
            </div>
            <div className="msg-input-container">
            <input value={message} onChange={e => setMessage(e.target.value)}></input>
            {/* <button onClick={sendMessage}>Send message</button> */}
            <Button onClick={sendMessage} colorScheme="green" _hover={{cursor: 'pointer'}} height='2em'>Send</Button>
            </div>
            
            </div>}
        </div>
     );
}
 
export default ClientMessageDetail;