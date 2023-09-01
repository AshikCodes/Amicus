import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
            <h2>Client Messages</h2>
            {msgList && 
                msgList.map((msgListItem) => 
                (<div onClick={() => goToMessageDetails(msgListItem.caseid)}>
                    {msgListItem.caseid}
                </div>))}
        </div>
     );
}
 
export default ClientMessages;