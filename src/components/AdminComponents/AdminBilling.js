import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Heading, Stack } from "@chakra-ui/react";
import format from "date-fns/format";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const AdminBilling = () => {
    const userObj = useSelector(state => state.user)
    const navigate = useNavigate()

    const getBillingInfoQuery = async () => {
        let res = await axios.get('http://localhost:3001/admin/billing')
        console.log(`billing info here is ${JSON.stringify(res.data.payments)}`)
        return res.data.payments
   }

   const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage

   const {isLoading, data, isError, error} = useQuery('admin-payments', getBillingInfoQuery)


   let records
    let npages
    let numbers
    if(data){
        records = data.slice(firstIndex, lastIndex)
        npages = Math.ceil(data.length / recordsPerPage)
        numbers = [...Array(npages + 1).keys()].slice(1)
    }


   const handleInvoiceClick = (payment) => {
    navigate(`/admin/billing/${payment.paymentid}`)
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
            <div className="client-billing-container">
            <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Billing Management</Heading>
            {!records &&
                <Stack>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
                <Skeleton height='9vh' width='70vw' ml='5em' mb='0.3em'/>
              </Stack>
            }
            {records && <table className="billing-table">
                        <tr className="billing-table-header">
                            <th className="billing-header" style={{fontWeight: 'bold'}}>Case</th>
                            <th className="billing-header" style={{fontWeight: 'bold'}}>User</th>
                            <th className="billing-header" style={{fontWeight: 'bold'}}>Type</th>
                            <th className="billing-header" style={{fontWeight: 'bold'}}>Status</th>
                            <th className="billing-header" style={{fontWeight: 'bold'}}>Date Paid</th>
                        </tr>
                        {records && records.map((payment) => 
                            <tr className="billing-table-row" onClick={() => handleInvoiceClick(payment)}>
                                <td className="billing-item">{payment.casetitle}</td>
                                <td className="billing-item">{payment.userfirstname} {payment.userlastname}</td>
                                <td className="billing-item">{payment.paymenttitle}</td>
                                {payment.paymentstatus === 'not paid' ? <td className="billing-item">
                                    <Badge variant='outline' fontSize='sm' colorScheme="red">{payment.paymentstatus}</Badge>
                                </td> : payment.paymentstatus === 'paid' ? <td className="billing-item">
                                    <Badge variant='outline' fontSize='sm' colorScheme="green">{payment.paymentstatus}</Badge>
                                </td> : null}
                                {payment.paymentstatus === 'not paid' ? <td className="billing-item">NA</td> : payment.paymentstatus === 'paid' ? <td className="billing-item">{format(new Date(payment.paymentdate), "MMMM d, yyyy, h:mm a")}</td> : null}
                            </tr>
                        )}
                    </table>}
                    {records && <nav>
                {records && <ul className="pagination-container">
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
                </ul>}
            </nav>}
            </div>
            
        </div>
     );
}
 
export default AdminBilling;