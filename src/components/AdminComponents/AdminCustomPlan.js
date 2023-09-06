import { Box, Divider, Heading, Text, Textarea, Button, HStack, PinInput, PinInputField, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Icon, PopoverCloseButton } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { type } from "@testing-library/user-event/dist/type";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const AdminCustomPlan = () => {
    const [planInfo, setPlanInfo] = useState('')
    const [planCost, setPlanCost] = useState(1)
    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')
    const [planPin, setPlanPin] = useState('')
    const [clientEmail, setClientEmail] = useState()
    const [clientName, setClientName] = useState()
    const [clients, setClients] = useState()
    const scrollToBtnRef = useRef()
    const toast = useToast()
    const navigate = useNavigate()

    const generatePlanPin = () => {
        // setPlanPin(null)
        setPlanPin('');
        function generateRandomString(length) {
            const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
              randomString += alphanumericChars.charAt(randomIndex);
            }
            
            return randomString;
          }
          
          const randomString = generateRandomString(5);
          console.log(`randomString here is ${randomString}`)
          setPlanPin(randomString)
    }

    const sendCustomPlan = async () => {
        if(clientEmail === undefined || planInfo === '' || planCost === 1){
            let toastInfo = {
                title: 'Please fill out all fields',
                position: 'top-right',
                variant: 'solid',
                status: 'error',
                duration: 6500,
                isClosable: false,
            }
            toast(toastInfo)
        }
        else {
            // planquotepin planquoteamount

            try{
                // let clientName = getClientName(clientEmail)
                console.log(`before axios request, name is ${clientName}`)
                await axios.post('http://localhost:3001/custom-plan/new-quote', {planpin: planPin, planamount: planCost, planinfo: planInfo, clientemail: clientEmail, clientname: clientName})
                console.log(`successfully added plan quote`)
                let toastInfo = {
                    title: 'Custom Plan sent to client!',
                    description: 'Client should be receiving email with details and pin soon.', 
                    position: 'top-right',
                    variant: 'solid',
                    status: 'success',
                    duration: 6500,
                    isClosable: false,
                }
                toast(toastInfo)
                navigate('/admin/case-management')
            }
            catch(err){

            }
            
        }
        console.log(`the type of client email is ${typeof clientEmail}`)
        console.log(`sent to client`)
    }

    useEffect(() => {
        const getAllClients = async () => {
            try {
                let result = await axios.get('http://localhost:3001/get_clients')
                setClients(result.data.clients)
            }
            catch(err){
                console.log(`Error retrieving all clients: ${err}`)
            }
        }
        getAllClients()
        
    },[])

    

    const scrollToBtn = (elementRef) => {
        console.log('clicked')
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        // console.log(`pin here is ${pin}`)
        // if(pin.length === 5){
        //     scrollToBtn(scrollToBtnRef)
        // }
        if(planPin !== ''){
            scrollToBtn(scrollToBtnRef)
        }
    },[planPin])

    useEffect(() => {
        if(clientEmail){
            console.log(`client email here is ${clientEmail}`)
            console.log(`client name here is ${clientName}`)
        }
    }, [clientEmail])

    // const getClientName = async (email) => {
    //     let name = await clients.filter((client) => client.useremail === email)
    //     return name[0].userfirstname;
    // }

    const handleSelectAction = (value) => {
        if(value){
            let valueObj = JSON.parse(value)
            console.log(`value is ${valueObj.name}`)
            setClientEmail(valueObj.email)
            setClientName(valueObj.name)
        }
        
    }

    return ( 
        <div>
            <div className="custom-plan-container">
                <Box width='40vw' mt='3em'>
                    <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Custom Plan</Heading>
                    <Text fontSize='sm' textAlign='left' color='#607273'>Welcome to the Custom Plan Creation Page, your platform for crafting and delivering personalized plans to clients. Detail the plan comprehensively, and generate a unique case pin for easy client selection.</Text>
                    <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Select Client</Heading>
                    <Select placeholder='Select option' onChange={(e) => handleSelectAction(e.target.value)}>
                        {clients && clients.map((client) => (
                        <option value={JSON.stringify({
                            email: client.useremail,
                            name: client.userfirstname
                        })}>{client.useremail}</option>))}

                        {/* <option value='option2' >Option 2</option>
                        <option value='option3' >Option 3</option> */}
                    </Select>
                    <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Plan Information</Heading>
                    <Textarea resize='none' placeholder="This plan entails..." boxSizing="border-box" height='35vh' fontFamily='Arial' onChange={(e) => setPlanInfo(e.target.value)}/>

                    <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Plan Cost</Heading>
                    <NumberInput min={1} onChange={(valueString) => setPlanCost(parse(valueString))} value={format(planCost)}>
                        <NumberInputField boxSizing="border-box" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Generate Case PIN</Heading>
                    
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        <Button colorScheme="blue" onClick={generatePlanPin}>GENERATE PIN</Button>
                        <Popover placement="top" trigger="hover">
                        <PopoverTrigger>
                            <Icon as={InfoOutlineIcon} color='grey'/>
                        </PopoverTrigger>
                        <PopoverContent height='17vh' bgGradient='linear(to-r, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%)'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader fontWeight='bold'>Case PIN</PopoverHeader>
                            <PopoverBody>This is the PIN our team provides to you after we agreed on a custom case plan quote. It should be in your email.</PopoverBody>
                        </PopoverContent>
                    </Popover>
                        {planPin && <HStack mt='1em' mb='2em'>
                            <PinInput type='alphanumeric' value={planPin}>
                                <PinInputField color="grey"/>
                                <PinInputField color="grey"/>
                                <PinInputField color="grey"/>
                                <PinInputField color="grey"/>
                                <PinInputField color="grey"/>
                            </PinInput>
                        </HStack>}
                    </Box>
                    {planPin && <Button ref={scrollToBtnRef} mb='4em' colorScheme="green" onClick={sendCustomPlan}>SEND CUSTOM PLAN</Button>}
                </Box>
            </div>
        </div>
     );
}
 
export default AdminCustomPlan;