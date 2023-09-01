import { AbsoluteCenter, Badge, Box, Button, Divider, Heading, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import { motion } from "framer-motion";
import { CheckCircleIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Textarea } from '@chakra-ui/react'
import axios from "axios";

const ClientGetQuote = () => {
    const userObj = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [quoteDetails, setQuoteDetails] = useState('')
    const navigate = useNavigate()
    const toast = useToast()


    const submitQuoteRequest = async () => {
        let sender = userObj.email
        if(quoteDetails !== ''){
            try{
                await axios.post('http://localhost:3001/new/quote-request/', {sender, quoteDetails})
                let toastInfo = {
                    title: 'You successfully requested a quote!',
                    description:'Please wait for one of our team members to contact you via email regarding the quote.',
                    position: 'bottom-right',
                    variant: 'solid',
                    status: 'success',
                    duration: 6500,
                    isClosable: false,
                }
                toast(toastInfo)
                navigate('/client/cases/new/choose-plan')
            }
            catch(err){
                console.log(`Error submitting quote request. ${err}`)
            }
        }
    }

    return ( 
        <div>
            <div className="get-quote-container">
                <Box position='relative' padding='10' mt='8em'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='4' fontSize='2em' color='purple' fontWeight='bold' bgGradient='linear(to-l, #7928CA, #FF0080)' backgroundColor='white'   bgClip='text'>
                    Get Quote
                    </AbsoluteCenter>
                </Box>
                <Text fontSize='sm' textAlign='left' color='#607273'>Welcome to our Custom Plan inquiry. To ensure an accurate quote tailored to your case, please provide details about your legal needs, expectations, deadlines, and any specific challenges you anticipate. Your input allows us to create a personalized solution that meets your requirements effectively. Your information will be treated with utmost confidentiality. Please share insights in the textarea below.</Text>
                <Textarea resize='none' placeholder="Tell us more about your requirements and case..." width='43vw' height='35vh' mt='2em' fontFamily='Arial' onChange={(e) => setQuoteDetails(e.target.value)}/>
                <Button mt='1em' border='none' pl='2em' pr='2em' colorScheme="green" onClick={submitQuoteRequest}>SUBMIT</Button>
            </div>
        </div>
     );
}
 
export default ClientGetQuote;