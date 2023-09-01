import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import axios from "axios";
import { useQuery } from "react-query";
// import SkeletonElement from "../skeletons/SkeletonElement";
import { motion } from "framer-motion";


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



    const getDashboardInfo = async () => {
            let result = await axios.post('http://localhost:3001/dashboard', {id: userObj.id})
            let mainCase = _.last(result.data.cases)
            let reversedArray = _.reverse(result.data.cases)
            setCurrentCase(mainCase)
            let dashboard = {
                caseplan: mainCase.caseplan,
                casetitle: mainCase.casetitle,
                caseoverview: mainCase.caseoverview,
                documentslink: mainCase.documentslink,
                casestatus: mainCase.casestatus,
                casehistory: reversedArray
            }
            return dashboard
        
        
    }

    // const {isLoading, data, isError, error} = useQuery('dashboard', getDashboardInfo)




    useEffect(() => {
        console.log(`rendered dashboard`)
    }, [])

    return ( 
        <div>
            <div className="admin-dashboard-container">
                <h1 className="no-cases-msg">No Cases, No Worries! Your legal expertise will soon be in high demand.🚀</h1>
            </div>
            
        </div>
     );
}
 
export default AdminDashboard;