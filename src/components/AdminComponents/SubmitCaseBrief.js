import { Box, Button, Heading, Input, Text } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SubmitCaseBrief = () => {
    const [value, setValue] = useState('')
    const {caseid} = useParams()
    const [assignmentZip, setAssignmentZip] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()


    const handleAssignmentSubmit = async () => {
        const caseAssignment = new FormData()
        console.log(`caseid here is ${caseid}`)
        console.log(`assignment zip here is ${assignmentZip}`)
        caseAssignment.append("zipFile", assignmentZip)
        caseAssignment.append("clientid", location.state.clientid)
        caseAssignment.append("caseplan", location.state.caseplan)
        caseAssignment.append("casetitle", location.state.caseplan)
        caseAssignment.append("assignmenttext", value)


        await axios.post(`http://localhost:3001/admin/cases/${caseid}/submit`, caseAssignment)
        navigate('/admin/dashboard')
    }
    return ( 
        <div>
            {/* style={{width: '70vw', marginLeft: '2em'}}  */}
            <div className='submit-case-brief-container'>
                <Box width='40vw' mt='1em' position='relative'>
                <Heading size='md' as='h1'  fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Submit Case Brief</Heading>
                <Heading size='md' as='h1'  fontSize='2xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text' textAlign='left'>Select File</Heading>
                <Input colorScheme='purple' type='file' accept=".zip" onChange={(e) => setAssignmentZip(e.target.files[0])} position='absolute' left='0'/>
                <Box mt='6em'>
                    <Heading size='md' as='h1'  fontSize='2xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text' textAlign='left'>Additional Info</Heading>
                     <Textarea resize='none' placeholder="I have a couple suggestions for you to implement..." boxSizing="border-box" height='35vh' fontFamily='Arial' onChange={(e) => setValue(e.target.value)} value={value}/>
                     </Box>
                
                <Button colorScheme='purple' mt='1em' onClick={handleAssignmentSubmit}>Submit</Button>
                </Box>
            </div>
            
        </div>
     );
}
 
export default SubmitCaseBrief;