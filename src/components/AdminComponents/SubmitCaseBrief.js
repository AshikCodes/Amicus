import { Button, Input, Text } from '@chakra-ui/react'
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


        await axios.post(`http://localhost:3001/admin/cases/${caseid}/submit`, caseAssignment)
        navigate('http://localhost:3001/admin/dashboard')
    }
    return ( 
        <div>
            <div style={{width: '70vw', marginLeft: '2em'}} >
            <h1>Welcome to the submitting case brief page!</h1>
            
                <Input colorScheme='purple' type='file' accept=".zip" onChange={(e) => setAssignmentZip(e.target.files[0])}/>
                <>
                    <Text textAlign='left'>Write any additional info here</Text>
                    <Textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder='I have a couple suggestions for you to implement...'
                        size='sm'
                        resize='none'
                        maxWidth='68vw'
                        rows='15'
                    />
                </>
                <Button colorScheme='purple' mt='1em' onClick={handleAssignmentSubmit}>Submit</Button>
            </div>
            
        </div>
     );
}
 
export default SubmitCaseBrief;