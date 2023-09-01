import { AbsoluteCenter, Badge, Box, Button, Divider, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import { useToast } from '@chakra-ui/react'

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

const ClientCreateBrief = () => {

    const location = useLocation()
    const toast = useToast()

    const userObj = useSelector(state => state.user)
    const plan = location.state.plan
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [factual, setFactual] = useState('')
    const [objectives, setObjectives] = useState('')
    const [dates, setDates] = useState('')
    const [legal, setLegal] = useState('')
    const [opposition, setOpposition] = useState('')
    const [selectedZip, setSelectedZip] = useState(null)
    const [customAmount, setCustomAmount] = useState(null)

    const [stepperIndex, setStepperIndex] = useState(1)
    
    const [caseObject, setCaseObject] = useState({})

    const navigate = useNavigate()

    const [goToSummaryPage, setGoToSummaryPage] = useState(false)

    const steps = [
        { title: 'First', description: 'Choose a plan' },
        { title: 'Second', description: 'Create your case brief' },
        { title: 'Third', description: 'Review Information' },
        { title: 'Fourth', description: 'Pay advance fee' },
      ]


      useEffect(() => {
        if(plan !== 'Starter' && plan !== 'Pro' && plan !== 'Enterprise' && plan !== 'Custom'){
            console.log(`plan here is ${plan}`)
            navigate('/client/cases/new/choose-plan')
        }
      },[])

      useEffect(() => {
        if(plan === 'Custom'){
            let amount = location.state.amount
            console.log(`amount in create brief is ${amount}`)
            setCustomAmount(amount)
        }
      }, [plan])


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
            caseopposition: opposition,
            amount: customAmount
        })
        if(title === '' || overview === '' || factual === '' || objectives === '' || dates === '' || legal === '' || opposition === '' || selectedZip === null){
            toast({
                title: `Please fill out all fields`,
                description: `Type "NA" for any that are non-applicable. File submissions are mandatory.`,
                position: 'top-right',
                status: 'error',
                isClosable: true,
              })
        }
        else {
            setGoToSummaryPage(true)
        }

    }

    useEffect(() => {
        if(selectedZip){
            setStepperIndex(2)
        }
    },[selectedZip])


    return ( 
        <div>
            <div className="client-new-case-container">
            
            {!goToSummaryPage && <div className="new-case-container">
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
            Submit your Case Brief
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
            <Button border='none' boxShadow='2xl' color='white' size='lg' mt='2em' p='1.5em' bgGradient='linear(-20deg, #00cdac 0%, #8ddad5 100%)' onClick={goToSummary} _hover={{bgGradient: 'linear(-20deg, #00cdac 0%, #8ddad5 100%)', cursor: 'pointer'}}>Go to Review</Button>
            </div>}
            {goToSummaryPage && <ClientSummary fileData={selectedZip} casestuff={caseObject}/>}
            </div>
        </div>
     );
}
 
export default ClientCreateBrief;