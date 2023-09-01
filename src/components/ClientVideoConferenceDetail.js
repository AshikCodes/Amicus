import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Peer from "simple-peer"
import SimplePeer from "simple-peer";

const ClientVideoConferenceDetail = ({socket}) => {
    
    const myVideo = useRef()
    const connectionRef= useRef()
    const SimplePeer = window.SimplePeer;

    const { roomid } = useParams()
    const location = useLocation()


    const userObj = useSelector(state => state.user)
    const [stream, setStream ] = useState()
    const userVideo = useRef()
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ callEnded, setCallEnded] = useState(false)
    const [ caller, setCaller ] = useState("")
    const [ name, setName ] = useState("")

    const [ callerSignal, setCallerSignal ] = useState()
    const [ receivingCall, setReceivingCall ] = useState(false)

    const [me, setMe] = useState('')
    // const [sender, setSender] = useState('')
    // const [receiver, setReceiver] = useState('')
    const [sender, setSender] = useState()
    const [receiver, setReceiver] = useState()
    const [room, setRoom] = useState(roomid)

    const [userType, setUserType] = useState()

    const resetCallState = () => {
        setCallAccepted(false);
        setCallEnded(false);
        setCaller("");
        setReceivingCall(false)
        setName("");
        // connectionRef.current = null;
    };


    useEffect(() => {
        if(room){
            socket.emit("join_room", {room})
        }
    },[room, socket])

    useEffect(() => {
        setMe(userObj.id)

        const getDeviceMedia = async () => {
            // const getUserMedia = async () => {
            try {
                    const stream = await navigator.mediaDevices.getUserMedia({video: true});
                    setStream(stream)
                    myVideo.current.srcObject = stream;
            }
            catch(err){
                console.log(`Error here is ${err}`)
            }
            
            }
            // getUserMedia()
            getDeviceMedia()

        const getInfo = async () => {
            setSender(userObj.id)
            setReceiver('00e01d43-9571-4d1b-badd-b3cfdf4dcae7')
        //     let user_type = userObj.usertype
        //     let messageInfo
        //     if(user_type === 1){
        //         setSender(userObj.id)
        //         setReceiver('00e01d43-9571-4d1b-badd-b3cfdf4dcae7')
        //         messageInfo = {
        //             sender: userObj.id,
        //             receiver: '00e01d43-9571-4d1b-badd-b3cfdf4dcae7'
        //         }
        //     }
        //     else if(user_type === 0){
        //         let receiver = location.state.clientid
        //         setSender('00e01d43-9571-4d1b-badd-b3cfdf4dcae7')
        //         setReceiver(receiver)
        //         messageInfo = {
        //             sender: userObj.id,
        //             receiver: receiver
        //         }
        //     }
                // await axios.post('http://localhost:3001/get_room', {sender: messageInfo.sender, receiver: messageInfo.receiver})
                //             .then((res) => {
                //                 console.log(`room here is ${res.data.room}`)
                //                 setRoom(res.data.room)
                //             })

        //         setRoom(roomid)

        }
        getInfo()
        
        socket.on("callUser", (data) => {
            console.log(`got into call user`)
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})

        socket.on("endCall", (data) => {
            leaveCall()
        })

        return () => {
            if (connectionRef.current) {
              connectionRef.current.destroy();
            }
            socket.off("callUser");
            socket.off("endCall");
          };

	}, [sender, receiver])

    const callUser = (roomNumber) => {
        console.log('clicked call btn')
        const peer = new SimplePeer({
            initiator: true,
			trickle: false,
			stream: stream
        })
        

        connectionRef.current = peer;

        peer.on("signal", (data) => {
            console.log(`got in signal: ${roomNumber}`)
			socket.emit("callUser", {
				userToCall: roomNumber,
				signalData: data,
				from: me,
				name: receiver
			})
		})

        

        peer.on("stream", (stream_num) => {	
            console.log(`got in stream peer`)
            userVideo.current.srcObject = stream_num
        })

        peer.on('close', () => { 
            console.log(`why is it here`)
            console.log('peer closed'); 
            socket.off("callAccepted");
        });

        socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

        // connectionRef.current = peer
        if (connectionRef.current) {
            connectionRef.current.destroy();
          }
          connectionRef.current = peer;
    }

    const answerCall =() =>  {
		setCallAccepted(true)
        const peer = new SimplePeer({
            initiator: false,
			trickle: false,
			stream: stream
        })
        

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: room })
		})
        
        // connectionRef.current = peer;

		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

        peer.on('close', () => { console.log('peer closed'); socket.off("callAccepted"); });

		peer.signal(callerSignal)
		// connectionRef.current = peer
        if (connectionRef.current) {
            connectionRef.current.destroy();
          }
          connectionRef.current = peer;
	}

	const leaveCall = () => {
		setCallEnded(true)
		// connectionRef.current.destroy()
        if (connectionRef.current) {
            connectionRef.current.destroy(); // Check if connectionRef.current is defined
        }
        // connectionRef.current = null
        resetCallState()
        socket.emit("hangUpCall", {room})
	}



    return ( 
        <div>
            <h2>Video Conferencing - Client</h2>
            <div className="video-container">
				<div className="video">
					{stream && 
                    <>
                    <h3>You are {me}</h3>
                    <video playsInline muted ref={myVideo} autoPlay style={{ width: "500px", borderRadius:"15px" }} />
                    </>}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
                    <>
                    <h3>Talking with {receiver}</h3>
                    <video playsInline ref={userVideo} autoPlay style={{ width: "500px", borderRadius:"15px"}} />
                    </>
					:
					null}
				</div>
			</div>
            <div className="call-button">
					{callAccepted && !callEnded ? (
						<button variant="contained" color="secondary" onClick={leaveCall}>End Call</button>
					) : (
                        <button onClick={() => callUser(roomid)}>Call</button>
					)}
				</div>
                <div>
				{receivingCall && caller !== userObj.id && !callAccepted ? (
						<div className="caller">
						<h1 >{caller} is calling...</h1>
                        <button onClick={answerCall}> Answer</button>
					</div>
				) : null}
			</div>
        </div>
     );
}
 
export default ClientVideoConferenceDetail;