import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AbsoluteCenter, Badge, Box, Card, CardBody, CardHeader, Divider, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'
import { motion } from "framer-motion";
import { Link } from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'

const ClientCaseDetails = () => {

    const {caseid} = useParams()
    const [caseInfo, setCaseInfo] = useState(null)
    const [caseStatus, setCaseStatus] = useState(false)
    const [editNum, setEditNum] = useState(null)


    let cases = [{
        id: 56543,
        title: 'United States vs. John Smith',
        submitted: '01/08/2023',
        description: 'The United States government alleges that John Smith, a wealthy businessman, committed tax evasion by deliberately underreporting his income and falsifying financial records.',
        factual: "John Smith owns multiple businesses and investment properties. The IRS investigation revealed discrepancies between reported income and actual financial transactions. Suspicious offshore transactions and hidden assets were discovered during the investigation.",
        objectives: "Determine the extent of tax evasion committed by John Smith. Calculate the accurate tax owed to the government and potential penalties. Establish legal defenses to minimize the consequences faced by the defendant.",
        documents: "Bank statements and financial records related to John Smith's businesses and properties. Evidence of transactions conducted through offshore accounts. Documentation related to tax returns and filings for the relevant years.",
        dates: "Date of IRS investigation initiation: July 12, 2023. Deadline for filing the defendant's response: September 30, 2023. First court hearing date: November 20, 2023",
        arguments: "The defendant's reported income is based on legitimate business losses, not evasion. The offshore transactions were for legal business purposes and not intended for tax evasion. The government failed to consider certain legitimate deductions in their calculation of taxes owed.", 
        opposing: "The United States government represented by the Internal Revenue Service (IRS) and prosecuting attorney.",
        plan: 'Enterprise',
        status: 'ONGOING'
    }, {
        id: 98762,
        title: 'Mark Johnson vs. Lisa Johnson',
        submitted: '01/02/2023',
        description: 'A divorce case filed by Mrs. Lisa Johnson against Mr. Mark Johnson. The case involves child custody arrangements, division of assets, and spousal support.',
        factual: "Lisa and Mark Johnson have been married for 10 years. They have two children aged 8 and 6. Irreconcilable differences and infidelity allegations contributed to the breakdown of their marriage.",
        objectives: "Secure a fair and favorable child custody arrangement for the Johnson children. Equitably divide the marital assets and debts between Lisa and Mark. Reach a spousal support agreement that considers both parties' financial needs.",
        documents: "Marriage certificate and documents related to the Johnson's wedding. Financial records, including income, expenses, and assets owned by both parties. Correspondence and records of attempts to resolve disputes amicably.",
        dates: "Date of separation: January 3, 2023. Mediation session scheduled: August 25, 2023. Divorce trial date: December 10, 2023",
        arguments: "Lisa should be awarded primary custody due to Mark's inconsistent involvement in parenting. The prenuptial agreement should be considered in the division of assets. Lisa deserves spousal support due to her role as a stay-at-home parent during the marriage.", 
        opposing: "The opposing party is Mr. Mark Johnson, represented by his attorney.",
        plan: 'Pro',
        status: 'ONGOING'
    }, {
        id: 15432,
        title: 'State vs. Smith',
        submitted: '06/29/2019',
        description: 'The state charges Jane Doe with vandalism for defacing public property during a protest. The case involves identifying the extent of damage caused and determining accountability.',
        factual: "Jane Doe participated in a public protest against a controversial government policy. During the protest, Jane allegedly sprayed graffiti on government buildings and vehicles. Surveillance footage captured the incident and led to her identification.",
        objectives: "Ascertain the extent of damage caused by Jane Doe's vandalism. Assess the evidence to determine whether the vandalism was an act of protest or intentional destruction. Evaluate possible penalties and restitution for the damages incurred.",
        documents: "Surveillance footage capturing Jane Doe engaging in the act of vandalism. Photographs of the defaced public property and vehicles. Witness statements from individuals present during the protest.",
        dates: "Date of vandalism incident: June 5, 2023. Pre-trial conference: September 15, 2023. Trial date set: October 28, 2023.",
        arguments: "Jane's actions were a form of protected free speech, not vandalism. The government buildings were defaced temporarily and can be easily restored. Jane's actions were not intended to cause permanent damage but to express dissent.", 
        opposing: "    The state prosecution is representing the opposing party in this case.",
        plan: 'Starter',
        status: 'ONGOING'
    }]

    useEffect(() => {
        const getCaseInfo = async () => {
            try {
                let result = await axios.get(`http://localhost:3001/case/${caseid}`)
                console.log(`result.data.case here is ${JSON.stringify(result.data.case)}`)
                if(result.data.case.casestatus === 'complete'){
                    setCaseStatus(true)
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
                      {caseStatus &&<Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Returned Case Assignment
                        </Heading>
                        <Link href={caseInfo.assignmentlink} isExternal textAlign='left' size='md'>
                            Download returned case assignment <DownloadIcon mx='2px' />
                        </Link>
                        {/* <a className="caseassigment-documents" href={caseInfo.assignmentlink}> Click here to download assignment docs</a> */}
                      </Box>}
                    </Stack>
                  </CardBody>
                </Card>
                </motion.div>}
                </div>
        </div>
     );
}
 
export default ClientCaseDetails;



// {caseInfo && <motion.div initial={{x: 400, opacity: 0}} animate={{x: 0, opacity: 1}}className="case-details-container">
//                     <h1 className="case-title">"{caseInfo.casetitle}"</h1> */}
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Overview
//                     </AbsoluteCenter>
//                     </Box>
//                     <h2 className="case-description-title">Overview</h2>
                    
//                     <div className="case-description-container">
//                          <p className="case-description" onClick={() => handleEditClick(1)}>{caseInfo.caseoverview}</p>
//                     </div>
//                    <Box position='relative' padding='10'> 
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Factual Information
//                     </AbsoluteCenter>
//                     </Box>
//                     <h2 className="case-factual-title">Factual Information</h2>
//                     <div className="case-factual-container">
//                         <p className="case-factual" onClick={() => handleEditClick(2)}>{caseInfo.casefactual}</p>
//                     </div>
//                     <h2 className="case-objectives-title">Objectives</h2>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Objectives
//                     </AbsoluteCenter>
//                     </Box>
//                     { <div> 
//                         <p className="case-objectives" onClick={() => handleEditClick(3)}>{caseInfo.caseobjectives}</p>
//                     </div> 
//                     <h2 className="case-documents-title">Documents</h2>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Documents
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-documents">{caseInfo.documentslink}</p>
//                     <a className="case-documents" href={caseInfo.documentslink}> Click here to download case docs</a>
//                     <h2 className="case-dates-title">Important Dates</h2>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Important Dates
//                     </AbsoluteCenter>
//                     // {/* </Box> */}
//                     <p className="case-dates">{caseInfo.casedates}</p>
//                     <h2 className="case-arguments-title">Legal Arguments</h2>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Legal Arguments
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-arguments">{caseInfo.casearguments}</p>
//                     <h2 className="case-opposing-title">Opposition</h2>
//                     <Box position='relative' padding='10'>
//                     <Divider />
//                     <AbsoluteCenter bg='white' px='4' color='purple' fontSize='1.7em'>
//                         Opposition
//                     </AbsoluteCenter>
//                     </Box>
//                     <p className="case-opposing">{caseInfo.caseopposition}</p>
//                   {caseStatus && <a className="caseassigment-documents" href={caseInfo.assignmentlink}> Click here to download assignment docs</a>}
//                 </motion.div>} 