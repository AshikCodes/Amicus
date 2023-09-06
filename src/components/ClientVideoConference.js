import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Heading, Stack, Button } from "@chakra-ui/react";


const ClientVideoConference = () => {
    const userObj = useSelector(state => state.user)
    const [msgList, setMsgList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem('clientData')
        const getMessageInfo = async () => {
            try {
                let result = await axios.post('http://localhost:3001/cases', {id: userObj.id})
                setMsgList(result.data.cases)
            }
            catch(err){
                console.log(`error getting message list`)
            }
        }
        getMessageInfo()
    }, [])


    const goToMessageDetails = (room, caseTitle) => {
        navigate(`/client/video-conference/${room}`, {state: caseTitle})
    }
    return ( 
        <div>
            {/* <h2>Client Video Conference Rooms</h2> */}
            <div className="client-message-container">
            <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Video Conferencing</Heading>
            {/* {msgList && 
                msgList.map((msgListItem) => 
                (<div onClick={() => goToMessageDetails(msgListItem.caseid)}>
                    {msgListItem.caseid}
                </div>))} */}
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
                                onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.casetitle)}
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
 
export default ClientVideoConference;