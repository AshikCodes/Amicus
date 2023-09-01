import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";

const AdminMessageDetail = ({socket}) => {
    const userObj = useSelector(state => state.user)
    const [sender, setSender] = useState(null)
    const [receiver, setReceiver] = useState(null)
    const { roomid } = useParams()
    const [messageReceived, setMessageReceived] = useState([])
    const [message, setMessage] = useState('')
    const location = useLocation()



    useEffect(() => {
        
        if(roomid){
            let room = roomid
            socket.emit("join_room", {room})
        }
    }, [roomid, socket])

    const sendMessage = async () => {
        console.log(`clicked send btn: ${message}`)
        if(roomid){
            let room = roomid
            let messagecontent = message
            await axios.post('http://localhost:3001/new_message', {sender, receiver, roomid, content: message})
            socket.emit('send_message', {messagecontent, room, senderid: sender, receiverid: receiver})
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
       if(userObj.usertype === 0){
        let receiver = location.state.clientid
        setSender('00e01d43-9571-4d1b-badd-b3cfdf4dcae7')
        setReceiver(receiver)
            
        console.log(`receiver in msgList here is ${receiver}`)
        }

        const getMessages = async () => {
            console.log(`cheese: ${sender} and ${receiver}`)
            let sender1 = '00e01d43-9571-4d1b-badd-b3cfdf4dcae7'
            let receiver1 = location.state.clientid
            try {
                if(roomid){
                    console.log(`chees2`)
                    let result = await axios.post('http://localhost:3001/get_messages', {sender: sender1, receiver: receiver1, roomid})
                    let newArray = result.data.messages
                    console.log(`new array  hejrfjnwekrjfn is ${newArray}`)
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
        <div>
            <h1>Welcome to the details page for message!</h1>
            {roomid && <h2>Room ID: {roomid}</h2>}
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
            <input value={message} onChange={e => setMessage(e.target.value)}></input>
            <button onClick={sendMessage}>Send message</button>
            </div>}
        </div>
     );
}
 
export default AdminMessageDetail;