// import { Box, Heading, Input, Text, Textarea , Button, Select} from '@chakra-ui/react';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import Calendar from 'react-calendar';
// import TimePicker from 'react-time-picker';
// // import 'react-calendar/dist/Calendar.css';
// // import '../../Calendar.css'


// const AdminEngagements = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState('12:00');
//   const [formattedDate, setFormattedDate] = useState(null)
//   const [caseid, setCaseId] = useState()
//   const [cases, setCases] = useState()

// const handleDateChange = (date) => {
//   setSelectedDate(date);
// };

// const handleTimeChange = (time) => {
//   setSelectedTime(time);
// };

//   const [engagementTitle, setEngagementTitle] = useState('')
//   const [engagementDescription, setEngagementDescription] = useState('')


//   useEffect(() => {
//     if(selectedDate && selectedTime){
//       console.log(`value here is ${selectedDate}`)
//       console.log(`timeValue here is ${selectedTime}`)
//       let formattedDate = formatData()
//       setFormattedDate(formattedDate)
//       console.log(`formatted date here is ${formattedDate}`)
//     }
//   }, [selectedDate, selectedTime])


//   // const formatData = () => {
//   //   const formattedDate = selectedDate.toISOString().split('T')[0];
//   //   const formattedTime = selectedTime;
//   //   return `${formattedDate} ${formattedTime}`;
//   // }
//   const formatData = () => {
//     // Combine selectedDate and selectedTime into a single string with timezone
//     const formattedDate = selectedDate.toISOString().split('T')[0];
//     const formattedTime = selectedTime;
//     const formattedDateTime = `${formattedDate}T${formattedTime}:00.000Z`; // Assumes UTC timezone, adjust as needed
  
//     return formattedDateTime;
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:3001/add/engagement', {description: engagementDescription, title: engagementTitle, date: formattedDate, caseid: caseid})
//       console.log(`Successfully added engagement`)
//     }
//     catch(err){
//       console.log(`Error adding engagement. ${err}`)
//     }
//   }

//   useEffect(() => {
//     const getAllClients = async () => {
//         try {
//             let result = await axios.get('http://localhost:3001/cases')
//             setCases(result.data.cases)
//         }
//         catch(err){
//             console.log(`Error retrieving all clients: ${err}`)
//         }
//     }
//     getAllClients()
    
// },[])

// const handleSelectAction = (value) => {
//   if(value){
//       let valueObj = JSON.parse(value)
//       console.log(`value is ${valueObj.caseid}`)
//       setCaseId(valueObj.caseid)
//   }
  
// }

 
//     return ( 
//       <div>
//         <div className="admin-engagement-container">
//           <Box width='40vw' mt='3em'>
//           <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Client Engagements</Heading>
//           <Text fontSize='sm' textAlign='left' color='#607273'>Explore the Engagements Page, your hub for seamless client interaction. Here, you can effortlessly schedule tasks and appointments, ensuring effective communication and progress tracking with your clients. Streamline your legal practice and stay organized with ease.</Text>
//           <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%)'   bgClip='text' textAlign='left' mt='2em'>Select Case</Heading>
//           {/* <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Select Case</Heading> */}
//           <Select placeholder='Select option' onChange={(e) => handleSelectAction(e.target.value)}>
//                         {cases && cases.map((caseItem) => (
//                         <option value={JSON.stringify({
//                             caseid: caseItem.caseid
//                         })}>{caseItem.casetitle} - {caseItem.caseid}</option>))}

//                         {/* <option value='option2' >Option 2</option>
//                         <option value='option3' >Option 3</option> */}
//                     </Select>
//             <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Select date and time</Heading>
//             <Calendar onChange={handleDateChange} value={selectedDate} minDate={new Date()}/>
//             <TimePicker onChange={handleTimeChange} value={selectedTime} />
//             <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Engagement Title</Heading>
//             <Textarea resize='none' placeholder={`"Submit evidence documents via email..."`} boxSizing="border-box" height='10vh' fontFamily='Arial' onChange={(e) => setEngagementTitle(e.target.value)}/>
//             <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%);'   bgClip='text' textAlign='left' mt='2em'>Engagement Description</Heading>
//             <Textarea resize='none' placeholder={`"Please send to my email the following documents..."`} boxSizing="border-box" height='20vh' fontFamily='Arial' onChange={(e) => setEngagementDescription(e.target.value)}/>
//             <Button mt='2em' mb='2em' size='lg' colorScheme='purple' _hover={{cursor: 'pointer'}} onClick={handleSubmit}>Submit</Button>
//           </Box>
//           {/* <h1>Engagements</h1>  */}
          
