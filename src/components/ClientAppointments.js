import { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
// import 'react-calendar/dist/Calendar.css';
import '../Calendar.css'
// import 'react-time-picker/dist/TimePicker.css';
import '../TimePicker.css'
import 'react-clock/dist/Clock.css';

const ClientAppointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('12:00');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
    return ( 
        <div>
            <div className='appointments-container'>
            <h1>Client Appointments</h1>
            <h2>Select Date and Time</h2>
            <div className='calendar-container'>
                <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
            <div>
                <TimePicker value={selectedTime} onChange={handleTimeChange}/>
            </div>
            <div>
                <p>Selected Date: {selectedDate.toString()}</p>
                <p>Selected Time: {selectedTime}</p>
            </div>
            </div>
            
        </div>
     );
}
 
export default ClientAppointments;