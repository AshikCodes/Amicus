import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { motion } from 'framer-motion'
import { Badge, Button } from "@chakra-ui/react";



const AdminCases = () => {

    const navigate = useNavigate()
    
    const getCasesQuery = async () => {
         let res = await axios.get('http://localhost:3001/cases')
         console.log(`res.data.cases here is ${res.data.cases}`)
         return res.data.cases
    }

    const {isLoading, data, isError, error} = useQuery('cases', getCasesQuery)


    const handleRowClick = (caseid) => {
        navigate(`/admin/cases/${caseid}`)
    }
    
    return ( 
        <div>
            <motion.h1 initial={{y: -400, opacity: 0}} animate={{y: 0, opacity: 1}}>Current Cases Under Management</motion.h1>
            <motion.table initial={{y: -400, opacity: 0}} animate={{y: 0, opacity: 1}} className="cases-table">
                        <tr className="cases-table-header">
                            <th className="case-header" style={{fontWeight: 'bold'}}>Case</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Case Number</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Plan</th>
                            <th className="case-header" style={{fontWeight: 'bold'}}>Status</th>
                        </tr>
                        {data && data.map((casebrief) => 
                            <tr className="cases-table-row" onClick={() => handleRowClick(casebrief.caseid)}>
                            <td className="case-item">{casebrief.casetitle}</td>
                            <td className="case-item">{casebrief.caseid}</td>
                            <td className="case-item">{casebrief.caseplan}</td>
                            <td className="case-item">{casebrief.casestatus === 'complete' ? <Badge className="status-tag" colorScheme='green'>completed</Badge> : casebrief.casestatus === 'in progress' ? <Badge className="status-tag" colorScheme='purple'>in progress</Badge> : <Badge className="status-tag" colorScheme='red'>issue</Badge>}</td>
                        </tr>
                        )}
                    </motion.table>
        </div>
     );
}
 
export default AdminCases;