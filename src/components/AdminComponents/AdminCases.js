// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useQuery } from "react-query";
// import { motion } from 'framer-motion'
// import { Badge, Button, Heading } from "@chakra-ui/react";



// const AdminCases = () => {

//     const navigate = useNavigate()
    
//     const getCasesQuery = async () => {
//          let res = await axios.get('http://localhost:3001/cases')
//          console.log(`res.data.cases here is ${res.data.cases}`)
//          return res.data.cases
//     }

//     const {isLoading, data, isError, error} = useQuery('cases', getCasesQuery)


//     const handleRowClick = (caseid) => {
//         navigate(`/admin/cases/${caseid}`)
//     }
    
//     return ( 
//         <div>
//             {/* <h1>Current Cases Under Management</h1> */}
//             <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' ml='1em'>Current Cases Under Management</Heading>
//             <table className="cases-table">
//                         <tr className="cases-table-header">
//                             <th className="case-header" style={{fontWeight: 'bold'}}>Case</th>
//                             <th className="case-header" style={{fontWeight: 'bold'}}>Case Number</th>
//                             <th className="case-header" style={{fontWeight: 'bold'}}>Plan</th>
//                             <th className="case-header" style={{fontWeight: 'bold'}}>Status</th>
//                         </tr>
//                         {data && data.map((casebrief) => 
//                             <tr className="cases-table-row" onClick={() => handleRowClick(casebrief.caseid)}>
//                             <td className="case-item">{casebrief.casetitle}</td>
//                             <td className="case-item">{casebrief.caseid}</td>
//                             <td className="case-item">{casebrief.caseplan}</td>
//                             <td className="case-item">{casebrief.casestatus === 'complete' ? <Badge className="status-tag" colorScheme='green'>completed</Badge> : casebrief.casestatus === 'in progress' ? <Badge className="status-tag" colorScheme='purple'>in progress</Badge> : <Badge className="status-tag" colorScheme='red'>issue</Badge>}</td>
//                         </tr>
//                         )}
//                     </table>
//         </div>
//      );
// }
 
// export default AdminCases;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { motion } from 'framer-motion'
import { Badge, Box, Button, Heading, Skeleton, Stack } from "@chakra-ui/react";



const AdminCases = () => {

    const navigate = useNavigate()
    const [caseList, setCaseList] = useState()
    const userObj = useSelector(state => state.user)

    
    const getCasesQuery = async () => {
         let res = await axios.get('http://localhost:3001/cases')
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
        navigate(`/admin/cases/${caseid}`)
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
            <div>
            <Box display='flex' justifyContent='center' alignItems='center' position='relative'> 
            <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Case Management</Heading>
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
                            <th className="case-header" style={{fontWeight: 'bold'}}>Client</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Email</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Plan</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Status</th>
                        </tr>
                        {records && records.map((casebrief) => 
                            <tr className="cases-table-row" onClick={() => handleRowClick(casebrief.caseid)}>
                            <td className="case-item">{casebrief.casetitle}</td>
                            <td className="case-item">{casebrief.caseid}</td>
                            <td className="case-item">{casebrief.userfirstname} {casebrief.userlastname}</td>
                            <td className="case-item">{casebrief.useremail}</td>
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
            </div>
        </div>
     );
}


 
export default AdminCases;