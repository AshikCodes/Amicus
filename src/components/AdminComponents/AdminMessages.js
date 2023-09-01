import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminMessages = () => {
    const userObj = useSelector(state => state.user)
    const [msgList, setMsgList] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
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
        navigate(`/admin/messages/${room}`, {state: {clientid: clientid}})
    }
    return ( 
        <div>
            <h2>Admin Messages</h2>
            {msgList && 
                msgList.map((msgListItem) => 
                (<div onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.clientid)}>
                    {msgListItem.caseid}
                </div>))}
        </div>
     );
}
 
export default AdminMessages;