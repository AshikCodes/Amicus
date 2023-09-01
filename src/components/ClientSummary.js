import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Stack, StackDivider, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Badge } from '@chakra-ui/react'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react'

const ClientSummary = ({fileData, casestuff}) => {
    const [userObj, setUserObj] = useState(null)
    // const docObj = useSelector(state => state.doc)
    const [stepperIndex, setStepperIndex] = useState(3)
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    console.log(location)

    let caseObj = {
      clientid: casestuff.clientid, 
      casetitle: casestuff.casetitle,
      caseoverview: casestuff.casetitle,
      caseplan: casestuff.caseplan,
      casefactual: casestuff.casefactual,
      caseobjectives: casestuff.caseobjectives,
      casedates: casestuff.casedates,
      casearguments: casestuff.casearguments,
      caseopposition: casestuff.caseopposition, 
      documentslink: 'dsferfwe',
      amount: casestuff.amount
    }

    
    const handleNewCase = async () => {
      
      
        try {
            let payment = {
                plan: caseObj.plan
            }

            let feeType = 'Advance fee'
            const formData = new FormData()
            formData.append('zipFile', fileData)
            formData.append('clientid', caseObj.clientid)
            formData.append('casetitle', caseObj.casetitle)
            formData.append('caseoverview', caseObj.caseoverview)
            formData.append('caseplan', caseObj.caseplan)
            formData.append('casefactual', caseObj.casefactual)
            formData.append('caseobjectives', caseObj.caseobjectives)
            formData.append('casearguments', caseObj.caselegal)
            formData.append('caseopposition', caseObj.caseopposition)
            formData.append('documentslink', 'dsd')
            formData.append('casedates', caseObj.casedates)
            formData.append('paymentType', feeType)
            // formData.append('payment', payment.plan)
            if(caseObj.caseplan === 'Custom'){
              console.log(`got into custom case block`)
              formData.append('customAmount', caseObj.amount)
            }

            // let res = await axios.post('http://localhost:3001/create-checkout-session', {payment, casestuff})
            let res = await axios.post('http://localhost:3001/create-checkout-session', formData)
            console.log(`res.data.url here is ${res.data.url}`)
            window.location = res.data.url
            // await axios.post('http://localhost:3001/create/casebrief', {clientid: userObj.id, casetitle: location.state.title, caseoverview: location.state.overview, caseplan: location.state.plan, casefactual: location.state.factual, caseobjectives: location.state.objectives, casedates: location.state.dates, casearguments: location.state.legal, caseopposition: location.state.opposition, documentslink: 'hehuehfefjwe'})
            // navigate('/client/cases')
        }
        catch(err){
            console.log(`Could not create new case brief: ${err}`)
        }
    }

    useEffect(() => {
      // console.log(location.state.documentslink)
        const userInfo = JSON.parse(localStorage.getItem("loggedAppUser"));
        setUserObj(userInfo)

        console.log(`filedata here is ${fileData}`)

        var newObject  = {
          'lastModified'     : fileData.lastModified,
          'lastModifiedDate' : fileData.lastModifiedDate,
          'name'             : fileData.name,
          'size'             : fileData.size,
          'type'             : fileData.type
       };  

      //  console.log(newObject);
      console.log(caseObj)
    

    // const formDataObj = {};
    // fileData.forEach((value, key) => (formDataObj[key] = value));
    // console.log(formDataObj)
    // console.log(`fileData here is ${docObj}`)
  },[])

  useEffect(() => {
    if(!casestuff.caseplan){
      navigate('/client/cases/new/choose-plan/')
    }
  },[])

  const steps = [
    { title: 'First', description: 'Choose a plan' },
    { title: 'Second', description: 'Create your case brief' },
    { title: 'Third', description: 'Review Information' },
    { title: 'Fourth', description: 'Pay advance fee' },
  ]


    return ( 
        <div>
            <div className="summary-page">
            
                <div className="summary-container">
                <Stepper index={stepperIndex}  width='60vw' mt='3em' ml='-8em' size='sm'>
                {steps.map((step, index) => (
                    <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                    </Step>
                ))}
            </Stepper>
                {casestuff && <div>
                <Card boxShadow='xl' mt='2em'>
                  <CardHeader>
                    <Heading size='md' as='h1' fontSize='3xl'>Case Brief Summary</Heading>
                  </CardHeader>
                  <CardBody mt='-20px'>
                    <Stack divider={<StackDivider />} spacing='3'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Title
                          
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.casetitle}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Plan
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          <Badge variant='solid' fontSize='sm' colorScheme="green">{casestuff.caseplan}</Badge>
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Overview
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.caseoverview}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Factual Information
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.casefactual}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Objectives
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.caseobjectives}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Important Dates
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.casedates}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Arguments
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.casearguments}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase' textAlign='left' fontSize='md' color='rgb(93, 63, 211)'>
                          Opposition
                        </Heading>
                        <Text pt='2' fontSize='sm' textAlign='left'>
                          {casestuff.caseopposition}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
                </div>}
                    <Button onClick={onOpen} size='lg' colorScheme="teal" mt='1em' mb='1em' border='none' boxShadow='dark-lg' rightIcon={<CheckCircleIcon />}>Confirm</Button>
                </div>
            </div>
    <div>
      <AlertDialog motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        >
        <AlertDialogOverlay />

        <AlertDialogContent style={{height: '15em'}}>
          <AlertDialogHeader>Confirm Case Brief?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to continue to the payment screen? Please make sure all details regarding case brief is correct.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} width='4.5em' onClick={onClose} colorScheme="red" border='none'>
              No
            </Button>
            <Button colorScheme='green' width='4.5em' ml={3} onClick={handleNewCase} border='none'>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
            </div>
        </div>
     );
}
 
export default ClientSummary;