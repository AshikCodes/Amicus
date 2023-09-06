import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
import SkeletonElement from "../skeletons/SkeletonElement";
import { motion } from "framer-motion";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Badge,
    Button,
    Box,
    Heading,
    Text,
  } from '@chakra-ui/react'
import { Link } from "react-router-dom";


const ClientDashboard = () => {
    const userObj = useSelector(state => state.user)
    const _ = require("lodash");

    const [currentCase, setCurrentCase] = useState(null)
    const [noCases, setNoCases] = useState(false)
    const navigate = useNavigate()



    const getDashboardInfo = async () => {
            let dashboard
            // let result = await axios.post('http://localhost:3001/dashboard', {id: userObj.id})
            let result = await axios.post('http://localhost:3001/client/dashboard', {clientid: userObj.id})
            console.log(`result.data here is ${JSON.stringify(result.data)}`)
            
            if(result.data.cases === null){
                setNoCases(true)
            }
            else {
                // let mainCase = _.last(result.data.cases)
                // let reversedArray = _.reverse(result.data.cases)
                // setCurrentCase(mainCase)
                // dashboard = {
                //     caseplan: mainCase.caseplan,
                //     casetitle: mainCase.casetitle,
                //     caseoverview: mainCase.caseoverview,
                //     documentslink: mainCase.documentslink,
                //     casestatus: mainCase.casestatus,
                //     casehistory: reversedArray
                // }
                dashboard = {
                    currentcaseplan: result.data.currentcaseplan,
                    currentcasestatus: result.data.currentcasestatus,
                    currentcasetitle: result.data.currentcasetitle,
                    casehistory: result.data.casehistory,
                    unpaid: result.data.unpaid,
                    engagements: result.data.engagements,
                    unreadmessages: result.data.unreadmessages,
                    currentcaseid: result.data.currentcaseid
                }
            
            }

            return dashboard
    }

    const {isLoading, data, isError, error} = useQuery('dashboard', getDashboardInfo)




    useEffect(() => {
        console.log(`rendered dashboard`)
    }, [])

    return ( 
        <div>
            {!noCases ? <div className="client-dashboard-container">
                {data && <div className="client-engagements-widget" onClick={() => navigate('/client/engagements')} >
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>Engagements</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>{data ? data.engagements : 'loading...'}</Heading>
                    {/* <Text fontSize='2xl' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text' m='0'>{data ? data.engagements : 'loading...'}</Text> */}
                </div>}
                {data && <div className="current-plan-widget" onClick={() => navigate(`/client/cases/${data.currentcaseid}`)}>
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='1.5em' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>{data ? data.currentcaseplan : 'loading...'}</Heading>
                    <Text fontSize='2xl' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text' m='0'>Case Plan</Text>
                </div>}
                {data && <div className="current-case-widget" onClick={() => navigate(`/client/cases/${data.currentcaseid}`)}>
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-r, #84fab0 0%, #8fd3f4 100%)' bgClip='text'>Current Case</Heading>
                    <Text fontSize='2xl' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>{data ? data.currentcasetitle : 'loading...'}</Text>
                </div>}
                {data && <div className="current-case-status-widget" onClick={() => navigate(`/client/cases/${data.currentcaseid}`)}>
                    {data && <div>
                        <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>Case Status</Heading>
                    <Text fontSize='2xl' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>{data ? data.currentcasestatus.toUpperCase() : 'loading...'}</Text>
                    </div>}
                </div>}
                {data && <div className="payment-info-widget" onClick={() => navigate(`/client/billing`)}>
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>Unpaid Payments</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>{data ? data.unpaid : 'loading...'}</Heading>
                    </div>}
                {data && <div className="case-history-widget" onClick={() => navigate(`/client/cases`)}>
                    <Heading as='h1' margin='0' mt='0.5em' fontSize='3em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>Cases History</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-r, #3ab5b0 0%, #3d99be 31%, #56317a 100%)' bgClip='text'>{data ? data.casehistory : 'loading...'}</Heading>

                </div>}   
                {data && <div className="client-unread-messages-widget" onClick={() => navigate(`/client/messages`)}>
                    <Heading as='h1' margin='0' fontSize='3em' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>Messages</Heading>
                    <Heading as='h1' margin='0' fontSize='6em' bgGradient='linear(to-r, #0fd850 0%, #f9f047 100%)' bgClip='text'>{data ? data.unreadmessages : 'loading...'}</Heading>

                </div>}            
            </div> : <div className="client-dashboard-container no-cases">
                            <div className="no-cases-client-container">
                                <h1 className="no-cases-msg client" >Welcome to your client dashboard! No active cases? Time to create a new one! Click below to start your next legal journey!</h1>
                                <Button colorScheme="green" onClick={() => navigate('/client/cases/new/choose-plan')} _hover={{cursor: 'pointer'}}>Create Case Brief</Button>
                            </div>
                    </div>}    
        </div>
     );
}
 
export default ClientDashboard;


{/* {data.casestatus === 'in progress' ? <h1 className="current-case-status-widget-title">In Progress 🚧</h1> : data.casestatus === 'complete' ? <h1 className="current-case-status-widget-title">Completed 🙌</h1> : null}
                        {data.casestatus === 'in progress' ? <p className="current-case-status-widget-content">Case Brief is currently being reviewed and worked on. If you have questions, please forward to our team.</p> :  data.casestatus === 'complete' ? <p className="current-case-status-widget-content">Case brief is complete! Go check it out in the Cases tab.</p> : null} */}