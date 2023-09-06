import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { motion } from 'framer-motion'
import { Badge, Box, Button, Heading, List, ListIcon, ListItem, Select, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ChevronDownIcon  } from '@chakra-ui/icons'
import _ from 'lodash';



const ClientEngagements = () => {
    const [clientCases, setClientCases] = useState()
    const [engagementInfo, setEngagementInfo] = useState()
    const userObj = useSelector(state => state.user)

    const [showDetails, setShowDetails] = useState(false)
    const [engagementDetails, setEngagementDetails] = useState(null)
    const [engagementDate, setEngagementDate] = useState(null)

    useEffect(() => {
        const getEngagementInfo = async () => {
            try { 
                let result = await axios.get(`http://localhost:3001/enagements/${userObj.id}`)
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
          {/* {clientCases && clientCases.map((clientcase) => (
          <Heading size='md' as='h1' fontSize='4xl' bgGradient='linear(to-l, #7928CA, #FF0080)'   bgClip='text'></Heading>
            <Text fontSize='sm' textAlign='left' color='#607273'>Explore the Engagements Page, your hub for seamless client interaction. Here, you can effortlessly schedule tasks and appointments, ensuring effective communication and progress tracking with your clients. Streamline your legal practice and stay organized with ease.</Text>))} */}
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
                




                
                {/* <Text fontSize='sm' textAlign='left' color='#607273'>Explore the Engagements Page, your hub for seamless client interaction. Here, you can effortlessly schedule tasks and appointments, ensuring effective communication and progress tracking with your clients. Streamline your legal practice and stay organized with ease.</Text> */}
            </div>))}
    </Box>
        </div>
     );
}


 
export default ClientEngagements;