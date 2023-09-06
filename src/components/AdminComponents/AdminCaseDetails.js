// import axios from "axios";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AbsoluteCenter, Box, Button, Divider } from '@chakra-ui/react'
// import { motion } from "framer-motion";

// const AdminCaseDetails = () => {

//     const {caseid} = useParams()
//     const [caseInfo, setCaseInfo] = useState(null)
//     const [editNum, setEditNum] = useState(null)
//     const [caseProgress, setCaseProgress] = useState(false) // True if not done, false if completed
//     const [clientId, setClientId] = useState(null)
//     const navigate = useNavigate()

//     useEffect(() => {
//         const getCaseInfo = async () => {
//             try {
//                 let result = await axios.get(`http://localhost:3001/case/${caseid}`)
//                 setClientId(result.data.case.clientid)
//                 console.log(`result.data.case here is ${JSON.stringify(result.data.case)}`)
//                 if(result.data.case.casestatus === 'in progress'){
//                     setCaseProgress(true)
//                 }
//                 setCaseInfo(result.data.case)
//             }
//             catch(err){
//                 console.log(`Error getting case details. ${err}`)
//             }
//         }
//         getCaseInfo()

//         const markCaseAsRead = async () => {
//             try {
//                 await axios.put(`http://localhost:3001/read/cases/${caseid}`)
//                 console.log(`Case marked as read: ${caseid}`)
//             }
//             catch(err){
//                 console.log(`Error marking case as read. ${err}`)
//             }
//         }
//         markCaseAsRead()

//     }, [])



//     const handleEditClick = (num) => {
//         setEditNum(num)
//     }

//     return ( 
//         <div>
//                 {caseInfo && <motion.div initial={{x: 400, opacity: 0}} animate={{x: 0, opacity: 1}}className="case-details-container">
//                     <h1 className="case-title">"{caseInfo.casetitle}"</h1>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Overview
//                     </AbsoluteCenter>
//                     </Box>
                    
//                     <div className="case-description-container">
//                          <p className="case-description" onClick={() => handleEditClick(1)}>{caseInfo.caseoverview}</p>
//                     </div>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Factual Information
//                     </AbsoluteCenter>
//                     </Box>
//                     <div className="case-factual-container">
//                         <p className="case-factual" onClick={() => handleEditClick(2)}>{caseInfo.casefactual}</p>
//                     </div>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Objectives
//                     </AbsoluteCenter>
//                     </Box>
//                     <div>
//                         <p className="case-objectives" onClick={() => handleEditClick(3)}>{caseInfo.caseobjectives}</p>
//                     </div> 
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Documents
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-documents">{caseInfo.documentslink}</p>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Important Dates
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-dates">{caseInfo.casedates}</p>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Legal Arguments
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-arguments">{caseInfo.casearguments}</p>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Opposition
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-opposing">{caseInfo.caseopposition}</p>
//                     {caseProgress && <Button colorScheme='purple' onClick={() => navigate(`/admin/cases/${caseid}/submit`, {state:{clientid: clientId, caseplan: caseInfo.caseplan}})}>Submit case brief</Button>}
//                 </motion.div>}
//         </div>
//      );
// }
 
// export default AdminCaseDetails;
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AbsoluteCenter, Badge, Box, Button, Card, CardBody, CardHeader, Divider, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import { motion } from "framer-motion";
import { Link } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'

const AdminCaseDetails = () => {

    const {caseid} = useParams()
    const [caseInfo, setCaseInfo] = useState(null)
    const [caseStatus, setCaseStatus] = useState(false)
    const [caseProgress, setCaseProgress] = useState(false) // True if not done, false if completed
    const [clientId, setClientId] = useState(null)
    const navigate = useNavigate()



    // useEffect(() => {
    //     const getCaseInfo = async () => {
    //         try {
    //             let result = await axios.get(`http://localhost:3001/case/${caseid}`)
    //             console.log(`result.data.case here is ${JSON.stringify(result.data.case)}`)
    //             if(result.data.case.casestatus === 'complete'){
    //                 setCaseStatus(true)
    //             }
    //             setCaseInfo(result.data.case)
    //         }
    //         catch(err){
    //             console.log(`Error getting case details. ${err}`)
    //         }
    //     }
    //     getCaseInfo()
    // }, [])
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

        const markCaseAsRead = async () => {
            try {
                await axios.put(`http://localhost:3001/read/cases/${caseid}`)
                console.log(`Case marked as read: ${caseid}`)
            }
            catch(err){
                console.log(`Error marking case as read. ${err}`)
            }
        }
        markCaseAsRead()

    }, [])

    return ( 
        <div>
          <div className="client-case-details-container">
                {caseInfo && <motion.div initial={{x: 400, opacity: 0}} animate={{x: 0, opacity: 1}} className="case-details-container">
                <Card boxShadow='xl' mt='2em' width='65vw' ml='5.5vw'>
                  <CardHeader>
                    <Heading size='md' as='h1' fontSize='3xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>{caseInfo.casetitle} Brief</Heading>
                  </CardHeader>
                  <CardBody mt='-20px'>
                    <Stack divider={<StackDivider />} spacing='3'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Overview
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.caseoverview}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Plan
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          <Badge variant='solid' fontSize='sm' colorScheme="green">{caseInfo.caseplan}</Badge>
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Factual Information
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.casefactual}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Objectives
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.caseobjectives}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Documents
                        </Heading>
                        <Link href={caseInfo.documentslink} isExternal textAlign='left' size='md'>
                            Download case documents <DownloadIcon mx='2px' />
                            {/* <Text pt='2' fontSize='sm' textAlign='left'>
                            Download case documets <DownloadIcon mx='2px' /> */}
                       {/* </Text> */}
                        </Link>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Important Dates
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.casedates}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Legal Arguments
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.casearguments}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Opposition
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {caseInfo.caseopposition}
                        </Text>
                      </Box>
                      {caseInfo.assignmentlink && <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Submitted Case Assignment
                        </Heading>
                        <Link href={caseInfo.assignmentlink} isExternal textAlign='left' size='md'>
                            Download case assignment <DownloadIcon mx='2px' />
                        </Link>
                        {/* <a className="caseassigment-documents" href={caseInfo.assignmentlink}> Click here to download assignment docs</a> */}
                      </Box>}
                      {caseProgress && <Button colorScheme='purple' onClick={() => navigate(`/admin/cases/${caseid}/submit`, {state:{clientid: clientId, caseplan: caseInfo.caseplan, casetitle: caseInfo.casetitle}})}>Submit case brief</Button>}
                    </Stack>
                  </CardBody>
                </Card>
                </motion.div>}
                </div>
        </div>
     );
}
 
export default AdminCaseDetails;