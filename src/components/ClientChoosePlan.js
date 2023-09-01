import { AbsoluteCenter, Badge, Box, Button, ButtonGroup, Divider, HStack, Heading, Icon, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import { motion } from "framer-motion";
import { CheckCircleIcon, CloseIcon, ChevronRightIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { Textarea } from '@chakra-ui/react'

import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
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

  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'

  import { PinInput, PinInputField } from '@chakra-ui/react'
import axios from "axios";
import { values } from "lodash";


const ClientChoosePlan = () => {

    const userObj = useSelector(state => state.user)
    const [plan, setPlan] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [pin, setPin] = useState('')
    const toast = useToast()
    const scrollToBtnRef = useRef()


    const [selectedPlan, setSelectedPlan] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [stepperIndex, setStepperIndex] = useState(0)

    const navigate = useNavigate()
    

    const planInfo = [
        {
            plan: 'Starter',
            info: "The Starter Plan is tailored for quick legal insights and assistance, making it an excellent entry point to our services. With a 30-minute consultation, you engage with our seasoned professionals. Whether you have contract questions, need a review, or seek concise advice, it's designed to efficiently address initial legal needs. Ideal for basic matters and quick support.",
            for: ['Individuals seeking initial legal guidance', 'Quick contract review', 'Basic consultation'],
            notFor: ['Businesses with complex legal needs', 'Individuals requiring in-depth analysis', 'Large-scale contract negotiations'],
            exampleWork: ['Quick legal advice on rental agreements', 'Review of a simple employment contract', 'Consultation for basic copyright queries']
        },
        {
            plan: 'Pro',
            info: "Tailored for entrepreneurs, individuals, and small businesses seeking comprehensive legal assistance. With a 1-hour consultation, benefit from complex contract review, business formation support, copyright registration, and estate planning. Your robust legal foundation for diverse needs.",
            for: ['Entrepreneurs', 'Small business owners', 'Individuals requiring a comprehensive legal foundation'],
            notFor: ['Large corporations with multifaceted legal requirements', 'Complex mergers and acquisitions'],
            exampleWork: ['Copyright registration for a book author', 'Consultation on partnership agreements for a startup', 'Drafting a detailed employment contract for a small business']
        },
        {
            plan: 'Enterprise',
            info: "Ideal for established businesses, startups, and high net worth individuals. With a 2-hour consultation, navigate complex legal landscapes. Covering intricate contracts, business guidance, patent assistance, and detailed estate planning. Tailored excellence for multifaceted challenges.",
            for: ['Entrepreneurs','Small business owners', 'Individuals requiring a comprehensive legal foundation', 'High net worth individuals'],
            notFor: ['Individuals with basic legal inquiries','Small ventures without significant legal complexities', 'Straightforward contract review'],
            exampleWork: ['Crafting a complex joint venture agreement', 'Providing legal analysis for international business expansion', 'Crafting a detailed estate plan for high net worth individual.']
        },
        {
            plan: 'Custom',
            info: "Designed for unique legal needs that don't fit standard plans. Tailored, flexible solution where you choose services, consultation duration, and assistance level. Ideal for unconventional cases, international transactions, and intricate challenges, providing precise and personalized legal support.",
            for: ['Specialized legal needs beyond standard plans.', 'Seeking tailored, adaptable legal solutions.', 'Unique legal strategies for individuals, businesses, and organizations.'],
            notFor: ['Straightforward inquiries covered by existing plans.', 'Quick advice without complexities.', 'Budget-constrained clients preferring predefined plans.'],
            exampleWork: ['Customized IP strategy for tech startup.', 'Legal guidance for cross-border acquisition.', 'Crafting unique legal framework for non-profit.']

        }
    ]

    const steps = [
        { title: 'First', description: 'Choose a plan' },
        { title: 'Second', description: 'Create your case brief' },
        { title: 'Third', description: 'Review Information' },
        { title: 'Fourth', description: 'Pay advance fee' },
      ]

    const handlePlanSelect = (e, plan) => {
        console.log(`Plan here is ${plan}`)
        const isActive = e.target.classList.contains('active');
        if(isActive){
            setStepperIndex(0)
            setPlan('')
            setSelectedPlan(null)
            setShowPin(false)
        }
        else {
            setStepperIndex(1) 
            setPlan(plan)
            var clickedPLan = planInfo.filter(planChoice => {
                return planChoice.plan = plan
            })
            setSelectedPlan(clickedPLan[0])
            
        }
        e.target.classList.toggle('active')
        // var clickedPLan = planInfo.filter(planChoice => {
        //     return planChoice.plan = plan
        // })
        // setSelectedPlan(clickedPLan[0])
        // setPlan(plan)
        onOpen()
    }

    const deselectPlan = () => {
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(element => {
          element.classList.remove('active');
        });
        setPlan('')
        setStepperIndex(0)
        onClose()
        setShowPin(false)
    }

    useEffect(() => {
        if(plan){
            if(plan === 'Starter'){
                setShowPin(false)
                setSelectedPlan(planInfo[0])
            }
            else if(plan === 'Pro'){
                setShowPin(false)
                setSelectedPlan(planInfo[1])
            }
            else if(plan === 'Enterprise'){
                setShowPin(false)
                setSelectedPlan(planInfo[2])
            }
            else if(plan === 'Custom'){
                setShowPin(true)
                setSelectedPlan(planInfo[3])
            }
        }
    },[plan])

    const handleCustomCase = async () => {
        try{
            console.log(`pin testing is ${pin}`)
            let res = await axios.post(`http://localhost:3001/custom-plan/check-pin/${pin}`)
            // console.log(`got custom case info: ${res.data.case[0].planquoteamount}`)
            let toastInfo = {
                title: 'Success',
                position: 'top-right',
                variant: 'subtle',
                status: 'success',
                duration: 1300,
                isClosable: false,
            }
            toast(toastInfo)
            navigate('/client/cases/new/case-brief', {state: {plan: plan, amount: res.data.case[0].planquoteamount}})
            
        }
        catch(err){
            console.log(`error message here is ${err}`)
            let toastInfo = {
                title: 'Incorrect Case PIN',
                position: 'top-right',
                variant: 'solid',
                status: 'error',
                duration: 3500,
                isClosable: false,
            }
            toast(toastInfo)
            console.log(`Incorrect pin: ${err}`)
        }
    }

    const scrollToBtn = (elementRef) => {
        console.log('clicked')
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        // console.log(`pin here is ${pin}`)
        if(pin.length === 5){
            scrollToBtn(scrollToBtnRef)
        }
    },[pin])


    return ( 
        <div>
            <div className="client-new-case-container" >
            
            <div className="new-case-container">
            <Stepper index={stepperIndex}  width='60vw' mt='3em' size='sm'>
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
            
            <Box position='relative' padding='10' mt='0.8em'>
            <Divider />
            <AbsoluteCenter bg='white' px='4' fontSize='2em' color='purple' fontWeight='bold' bgGradient='linear(to-l, #7928CA, #FF0080)' backgroundColor='white'   bgClip='text'>
            Choose a Pricing Plan
            </AbsoluteCenter>
            </Box>
            <p className="choose-plan-intro">Choose from our carefully crafted pricing plans, customized to meet your specific legal needs. Our skilled lawyers are well-prepared to offer personalized guidance and effective solutions for tax evasion cases, divorce proceedings, or vandalism disputes.</p>
            <div className="choose-plan-container">
                <div className={plan === 'Starter' ? 'plan-container active' : 'plan-container'} onClick={(e) => handlePlanSelect(e, 'Starter')}>
                    <h2 className="plan-title">Starter</h2>
                    <h1 className="plan-cost">$100</h1>
                </div>
                <div className={plan === 'Pro' ? 'plan-container active' : 'plan-container'} onClick={(e) => handlePlanSelect(e, 'Pro')}>
                    <h2 className="plan-title">Pro</h2>
                    <h1 className="plan-cost">$200</h1>
                </div>
                <div className={plan === 'Enterprise' ? 'plan-container active' : 'plan-container'} onClick={(e) => handlePlanSelect(e, 'Enterprise')}>
                    <h2 className="plan-title">Enterprise</h2>
                    <h1 className="plan-cost">$300</h1>
                </div>
                <div className={plan === 'Custom' ? 'plan-container active' : 'plan-container'} onClick={(e) => handlePlanSelect(e, 'Custom')}>
                    <h2 className="plan-title">Custom</h2>
                    <h1 className="plan-cost">Custom</h1>
                </div>
            </div>
            <p className="plan-note">*Note: You will be required to pay a 20% advance free for the plan of your choice.</p>
            {showPin && <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt='2.5em'>
            <Box display='flex' gap='0.5em' justifyContent='center' alignItems='center'>
            <Heading as='h3' size='md' bgGradient='linear(to-l, #7928CA, #FF0080)' backgroundColor='white' bgClip='text'>Case PIN</Heading>
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
            </Box>
            <HStack backgroundColor>
                <PinInput type='alphanumeric' onChange={(e) => setPin(e)}>
                    <PinInputField color="grey"/>
                    <PinInputField color="grey"/>
                    <PinInputField color="grey"/>
                    <PinInputField color="grey"/>
                    <PinInputField color="grey"/>
                </PinInput>
            </HStack>
            <Button ref={scrollToBtnRef} border='none' boxShadow='2xl' color='white' size='lg' mt='3em' p='1.5em' bgGradient='linear(-20deg, #00cdac 0%, #8ddad5 100%)' onClick={handleCustomCase}>Go to Case Brief</Button>
            </Box>}
            {(plan === 'Starter'|| plan === 'Pro' || plan === 'Enterprise') && <Button border='none' boxShadow='2xl' color='white' size='lg' mt='3em' p='1.5em' bgGradient='linear(-20deg, #00cdac 0%, #8ddad5 100%)' onClick={() => navigate('/client/cases/new/case-brief', {state: {plan: plan}})} _hover={{bgGradient: 'linear(-20deg, #00cdac 0%, #8ddad5 100%)', cursor: 'pointer'}}>Go to Case Brief</Button>}
            </div>
            {selectedPlan && <Drawer onClose={deselectPlan} isOpen={isOpen} size='md' >
                <DrawerOverlay />
                <DrawerContent bgGradient='linear(to-t, #ebc0fd 0%, #d9ded8 100%)'>
                <DrawerCloseButton />
                {selectedPlan.plan === 'Starter' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 🚀</DrawerHeader> : selectedPlan.plan === 'Pro' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 💼</DrawerHeader> : selectedPlan.plan === 'Enterprise' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 🏢</DrawerHeader> : selectedPlan.plan === 'Custom' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 🌟</DrawerHeader> : null}
                <DrawerBody>
                    <Box mt='-1em'>
                        <Text pt='2' fontSize='sm' textAlign='left' color='#607273'>
                          {selectedPlan.info}
                        </Text>
                      </Box>
                    <Box>
                        <Text pt='2' fontSize='md' textAlign='left'>
                          <Badge variant='solid' fontSize='sm' colorScheme="green">Who its for</Badge>
                        </Text>
                      </Box>
                    <Box>
                    <List >
                        {selectedPlan.for.map((forItem) => (<ListItem fontSize='sm' color='#607273'>
                            <ListIcon as={CheckCircleIcon} color='green.500'/>{forItem}
                        </ListItem>))}
                    </List>
                    <Text pt='2' fontSize='md' textAlign='left'>
                        <Badge variant='solid' fontSize='sm' colorScheme="red">Who its not for</Badge>
                    </Text>
                    </Box>
                    <List>
                        {selectedPlan.notFor.map((notForItem) => (<ListItem fontSize='sm' color='#607273'>
                            <ListIcon as={CloseIcon} color='red'/>{notForItem}
                        </ListItem>))}
                    </List>

                    <Box>
                    
                    <Text pt='2' fontSize='md' textAlign='left'>
                        <Badge variant='solid' fontSize='sm' colorScheme="blue">Example types of work</Badge>
                    </Text>
                    <List>
                        {selectedPlan.exampleWork.map((example) => (<ListItem fontSize='sm' color='#607273'>
                            <ListIcon as={ChevronRightIcon} color='green.500'/>{example}
                        </ListItem>))}
                    </List>
                    </Box>
                    {plan === 'Custom' ? <Box display='flex' justifyContent='center' alignContent='center' gap='1em' mt='3em'>
                        <Button  size='lg' color='white' border='none' bgGradient='linear(to right, #02AAB0 0%, #00CDAC  51%, #02AAB0  100%)' onClick={() => navigate('/client/cases/new/quote')} _hover={{bgGradient: 'linear(to right, #02AAB0 0%, #00CDAC  51%, #02AAB0  100%)', cursor: 'pointer'}}>GET QUOTE</Button>
                        <Button  size='lg' color='white' border='none' bgGradient='linear(-20deg, #b721ff 0%, #21d4fd 100%)' onClick={onClose} _hover={{bgGradient: 'linear(-20deg, #b721ff 0%, #21d4fd 100%)', cursor: 'pointer'}}>SELECT PLAN</Button>
                        </Box> : <Box display='flex' justifyContent='center' alignContent='center' gap='1em' mt='3em'><Button size='lg' color='white' border='none' bgGradient='linear(-20deg, #b721ff 0%, #21d4fd 100%)' onClick={onClose} _hover={{bgGradient: 'linear(-20deg, #b721ff 0%, #21d4fd 100%)', cursor: 'pointer'}}>SELECT PLAN</Button></Box>}
                </DrawerBody>
                </DrawerContent>
            </Drawer>}
            </div>
        </div>
     );
}
 
export default ClientChoosePlan;