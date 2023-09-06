// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setClientData } from "../../reducers/clientReducer";

// const AdminVideoConference = () => {
//     const userObj = useSelector(state => state.user)
//     const dispatch = useDispatch()
//     const [msgList, setMsgList] = useState(null)
//     const navigate = useNavigate()
//     useEffect(() => {
//         localStorage.removeItem('clientData')
//         const getMessageInfo = async () => {
//             try {
//                 let result = await axios.get('http://localhost:3001/cases')
//                 setMsgList(result.data.cases)
//             }
//             catch(err){
//                 console.log(`error getting message list`)
//             }
//         }
//         getMessageInfo()
//     }, [])

//     const goToMessageDetails = (room, clientid) => {
//         dispatch(setClientData({id: clientid}))
//         // navigate(`/admin/video-conference/${room}`, {state: {clientid: clientid}})
//         navigate(`/admin/video-conference/${room}`)
//     }
//     return ( 
//         <div>
//             <h2>Video Conference Rooms</h2>
//             {msgList && 
//                 msgList.map((msgListItem) => 
//                 (<div onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.clientid)}>
//                     {msgListItem.caseid}
//                 </div>))}
//         </div>
//      );
// }
 
// export default AdminVideoConference;

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Heading, Stack, Button } from "@chakra-ui/react";
import { setClientData } from "../../reducers/clientReducer";


const AdminVideoConference = () => {
    const userObj = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [msgList, setMsgList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem('clientData')
        const getMessageInfo = async () => {
            try {
                let result = await axios.get('http://localhost:3001/cases')
                setMsgList(result.data.cases)
            }
            catch(err){
                console.log(`error getting message list`)
            }
        }
        getMessageInfo()
    }, [])


     const goToMessageDetails = (room, clientid) => {
        console.log(`goToMessageDetails paramters are ${room} and ${clientid}`)
        dispatch(setClientData({id: clientid}))
        // navigate(`/admin/video-conference/${room}`, {state: {clientid: clientid}})
        navigate(`/admin/video-conference/${room}`)
    }
    return ( 
        <div>
            <div className="client-message-container">
            <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Video Conferencing</Heading>
                <Stack spacing={4}>
                    {msgList &&
                        msgList.map((msgListItem) => (
                        <Card size='md' key={msgListItem.caseid} bgGradient='linear(-20deg, #e9defa 0%, #fbfcdb 100%)'> {/* Add a unique key prop */}
                            <CardHeader>
                            <Heading size='md' textAlign='left'>{msgListItem.casetitle}</Heading>
                            </CardHeader>
                            <CardBody textAlign='right'>
                            <Button
                                colorScheme='blue'
                                onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.clientid)}
                            >
                                Video Conference
                            </Button>
                            </CardBody>
                        </Card>
                        ))}
                    </Stack>
                    </div>
        </div>
     );
}
 
export default AdminVideoConference;