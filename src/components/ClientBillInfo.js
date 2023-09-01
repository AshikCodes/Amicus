import { Box, Button, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import format from "date-fns/format";

const ClientBillInfo = () => {
    const { paymentid } = useParams()
    const [paymentInfo, setPaymentInfo] = useState(null)   
    
    useEffect(() => {
        const getPaymentInfo = async () => {
            try {
                let res = await axios.get(`http://localhost:3001/payment/${paymentid}`)
                setPaymentInfo(res.data.paymentInfo)
            }
            catch(err){
                console.log(`Error getting payment info: ${err}`)
            }
        }
        getPaymentInfo()
    },[])

    const handlePayment = async () => {
        console.log(`got in handle payment block`)
        let res = await axios.post('http://localhost:3001/final-checkout-session', {paymentid: paymentInfo.paymentid})
        console.log(`res.data.url here is ${res.data.url}`)
        window.location = res.data.url
    }
    
    return ( 
        <div>
            {paymentInfo && <div className="client-billing-info-container">
                {/* <h1>Welcome to the Bill Info page!!!</h1>
                <h2>Payment Title: {paymentInfo.paymenttitle}</h2>
                <h2>Payment Amount: {paymentInfo.paymentamount}</h2>
                <h2>Payment Status: {paymentInfo.paymentstatus}</h2>
                {paymentInfo.paymentstatus === 'not paid' && <Button onClick={handlePayment}>Pay</Button>} */}
                <Card boxShadow='xl' mt='2em' width='35vw' ml='30%'>
                  <CardHeader>
                    <Heading size='md' as='h1' fontSize='3xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Payment Report</Heading>
                  </CardHeader>
                  <CardBody mt='-20px'>
                    <Stack divider={<StackDivider />} spacing='3'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Type
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {paymentInfo.paymenttitle}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Amount
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          ${paymentInfo.paymentamount}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Status
                        </Heading>
                        {paymentInfo.paymentstatus === 'not paid' ? 
                        <Text pt='2' fontSize='md' textAlign='left'>
                             <Badge variant='outline' fontSize='sm' colorScheme="red">{paymentInfo.paymentstatus}</Badge>
                        </Text> : paymentInfo.paymentstatus === 'paid' ?
                        <Text pt='2' fontSize='md' textAlign='left'>
                            <Badge variant='outline' fontSize='sm' colorScheme="green">{paymentInfo.paymentstatus}</Badge>
                        </Text> : null
                        }
                      </Box>
                      {paymentInfo.paymentstatus === 'paid' && <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Date Paid
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {format(new Date(paymentInfo.paymentdate), "MMMM d, yyyy, h:mm a")}
                        </Text>
                      </Box>}
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Case
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {paymentInfo.casetitle}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Case ID
                        </Heading>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          {paymentInfo.caseid}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                  {paymentInfo.paymentstatus === 'not paid' && <Button width='40%' ml='30%' mb='1em' colorScheme="green" color='white' border='none' onClick={handlePayment}>Pay</Button>}
                </Card>
            </div>}
        </div>
     );
}
 
export default ClientBillInfo;