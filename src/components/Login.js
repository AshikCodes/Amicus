import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducers/userReducer";
import { motion } from 'framer-motion'
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let user = await axios.post('http://localhost:3001/login', {email, password})
            console.log(`User data here is ${JSON.stringify(user.data)}`)
            dispatch(setUserData(user.data))
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user.data))
            console.log('Successfully logged in.')
            if(user.data.usertype === 1){
                navigate('/client/dashboard', {replace: true})
            }
            else if(user.data.usertype === 0){
                navigate('/admin/dashboard', {replace: true})
            }
            
        }
        catch(err){
            toast({title: `Incorrect email and password combination`, status: 'error', isClosable: true})
            console.log(`Incorrect credentials`)
        }
    }

    return ( 
        <div >
            <div className="login-page">
                <motion.div initial={{x: 500, opacity: 0}} animate={{x: 0, opacity: 1}} className="home-link"><Link  className="link-to-home" to='/' style={{ textDecoration: 'none' }}>HOME</Link></motion.div>
                <motion.div initial={{x: -500, opacity: 0}} animate={{x: 0, opacity: 1}} className="login-container">
                    <h2>Welcome back 👋</h2>
                    <form className="login-form-container" action="submit">
                        <div className="login-input-container">
                            <input placeholder="Username" className="username-input" onChange={(e) => setEmail(e.target.value)} ></input>
                            <input type="password" placeholder="Password" className="username-password" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className="login-buttons-container">
                            <Button className="login-button" colorScheme='purple' onClick={(e) => handleLogin(e)}>Login</Button>
                            <Button className="forgot-password-button" colorScheme='purple' variant='outline'>
                                Forgot Password?
                            </Button>
                            {/* <button className="login-button" type='submit' onClick={(e) => handleLogin(e)}>Login</button> */}
                            {/* <button className="forgot-password-button">Forgot Password?</button> */}
                        </div>
                        <p className="no-account-link">Don't have an account? <b><Link  className="link-to-home" to='/signup' style={{ textDecoration: 'none' }}>Sign up now</Link></b></p>
                    </form>
                </motion.div>
                <div></div>
            </div>
        </div>
     );
}
 
export default Login;