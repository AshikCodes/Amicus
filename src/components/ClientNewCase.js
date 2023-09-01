import { AbsoluteCenter, Badge, Box, Button, Divider, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import { CheckCircleIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons'

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


const ClientNewCase = () => {

    const userObj = useSelector(state => state.user)
    const [plan, setPlan] = useState('')
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [factual, setFactual] = useState('')
    const [objectives, setObjectives] = useState('')
    const [dates, setDates] = useState('')
    const [legal, setLegal] = useState('')
    const [opposition, setOpposition] = useState('')
    const [selectedZip, setSelectedZip] = useState(null)


    const [selectedPlan, setSelectedPlan] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [stepperIndex, setStepperIndex] = useState(0)
    
    const [caseObject, setCaseObject] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    let casestuff;

    const [goToSummaryPage, setGoToSummaryPage] = useState(false)

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
    ]

    const steps = [
        { title: 'First', description: 'Choose a plan' },
        { title: 'Second', description: 'Submit your case brief' },
        { title: 'Third', description: 'Pay advance fee' },
      ]

    const handlePlanSelect = (e, plan) => {
        const isActive = e.target.classList.contains('active');
        if(isActive){
            setStepperIndex(0)
        }
        else {
            setStepperIndex(1) 
        }
        e.target.classList.toggle('active')
        var clickedPLan = planInfo.filter(planChoice => {
            return planChoice.plan = plan
        })
        setSelectedPlan(clickedPLan[0])
        setPlan(plan)
        onOpen()
    }

    const deselectPlan = () => {
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(element => {
          element.classList.remove('active');
        });
        setStepperIndex(0)
        onClose()

    }

    useEffect(() => {
        if(plan){
            if(plan === 'Starter'){
                setSelectedPlan(planInfo[0])
            }
            else if(plan === 'Pro'){
                setSelectedPlan(planInfo[1])
            }
            else if(plan === 'Enterprise'){
                setSelectedPlan(planInfo[2])
            }
        }
    },[plan])

    const goToSummary = () => {
        setCaseObject({
            clientid: userObj.id, 
            casetitle: title,
            caseoverview: overview,
            caseplan: plan,
            casefactual: factual,
            caseobjectives: objectives,
            casedates: dates,
            casearguments: legal,
            caseopposition: opposition
        })
        setGoToSummaryPage(true)
        const caseDocument = new FormData()
        caseDocument.append("zip", selectedZip)
        caseDocument.append("caseid", 'gfvhbjnkmjuh')
        

        // dispatch(setDocData(selectedZip))


        // setTimeout(() => {
            // navigate('/client/cases/new/summary', {state: {title, overview, factual, objectives, dates, legal, opposition, plan}})

        // }, 4000)

        
        // {data: {overview, factual, objectives, dates, legal, opposition, plan: 'Starter'}}
    }

    useEffect(() => {
        if(plan){
            console.log(`plan here is ${plan}`)
        }
    }, [plan])

    // useEffect(() => {
    //     if(selectedZip){
    //     const caseDocument = new FormData()
    //     caseDocument.append("zip", selectedZip)
    //     caseDocument.append("caseid", selectedZip)
        
        
    //     const formDataObj = {};
    //     caseDocument.forEach((value, key) => (formDataObj[key] = value));
    //     console.log(formDataObj)
    //     }
    // },[selectedZip])


    return ( 
        <div>
            <div className="client-new-case-container">
            
            {!goToSummaryPage && <div className="new-case-container">
            <Stepper index={stepperIndex}  width='60vw' mt='3em'>
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
            {/* <h1 >Create a New Case</h1> */}
            {/* <h2 className="choose-plan-title">Choose a Pricing Plan 🎯</h2> */}
            <Box position='relative' padding='10' mt='0.8em'>
            <Divider />
            <AbsoluteCenter bg='white' px='4' fontSize='2em' color='purple' fontWeight='bold' bgGradient='linear(to-l, #7928CA, #FF0080)' backgroundColor='white'   bgClip='text'>
            Choose a Pricing Plan
            </AbsoluteCenter>
            </Box>
            {/* <Stack direction='row' h='100px' >
            <Divider orientation='vertical' />
            <Text>Choose a pricing plan</Text>
            </Stack> */}
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
                <div className={plan === 'Enterprise Custom' ? 'plan-container active' : 'plan-container'} onClick={(e) => handlePlanSelect(e, 'Enterprise Custom')}>
                    <h2 className="plan-title">Enterprise Custom</h2>
                    <h1 className="plan-cost">Custom</h1>
                </div>
            </div>
            <p className="plan-note">*Note: You will be required to pay a 20% advance free for the plan of your choice.</p>
            <Box position='relative' padding='10'>
            <Divider />
            <AbsoluteCenter bg='white' px='4' fontSize='2em' color='purple' fontWeight='bold'>
            Submit your Case Brief 📥
            </AbsoluteCenter>
            </Box>
            <p className="choose-plan-intro">Congratulations on taking the first step towards seamless legal support! Our experienced lawyers are ready to assist you as you submit your case brief. Our user-friendly form will guide you through providing essential case details, enabling us to give you the best possible result. Let's get started!</p>
            <div className="new-case-form-container">
                <form action="submit" className="new-case-form">

                <div className="new-case-input-container">
                    <label for="title" className="title-label"><b className="new-case-header">Title</b></label>
                    <p className="new-case-intro">Please give a title for the Case Brief</p>
                    <textarea name="overview" className="new-case-input" onChange={(e) => setTitle(e.target.value)} style={{height: '10vh'}}/>
                    </div>

                    <div className="new-case-input-container">
                    <label for="overview" className="overview-label"><b className="new-case-header">Overview</b></label>
                    <p className="new-case-intro">Provide a brief summary of your case, including the names of parties involved and a concise description of the legal issue you are facing.</p>
                    <textarea name="overview" className="new-case-input" onChange={(e) => setOverview(e.target.value)}/>
                    </div>


                    <div className="new-case-input-container">
                    <label for="factual" className="factual-label"><b className="new-case-header">Factual Information</b></label>
                    <p className="new-case-intro">Share the essential facts related to your case, such as the sequence of events, key dates, and interactions among the parties involved.</p>
                    <textarea name="factual" className="new-case-input" onChange={(e) => setFactual(e.target.value)}/>
                    </div>


                    <div className="new-case-input-container">
                    <label for="objectives" className="objectives-label"><b className="new-case-header">Objectives</b></label>
                    <p className="new-case-intro">Clearly outline your desired outcomes and objectives for the case, expressing what you hope to achieve through legal action.</p>
                    <textarea name="objectives" className="new-case-input" onChange={(e) => setObjectives(e.target.value)}/>
                    </div>

                    <div className="new-case-input-container">
                    <label for="documents" className="documents-label"><b className="new-case-header">Documents</b></label>
                    <p className="new-case-intro">Upload any relevant documents, evidence, or contracts that support your case. These files will assist our lawyers in understanding the context of your situation. Please provide a zip file with all important documents</p>
                    <input type="file" className="add-docs-input" accept=".zip" onChange={(e) => setSelectedZip(e.target.files[0])}/>
                    </div>

                    <div className="new-case-input-container">
                    <label for="dates" className="dates-label"><b className="new-case-header">Important Dates</b></label>
                    <p className="new-case-intro">Highlight any critical dates or upcoming deadlines related to your case, such as court appearances or filing dates.</p>
                    <textarea name="dates" className="new-case-input" onChange={(e) => setDates(e.target.value)}/>
                    </div>

                    <div className="new-case-input-container">
                    <label for="arguments" className="arguments-label"><b className="new-case-header">Legal Arguments</b></label>
                    <p className="new-case-intro">If you have specific legal arguments or precedents to support your position, provide a summary of these points to strengthen your case.</p>
                    <textarea name="arguments" className="new-case-input"onChange={(e) => setLegal(e.target.value)}/>
                    </div>

                    <div className="new-case-input-container">
                    <label for="opposition" className="opposition-label"><b className="new-case-header">Opposition</b></label>
                    <p className="new-case-intro">If applicable, mention the opposing party's position or arguments to help our lawyers better understand the dynamics of the case.</p>
                    <textarea name="opposition" className="new-case-input" onChange={(e) => setOpposition(e.target.value)}/>
                    </div>
                </form>
            </div>
            {/* <button className="plan-summary-btn" ><Link to={{pathname: '/client/cases/new/summary', state: [overview, factual, objectives, dates, legal, opposition, plan]}}>GO TO REVIEW</Link></button> */}
            {/* <button className="plan-summary-btn" onClick={() => {navigate('/client/cases/new/summary', {state: {plan: 'Starter'}})}}>GO TO REVIEW</button> */}
            {/* <button className="plan-summary-btn" onClick={goToSummary}>GO TO REVIEW</button> */}
            <Button colorScheme='blue' onClick={goToSummary}>Go to Review</Button>
            </div>}
            {goToSummaryPage && <ClientSummary fileData={selectedZip} casestuff={caseObject}/>}
            {selectedPlan && <Drawer onClose={deselectPlan} isOpen={isOpen} size='md' >
                <DrawerOverlay />
                {/* backgroundColor='#E6E6FA' */}
                <DrawerContent bgGradient='linear(to-t, #ebc0fd 0%, #d9ded8 100%)'>
                <DrawerCloseButton />
                {selectedPlan.plan === 'Starter' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 🚀</DrawerHeader> : selectedPlan.plan === 'Pro' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 💼</DrawerHeader> : selectedPlan.plan === 'Enterprise' ? <DrawerHeader fontSize='2em' color='#8B008B'>The "{selectedPlan.plan}" Plan 🏢</DrawerHeader> : null}
                <DrawerBody>
                    {/* <p>
                    {selectedPlan.info}
                    </p> */}
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
                    <Button mt='3em' ml='30%' size='lg' color='white' border='none' bgGradient='linear(-20deg, #b721ff 0%, #21d4fd 100%)' onClick={onClose} _hover={{bgGradient: 'linear(-20deg, #b721ff 0%, #21d4fd 100%)', cursor: 'pointer'}}>SELECT PLAN</Button>
                    {/* background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%); */}
                </DrawerBody>
                </DrawerContent>
            </Drawer>}
            </div>
        </div>
     );
}
 
export default ClientNewCase;