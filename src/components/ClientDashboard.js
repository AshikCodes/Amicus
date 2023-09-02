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
            let result = await axios.post('http://localhost:3001/dashboard', {id: userObj.id})
            
            if(result.data.cases === null){
                setNoCases(true)
            }
            else {
                let mainCase = _.last(result.data.cases)
                let reversedArray = _.reverse(result.data.cases)
                setCurrentCase(mainCase)
                dashboard = {
                    caseplan: mainCase.caseplan,
                    casetitle: mainCase.casetitle,
                    caseoverview: mainCase.caseoverview,
                    documentslink: mainCase.documentslink,
                    casestatus: mainCase.casestatus,
                    casehistory: reversedArray
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
                {data && <div className="appointments-widget">
                    <h1 className="appointments-widget-title">Upcoming engagements</h1>
                    <p className="appointments-widget-content">1:30pm video conference</p>
                    <p className="appointments-widget-content">Sent more evidence documents</p>
                    <p className="appointments-widget-content">Review returned task</p>
                </div>}
                {!data && <div className="appointments-widget">
                    <SkeletonElement type='widget1-title' />
                    <SkeletonElement type='widget1-text' />
                    <SkeletonElement type='widget1-text' />
                    <SkeletonElement type='widget1-text' />
                </div>}
                {data && <div className="current-plan-widget">
                    {data && <h1 className="current-plan-widget-title">{data.caseplan}</h1>}
                    <p className="current-plan-widget-content">Current Plan</p>
                </div>}
                {!data && <div className="current-plan-widget">
                    <SkeletonElement type='widget2-title' />
                    <SkeletonElement type='widget2-text' />
                </div>}
                {data && <div className="current-case-widget">
                    {data && <h1 className="current-case-widget-title">{data.casetitle.substring(0,25)}...</h1>}
                    {data && <p className="current-case-widget-content">{data.caseoverview.substring(0,125)}...</p>}
                </div>}
                {!data && <div className="current-case-widget">
                    <SkeletonElement type='widget4-title' />
                    <SkeletonElement type='widget4-text' />
                    <SkeletonElement type='widget4-text'/>
                </div>}
                {data && <div className="current-case-status-widget">
                    {data && <div>
                        {data.casestatus === 'in progress' ? <h1 className="current-case-status-widget-title">In Progress 🚧</h1> : data.casestatus === 'complete' ? <h1 className="current-case-status-widget-title">Completed 🙌</h1> : null}
                        {data.casestatus === 'in progress' ? <p className="current-case-status-widget-content">Case Brief is currently being reviewed and worked on. If you have questions, please forward to our team.</p> :  data.casestatus === 'complete' ? <p className="current-case-status-widget-content">Case brief is complete! Go check it out in the Cases tab.</p> : null}
                    </div>}
                </div>}
                {!data && <div className="current-case-status-widget">
                    <SkeletonElement type='widget5-title' />
                    <SkeletonElement type='widget5-text' />
                </div>}
                {data && <div className="documents-widget">
                    <h1 className="documents-widget-title">Documents Overview</h1>
                    {data && <p className="documents-widget-content">{data.documentslink}</p>}
                </div>}
                {!data && <div className="documents-widget">
                    <SkeletonElement type='widget6-title' />
                    <SkeletonElement type='widget6-text' />
                    <SkeletonElement type='widget6-text' />
                    <SkeletonElement type='widget6-text' />
                </div>}
                {data && <div className="user-widget">
                    <h1 className="user-widget-title">Hi👋</h1>
                    {userObj && <p style={{fontWeight: 'bold', marginBottom: '2em'}} className="user-widget-name">{userObj.firstname}</p>}
                </div>}
                {!data && <div className="user-widget">
                    <SkeletonElement type='widget3-title' />
                    <SkeletonElement type='widget3-text' />
                </div>}
                {data && <div className="lawyer-info-widget">
                    <h1 className="lawyer-info-widget-title">Your Lawyer</h1>
                    <p className="lawyer-info-widget-content">Saul Goodman</p>
                    <p className="lawyer-info-widget-content">Experienced criminal lawyer.</p>
                    <p className="lawyer-info-widget-content">Studied at Harvard</p>
                </div>}
                {data && <div className="payment-info-widget">
                    <h1>Paid</h1>
                    </div>}
                {!data && <div className="lawyer-info-widget">
                    <SkeletonElement type='widget8-title' />
                    <SkeletonElement type='widget8-text' />
                    <SkeletonElement type='widget8-text' />
                    <SkeletonElement type='widget8-text' />
                </div>}
                {data && <div className="case-history-widget">
                    <h1 className="case-history-title">Cases History</h1>
                    <TableContainer>
                    <Table variant='simple' size='sm'>
                        <Thead>
                        <Tr>
                            <Th>Case</Th>
                            <Th>Plan</Th>
                            <Th>Status</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                           {data.casehistory.map((casebrief) => (<Tr onClick={() => navigate(`/client/cases/${casebrief.caseid}`)} _hover={{cursor: 'pointer'}}>
                                <Td>{casebrief.casetitle}</Td>
                                <Td>{casebrief.caseplan}</Td>
                                <Td>{casebrief.casestatus === 'in progress' ? <Badge className="status-tag" colorScheme='yellow'>in progress</Badge> : casebrief.casestatus === 'complete' ? <Badge className="status-tag" colorScheme='green'>complete</Badge> : null}</Td>
                            </Tr>))}
                        </Tbody>
                    </Table>
                    </TableContainer>

                </div>}
                {!data && <div className="case-history-widget">
                    <SkeletonElement type='widget7-title' />
                    <SkeletonElement type='widget7-text' />
                    <SkeletonElement type='widget7-text' />
                    <SkeletonElement type='widget7-text' />
                </div>}                
            </div> :<div className="client-dashboard-container no-cases">
                            <div className="no-cases-client-container">
                                <h1 className="no-cases-msg client" >Welcome to your client dashboard! No active cases? Time to create a new one! Click below to start your next legal journey!</h1>
                                <Button colorScheme="green" onClick={() => navigate('/client/cases/new/choose-plan')} _hover={{cursor: 'pointer'}}>Create Case Brief</Button>
                            </div>
                    </div>}    
        </div>
     );
}
 
export default ClientDashboard;


