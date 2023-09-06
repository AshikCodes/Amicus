import { Box, Heading, Input, Text, Textarea , Button, Select} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
// import 'react-calendar/dist/Calendar.css';
// import '../../Calendar.css'


const AdminCreateEngagements = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [formattedDate, setFormattedDate] = useState(null)
  const [caseid, setCaseId] = useState()
  const [cases, setCases] = useState()

const handleDateChange = (date) => {
  setSelectedDate(date);
};

const handleTimeChange = (time) => {
  setSelectedTime(time);
};

  const [engagementTitle, setEngagementTitle] = useState('')
  const [engagementDescription, setEngagementDescription] = useState('')


  useEffect(() => {
    if(selectedDate && selectedTime){
      console.log(`value here is ${selectedDate}`)
      console.log(`timeValue here is ${selectedTime}`)
      let formattedDate = formatData()
      setFormattedDate(formattedDate)
      console.log(`formatted date here is ${formattedDate}`)
    }
  }, [selectedDate, selectedTime])


  // const formatData = () => {
  //   const formattedDate = selectedDate.toISOString().split('T')[0];
  //   const formattedTime = selectedTime;
  //   return `${formattedDate} ${formattedTime}`;
  // }
  const formatData = () => {
    // Combine selectedDate and selectedTime into a single string with timezone
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedTime = selectedTime;
    const formattedDateTime = `${formattedDate}T${formattedTime}:00.000Z`; // Assumes UTC timezone, adjust as needed
  
    return formattedDateTime;
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/add/engagement', {description: engagementDescription, title: engagementTitle, date: formattedDate, caseid: caseid})
      console.log(`Successfully added engagement`)
    }
    catch(err){
      console.log(`Error adding engagement. ${err}`)
    }
  }

  useEffect(() => {
    const getAllClients = async () => {
        try {
            let result = await axios.get('http://localhost:3001/cases')
            setCases(result.data.cases)
        }
        catch(err){
            console.log(`Error retrieving all clients: ${err}`)
        }
    }
    getAllClients()
    
},[])

const handleSelectAction = (value) => {
  if(value){
      let valueObj = JSON.parse(value)
      console.log(`value is ${valueObj.caseid}`)
      setCaseId(valueObj.caseid)
  }
  
}

 
    return ( 
      <div>
        <div className="admin-engagement-container">
          <Box width='40vw' mt='3em'>
          <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Client Engagements</Heading>
          <Text fontSize='sm' textAlign='left' color='#607273'>Explore the Engagements Page, your hub for seamless client interaction. Here, you can effortlessly schedule tasks and appointments, ensuring effective communication and progress tracking with your clients. Streamline your legal practice and stay organized with ease.</Text>
          <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%)'   bgClip='text' textAlign='left' mt='2em'>Select Case</Heading>
          {/* <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Select Case</Heading> */}
          <Select placeholder='Select option' onChange={(e) => handleSelectAction(e.target.value)}>
                        {cases && cases.map((caseItem) => (
                        <option value={JSON.stringify({
                            caseid: caseItem.caseid
                        })}>{caseItem.casetitle} - {caseItem.caseid}</option>))}

                        {/* <option value='option2' >Option 2</option>
                        <option value='option3' >Option 3</option> */}
                    </Select>
            <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Select date and time</Heading>
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={new Date()}/>
            <TimePicker onChange={handleTimeChange} value={selectedTime} />
            <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Engagement Title</Heading>
            <Textarea resize='none' placeholder={`"Submit evidence documents via email..."`} boxSizing="border-box" height='10vh' fontFamily='Arial' onChange={(e) => setEngagementTitle(e.target.value)}/>
            <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Engagement Description</Heading>
            <Textarea resize='none' placeholder={`"Please send to my email the following documents..."`} boxSizing="border-box" height='20vh' fontFamily='Arial' onChange={(e) => setEngagementDescription(e.target.value)}/>
            <Button mt='2em' mb='2em' size='lg' colorScheme='purple' _hover={{cursor: 'pointer'}} onClick={handleSubmit}>Submit</Button>
          </Box>
          {/* <h1>Engagements</h1>  */}
          
        </div>
        
    </div>
     );
}
 
export default AdminCreateEngagements;