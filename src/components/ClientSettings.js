import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAnimationCount } from "../reducers/animationReducer";

const ClientSettings = ({client}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(setAnimationCount(0))
        client.removeQueries()
        localStorage.removeItem('loggedAppUser');
        navigate('/')
    }
    return ( 
        <div>
            <h1>Client Settings</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
     );
}
 
export default ClientSettings;