import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
// import SkeletonElement from "../skeletons/SkeletonElement";
import { motion } from "framer-motion";
import { Heading, Text } from "@chakra-ui/react";


const AdminDashboard = () => {
    const userObj = useSelector(state => state.user)
    const _ = require("lodash");
    // const [userObj, setUserObj] = useState(null)
    const [status, setStatus] = useState(null)
    const [title, setTitle] = useState(null)
    const [overview, setOverview] = useState(null)
    const [plan, setPlan] = useState(null)
    const [document, setDocument] = useState(null)


    const [currentCase, setCurrentCase] = useState(null)
    const [caseHistory, setCaseHistory] = useState(null)

    const navigate = useNavigate()



    const getAdminDashboardInfo = async () => {
            let result = await axios.get('http://localhost:3001/admin/get_dashboard')
            console.log(`result here is ${JSON.stringify(result)}`)
            let dashboard = {
                casecount: result.data.casecount,
                latestcase: result.data.latestcase.casetitle.substring(0,125),
                payments: result.data.payments,
                newcases: result.data.newcases,
                unreadmessages: result.data.unreadmessages,
                engagements: result.data.engagements,
                caseid: result.data.caseid
            }
            return dashboard
        
    }

    const {isLoading, data, isError, error} = useQuery('admin-dashboard', getAdminDashboardInfo)


// http://localhost:3000/admin/dashboard

    useEffect(() => {
        console.log(`rendered dashboard`)
    }, [])

    return ( 
        <div>
            <div className="admin-dashboard-container">
                {/* <h1 className="no-cases-msg">No Cases, No Worries! Your legal expertise will soon be in high demand.🚀</h1> */}
                <div className="admin-current-case-widget" onClick={() => navigate(`/admin/cases/${data.caseid}`)}>
                    <Heading as='h1' margin='0' fontSize='3em' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>Latest Case</Heading>
                    <Text fontSize='2xl' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>{data ? data.latestcase : 'loading...'}</Text>
                </div>
                <div className="payment-tracking-widget" onClick={() => navigate(`/admin/billing`)}>
                    <Heading as='h1' margin='0' fontSize='3em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>Payments Made</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>{data ? data.payments : 'loading...'}</Heading>
                </div>
                <div className="unread-messages-widget" onClick={() => navigate(`/admin/messages`)}>
                    <Heading as='h1' margin='0' fontSize='3em' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>Messages</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>{data ? data.unreadmessages : 'loading...'}</Heading>
                </div>
                <div className="admin-case-history-widget" onClick={() => navigate(`/admin/case-management`)}>
                    {/* <h1>Case History</h1>
                    <p>{data ? data.casecount : 'loading...'}</p> */}
                    <Heading as='h1' margin='0' fontSize='2em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>Case History</Heading>
                    <Heading as='h1' margin='0' fontSize='5em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>{data ? data.casecount : 'loading...'}</Heading>
                </div>
                <div className="new-cases-history-widget" onClick={() => navigate(`/admin/case-management`)}>
                    {/* <h1>New Cases</h1> */}
                    <Heading as='h1' margin='0' fontSize='3em' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>New Cases</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-l, #FF057C 0%, #8D0B93 50%, #321575 100%)' bgClip='text'>{data ? data.newcases : 'loading...'}</Heading>
                </div>
                <div className="admin-engagements-widget" onClick={() => navigate(`/admin/engagements`)}>
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>Engagements</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-l, #50cc7f 0%, #f5d100 100%)' bgClip='text'>{data ? data.engagements : 'loading...'}</Heading>
                </div>
            </div>
            
        </div>
     );
}
 
export default AdminDashboard;