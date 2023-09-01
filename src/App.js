import './App.css';
import Home from './Home';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import Error from './components/Error';
import ClientDashboard from './components/ClientDashboard';
import ClientSidebar from './components/ClientSidebar';
import ClientCases from './components/ClientCases';
import ClientBilling from './components/ClientBilling';
import ClientAppointments from './components/ClientAppointments';
import ClientSettings from './components/ClientSettings';
import ClientCaseDetails from './components/ClientCaseDetails';
import ClientNewCase from './components/ClientNewCase';
import ClientSummary from './components/ClientSummary';
import ClientProtectedRoutes from './components/ClientProtectedRoutes';
import VerifiedUser from './components/VerifiedUser';
import { AnimatePresence } from 'framer-motion';
import ClientLayout from './components/ClientLayout';
import AdminDashboard from './components/AdminComponents/AdminDashboard';
import AdminSidebar from './components/AdminComponents/AdminSidebar';
import AdminCases from './components/AdminComponents/AdminCases';
import AdminCaseDetails from './components/AdminComponents/AdminCaseDetails';
import SubmitCaseBrief from './components/AdminComponents/SubmitCaseBrief';
import ClientBillInfo from './components/ClientBillInfo';
import ClientChoosePlan from './components/ClientChoosePlan';
import ClientCreateBrief from './components/ClientCreateBrief';
import ClientGetQuote from './components/ClientGetQuote';
import ClientMessages from './components/ClientMessages';
import io from 'socket.io-client';
import ClientMessageDetail from './components/ClientMessageDetail';
import AdminMessages from './components/AdminComponents/AdminMessages';
import AdminMessageDetail from './components/AdminComponents/AdminMessageDetail';
import AdminVideoConference from './components/AdminComponents/AdminVideoConference';
import AdminVideoConferenceDetail from './components/AdminComponents/AdminVideoConferenceDetail.js';
import ClientVideoConference from './components/ClientVideoConference';
import ClientVideoConferenceDetail from './components/ClientVideoConferenceDetail';

// const socket = io.connect('http://localhost:3001')
const socket = io.connect('http://localhost:3001')


function App({client}) {
  const location = useLocation()
  return (
    <AnimatePresence>
    {/* <Router location={location} key={location.key}> */}
    <div className="App">
      <Routes location={location} key={location.key}>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route element={<ClientProtectedRoutes />}>
          <Route path='/client/dashboard' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientDashboard /></></div>}/>
          <Route path='/client/cases' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientCases /></></div>}/>
          <Route path='/client/cases/:caseid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientCaseDetails /></></div>}/>
          <Route path='/client/cases/new' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientNewCase /></></div>}/>
          <Route path='/client/cases/new/choose-plan' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientChoosePlan /></></div>}/>
          <Route path='/client/cases/new/quote' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientGetQuote /></></div>}/>
          <Route path='/client/cases/new/case-brief' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientCreateBrief /></></div>}/>
          <Route path='/client/cases/new/summary' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientSummary /></></div>}/>
          <Route exact path='/client/billing' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientBilling /></></div>}/>
          <Route path='/client/messages' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientMessages socket={socket}/></></div>}/>
          <Route path='/client/messages/:roomid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientMessageDetail socket={socket}/></></div>}/>
          <Route path='/client/video-conference' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientVideoConference socket={socket}/></></div>}/>
          <Route path='/client/video-conference/:roomid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientVideoConferenceDetail socket={socket}/></></div>}/>
          <Route path='/client/billing/:paymentid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientBillInfo /></></div>}/>
          <Route path='/client/appointments' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientAppointments /></></div>}/>
        </Route>


        <Route path='/client/settings' element={<div style={{display: 'flex', flexDirection: 'row'}}><><ClientSidebar /><ClientSettings client={client}/></></div>}/>
        <Route path='*' element={<Error />} />
        <Route path='/confirm/:confirmationtoken' element={<VerifiedUser />} />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminDashboard/></></div>}/>
        <Route path='/admin/messages' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminMessages/></></div>}/>
        <Route path='/admin/messages/:roomid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminMessageDetail socket={socket}/></></div>}/>
        <Route path='/admin/video-conference' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminVideoConference/></></div>}/>
        <Route path='/admin/video-conference/:roomid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminVideoConferenceDetail socket={socket}/></></div>}/>
        <Route path='/admin/case-management' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminCases/></></div>}/>
        <Route path='/admin/cases/:caseid/submit' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><SubmitCaseBrief /></></div>}/>
        <Route exact path='/admin/cases/:caseid' element={<div style={{display: 'flex', flexDirection: 'row'}}><><AdminSidebar /><AdminCaseDetails /></></div>}/>


      </Routes>
      
      
    </div>
    {/* </Router> */}
    </AnimatePresence>
  );
}

export default App;
