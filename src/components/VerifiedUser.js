import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const VerifiedUser = () => {
    const {confirmationtoken} = useParams()

    useEffect(() => {
        const activateAccount = async (confirmationtoken) => {
            try {
                await axios.get(`http://localhost:3001/confirm/${confirmationtoken}`)
                console.log('Activated User!')
            }
            catch(err){
                console.log(`Error activating user: ${err}`)
            }
        }
        activateAccount(confirmationtoken)
    }, [])

    return ( 
        <div>
            <div className="error-container">
                    <h1 className="verified-title">🎉 Congratulations! Your account is now verified and ready to go!</h1>
                    <h3 className="verified-message">You may now close this tab.</h3>
            </div>
        </div>
     );
}
 
export default VerifiedUser;