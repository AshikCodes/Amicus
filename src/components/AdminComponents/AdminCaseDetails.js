import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AbsoluteCenter, Box, Button, Divider } from '@chakra-ui/react'
import { motion } from "framer-motion";

const AdminCaseDetails = () => {

    const {caseid} = useParams()
    const [caseInfo, setCaseInfo] = useState(null)
    const [editNum, setEditNum] = useState(null)
    const [caseProgress, setCaseProgress] = useState(false) // True if not done, false if completed
    const [clientId, setClientId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getCaseInfo = async () => {
            try {
                let result = await axios.get(`http://localhost:3001/case/${caseid}`)
                setClientId(result.data.case.clientid)
                console.log(`result.data.case here is ${JSON.stringify(result.data.case)}`)
                if(result.data.case.casestatus === 'in progress'){
                    setCaseProgress(true)
                }
                setCaseInfo(result.data.case)
            }
            catch(err){
                console.log(`Error getting case details. ${err}`)
            }
        }
        getCaseInfo()
    }, [])



    const handleEditClick = (num) => {
        setEditNum(num)
    }

    return ( 
        <div>
                {caseInfo && <motion.div initial={{x: 400, opacity: 0}} animate={{x: 0, opacity: 1}}className="case-details-container">
                    <h1 className="case-title">"{caseInfo.casetitle}"</h1>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Overview
                    </AbsoluteCenter>
                    </Box>
                    
                    <div className="case-description-container">
                         <p className="case-description" onClick={() => handleEditClick(1)}>{caseInfo.caseoverview}</p>
                    </div>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Factual Information
                    </AbsoluteCenter>
                    </Box>
                    <div className="case-factual-container">
                        <p className="case-factual" onClick={() => handleEditClick(2)}>{caseInfo.casefactual}</p>
                    </div>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Objectives
                    </AbsoluteCenter>
                    </Box>
                    <div>
                        <p className="case-objectives" onClick={() => handleEditClick(3)}>{caseInfo.caseobjectives}</p>
                    </div> 
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Documents
                    </AbsoluteCenter>
                    </Box>
                    <p className="case-documents">{caseInfo.documentslink}</p>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Important Dates
                    </AbsoluteCenter>
                    </Box>
                    <p className="case-dates">{caseInfo.casedates}</p>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Legal Arguments
                    </AbsoluteCenter>
                    </Box>
                    <p className="case-arguments">{caseInfo.casearguments}</p>
                    <Box position='relative' padding='10'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
                        Opposition
                    </AbsoluteCenter>
                    </Box>
                    <p className="case-opposing">{caseInfo.caseopposition}</p>
                    {caseProgress && <Button colorScheme='purple' onClick={() => navigate(`/admin/cases/${caseid}/submit`, {state:{clientid: clientId, caseplan: caseInfo.caseplan}})}>Submit case brief</Button>}
                </motion.div>}
        </div>
     );
}
 
export default AdminCaseDetails;