import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { motion } from 'framer-motion'
import { Badge, Box, Button, Heading, Skeleton, Stack } from "@chakra-ui/react";



const ClientCases = () => {

    const navigate = useNavigate()
    const [caseList, setCaseList] = useState()
    const userObj = useSelector(state => state.user)

    
    const getCasesQuery = async () => {
         let res = await axios.post('http://localhost:3001/cases', {id: userObj.id})
         return res.data.cases
    }

    const {isLoading, data, isError, error} = useQuery('cases', getCasesQuery)

    // Paginate stuff
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage

    console.log(`lastIndex: ${lastIndex}. firstIndex: ${firstIndex}. currentPage: ${currentPage}`)

    let records
    let npages
    let numbers
    if(data){
        records = data.slice(firstIndex, lastIndex)
        npages = Math.ceil(data.length / recordsPerPage)
        numbers = [...Array(npages + 1).keys()].slice(1)
    }

    console.log(`npages: ${npages}. records: ${records}`)

 


    const handleRowClick = (caseid) => {
        navigate(`/client/cases/${caseid}`)
    }

    function prevPage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    
    function nextPage(){
        if(currentPage !== npages){
            setCurrentPage(currentPage + 1)
        }
    }
    
    function changeCPage(id){
        setCurrentPage(id)
    }
    
    return ( 
        <div>
            <div className="client-cases-container">
            {/* <motion.h1 initial={{y: -400, opacity: 0}} animate={{y: 0, opacity: 1}} className="client-cases-title">Case Information</motion.h1> */}
            <div>
            <Box display='flex' justifyContent='center' alignItems='center' position='relative'> 
            {/* <h1 className="client-cases-title">Case Information</h1> */}
            <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Case Information</Heading>
            <Button border='none' boxShadow='2xl' color='white' size='lg' ml='2em' p='1.5em' bgGradient='linear(-20deg, #00cdac 0%, #8ddad5 100%)' _hover={{bgGradient: 'linear(-20deg, #00cdac 0%, #8ddad5 100%)', cursor: 'pointer'}} position='absolute' right='2em'><Link to='/client/cases/new/choose-plan' style={{color: 'white', textDecoration: 'none'}}>Create new case</Link></Button>
            </Box>
            {!records && 
              <Stack>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
              </Stack>}
            {records && <table className="cases-table">
                        <tr className="cases-table-header">
                            <th className="case-header" style={{fontWeight: 'bold'}}>Case</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Case ID</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Plan</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Status</th>
                        </tr>
                        {/* {data && data.map((casebrief) => 
                            <tr className="cases-table-row" onClick={() => handleRowClick(casebrief.caseid)}>
                            <td className="case-item">{casebrief.casetitle}</td>
                            <td className="case-item">{casebrief.caseid}</td>
                            <td className="case-item">{casebrief.caseplan}</td>
                            <td className="case-item">{casebrief.casestatus === 'complete' ? <Badge className="status-tag" colorScheme='green'>completed</Badge> : casebrief.casestatus === 'in progress' ? <Badge className="status-tag" colorScheme='purple'>in progress</Badge> : <Badge className="status-tag" colorScheme='red'>issue</Badge>}</td>
                        </tr>
                        )} */}
                        {records && records.map((casebrief) => 
                            <tr className="cases-table-row" onClick={() => handleRowClick(casebrief.caseid)}>
                            <td className="case-item">{casebrief.casetitle}</td>
                            <td className="case-item">{casebrief.caseid}</td>
                            <td className="case-item">{casebrief.caseplan}</td>
                            <td className="case-item">{casebrief.casestatus === 'complete' ? <Badge className="status-tag" colorScheme='green'>completed</Badge> : casebrief.casestatus === 'in progress' ? <Badge className="status-tag" colorScheme='purple'>in progress</Badge> : <Badge className="status-tag" colorScheme='red'>issue</Badge>}</td>
                        </tr>
                        )}
                    </table>}
            </div>
            {records && <nav>
                <ul className="pagination-container">
                    <li className="page-item">
                        <a className="page-link" onClick={prevPage}>Prev</a>
                    </li>
                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'selectedLink' : ''}`}>
                            <a className="page-link" onClick={() => changeCPage(n)}>{n}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>}
            
                    {/* <motion.div initial={{y: 700, opacity: 0}} animate={{y: 0, opacity: 1}}> */}
                    {/* </motion.div> */}
                    {/* <Button  border='none' boxShadow='2xl' color='white' size='lg' mt='5em' p='1.5em' bgGradient='linear(-20deg, #00cdac 0%, #8ddad5 100%)' _hover={{bgGradient: 'linear(-20deg, #00cdac 0%, #8ddad5 100%)', cursor: 'pointer'}}><Link to='/client/cases/new/choose-plan' style={{color: 'white', textDecoration: 'none'}}>Create new case</Link></Button> */}
                    {/* <motion.Button  initial={{y: 700, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4}} colorScheme='teal' size='lg'><Link to='/client/cases/new' style={{color: 'white', textDecoration: 'none'}}>Create new case</Link></motion.Button> */}
                    {/* <motion.button className="create-new-case-btn" initial={{y: 700, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{delay: 0.4}}><Link to='/client/cases/new/choose-plan' style={{color: 'white', textDecoration: 'none'}}>Create new case</Link></motion.button> */}
            </div>
        </div>
     );
}


 
export default ClientCases;