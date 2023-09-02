import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        dispatch(setClientData({id: clientid}))
        // navigate(`/admin/video-conference/${room}`, {state: {clientid: clientid}})
        navigate(`/admin/video-conference/${room}`)
    }
    return ( 
        <div>
            <h2>Video Conference Rooms</h2>
            {msgList && 
                msgList.map((msgListItem) => 
                (<div onClick={() => goToMessageDetails(msgListItem.caseid, msgListItem.clientid)}>
                    {msgListItem.caseid}
                </div>))}
        </div>
     );
}
 
export default AdminVideoConference;