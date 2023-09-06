import { Card, CardBody, CardHeader, Heading, Stack, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Button } from "react-scroll";

const ClientMessages = () => {
    const userObj = useSelector(state => state.user)
    const [msgList, setMsgList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
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

    const goToMessageDetails = (room) => {
        navigate(`/client/messages/${room}`)
    }
    return ( 
        <div>
            <div className="client-message-container">
             {/* <h2>Client Messages</h2> */}
             <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text' >Messages</Heading>
            {/* {msgList && 
                msgList.map((msgListItem) => 
                (<div onClick={() => goToMessageDetails(msgListItem.caseid)}>
                    {msgListItem.caseid}
                </div>))}  */}
                {/* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); 
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%); */}
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
                                onClick={() => goToMessageDetails(msgListItem.caseid)}
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
 
export default ClientMessages;