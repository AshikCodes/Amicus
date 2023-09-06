// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AdminMessages = () => {
//     const userObj = useSelector(state => state.user)
//     const [msgList, setMsgList] = useState(null)
//     const navigate = useNavigate()
//     useEffect(() => {
//         const getMessageInfo = async () => {
//             try {
//                 let result = await axios.get('http://localhost:3001/cases')
//                 console.log(`result.data.cases here is ${JSON.stringify(result.data.cases)}`)
//                 setMsgList(result.data.cases)
//             }
//             catch(err){
//                 console.log(`error getting message list`)
//             }
//         }
//         getMessageInfo()
//     }, [])

//     const goToMessageDetails = (room, clientid) => {
//         console.log(`clientid here is ${clientid}`)
//         navigate(`/admin/messages/${room}`, {state: {clientid: clientid}})
//     }
//     return ( 
//         <div>
//             <h2>Admin Messages</h2>
//             {msgList && 
//                 msgList.map((msgListItem) => 
//                 (<div onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.clientid)}>
//                     {msgListItem.caseid}
//                 </div>))}
//         </div>
//      );
// }
 
// export default AdminMessages;

import { Card, CardBody, CardHeader, Heading, Stack, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClientData } from "../../reducers/clientReducer";
import { WindowRef } from "ngx-autosize";
// import { Button } from "react-scroll";

const AdminMessages = () => {
    const [msgList, setMsgList] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getMessageInfo = async () => {
            try {
                let result = await axios.get('http://localhost:3001/cases')
                console.log(`result.data.cases here is ${JSON.stringify(result.data.cases)}`)
                setMsgList(result.data.cases)
            }
            catch(err){
                console.log(`error getting message list`)
            }
        }
        getMessageInfo()
    }, [])


    const goToMessageDetails = (room, clientid) => {
        console.log(`clientid here is ${clientid}`)
        window.localStorage.setItem('clientid', clientid)
        navigate(`/admin/messages/${room}`, {state: {clientid: clientid}})
    }
    return ( 
        <div>
            <div className="client-message-container">
             <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text' >Messages</Heading>
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
                                Message
                            </Button>
                            </CardBody>
                        </Card>
                        ))}
                    </Stack>
                    </div>
        </div>
     );

 
}
 
export default AdminMessages;