//         </div>
        
//     </div>
//      );
// }
 
// export default AdminEngagements;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { motion } from 'framer-motion'
import { Badge, Box, Button, Heading, List, ListIcon, ListItem, Select, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ChevronDownIcon  } from '@chakra-ui/icons'
import _ from 'lodash';



const AdminEngagements = () => {
    const [clientCases, setClientCases] = useState()
    const [engagementInfo, setEngagementInfo] = useState()
    const userObj = useSelector(state => state.user)

    const [showDetails, setShowDetails] = useState(false)
    const [engagementDetails, setEngagementDetails] = useState(null)
    const [engagementDate, setEngagementDate] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const getEngagementInfo = async () => {
            try { 
                let result = await axios.get(`http://localhost:3001/admin/engagements`)
                setEngagementInfo(result.data.engagementinfo)

                console.log(`result.data.engagementinfo here is ${JSON.stringify(result.data.engagementinfo)}`)

                // let newArr = []
                // for(let i = 0; i < result.data.engagementinfo.length; i++){
                //     if(result.data.engagementinfo[i].casetitle){
                //         console.log(`result.data.engagementinfo here is ${result.data.engagementinfo[i].casetitle}`)
                //         newArr.concat([result.data.engagementinfo[i].casetitle])
                //     }
                // }
                var finalArray = result.data.engagementinfo.map(function (obj) {
                    return obj.casetitle;
                  });;
                console.log(`final here is ${finalArray}`)
                let newArray2 = _.uniq(finalArray)
                console.log(`new array 2 here is ${newArray2}`)
                setClientCases(newArray2)
            }
            catch(err){
                console.log(`Could not retrieve client cases: ${clientCases}`)
            }
        }
        getEngagementInfo()
    },[])

    const showEngagementDetails = (description, duedate) => {
        if(showDetails){
            setEngagementDetails(null)
            setEngagementDate(null)
            setShowDetails(false)
            
        }
        else {
            const isoTimestamp = duedate;
            const date = new Date(isoTimestamp);
            const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
            setEngagementDetails(description)
            setEngagementDate(formattedDate)
            setShowDetails(true)
            
        }
        
        
    }
    
    return ( 
        <div className="client-engagement-container">
        <Box width='40vw' mt='3em'>
        <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'>Engagements</Heading>
        <Text fontSize='sm' textAlign='left' color='#607273'>Welcome to the Engagements Page, where you can easily access and manage the tasks and appointments set up by your lawyer. Here, you'll find a clear overview of your legal journey, including upcoming tasks and appointments for your convenience.</Text>
            <Text fontSize='sm' textAlign='left' color='#607273'>Explore the Engagements Page, your hub for seamless client interaction. Here, you can effortlessly schedule tasks and appointments, ensuring effective communication and progress tracking with your clients. Streamline your legal practice and stay organized with ease.</Text>
            {clientCases && clientCases.map((clientcase) => (<div>
                <Heading size='md' as='h1' fontSize='xl' bgGradient='linear(to-l, #667eea 0%, #764ba2 100%)' bgClip='text' textAlign='left' mt>{clientcase}</Heading>
                <List>
                    {engagementInfo.map((engagement) => (engagement.casetitle === clientcase ? 
                    <ListItem fontSize='lg' textAlign='left' onClick={() => showEngagementDetails(engagement.engagementdescription, engagement.engagementduedate)} _hover={{cursor: 'pointer'}}>
                        <ListIcon as={ChevronDownIcon} color='green.500'  />
                        {engagement.engagementtitle}
                        {showDetails && engagement.engagementdescription === engagementDetails && <Text ml='2.5em'><Text as='b'>Details: </Text>{engagementDetails}</Text>}
                        {showDetails && engagement.engagementdescription === engagementDetails && <Text ml='2.5em'><Text as='b'>Date: </Text>{engagementDate}</Text>}
                    </ListItem> : null))}
                </List>
            </div>))}
            <Button colorScheme="purple" mt='2em' onClick={() => navigate('/admin/create-engagement')}>CREATE NEW</Button>

    </Box>
        </div>
     );
}


 
export default AdminEngagements;