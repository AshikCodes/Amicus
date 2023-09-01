import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import { motion } from 'framer-motion'
import { Button } from "@chakra-ui/react";



const SignUp = () => {
    const [firstname, setFirstName] = useState(null)
    const [lastname, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const navigate = useNavigate()

    let modalContent = {
        title: 'Please check your email!',
        body: 'User Registered! Please check your email to verify your email.'
    }

    const [modal, setModal] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault()

       try {
        await axios.post('http://localhost:3001/signup', {firstname, lastname, email, password})  
       
        setModal(true)
        setTimeout(() => {
            navigate('/login')
        }, 3000)
       }
       catch(err){
        console.log("error", err);
       }
    }

        return ( 
            <div>
                <div className="signup-page">
                    <motion.div initial={{x: 500, opacity: 0}} animate={{x: 0, opacity: 1}} className="home-link"><Link  className="link-to-home" to='/' style={{ textDecoration: 'none' }}>HOME</Link></motion.div>
                    <motion.div initial={{x: -500, opacity: 0}} animate={{x: 0, opacity: 1}} className="signup-container">
                        <h2>Create your account 🚀</h2>
                        <form className="signup-form-container">
                            <div className="signup-input-container">
                                <div className="signup-input-component">
                                    <label for="name" className="signup-label"><b>First Name</b></label>
                                    <input placeholder="Enter your name" className="signup-input" name="name" onChange={(e) => setFirstName(e.target.value)} required></input>
                                </div>
                                <div className="signup-input-component">
                                    <label for="lastname" className="signup-label"><b>Last Name</b></label>
                                    <input placeholder="Enter your last name" className="signup-input" name="lastname" onChange={(e) => setLastName(e.target.value)} required></input>
                                </div>
                                <div className="signup-input-component">
                                    <label for="email" className="signup-label"><b>Email</b></label>
                                    <input placeholder="Enter your email" className="signup-input" onChange={(e) => setEmail(e.target.value)} name="email" required></input>
                                </div>
                                <div className="signup-input-component">
                                    <label for="password" className="signup-label"><b>Password</b></label>
                                    <input placeholder="Enter your password" className="signup-input" onChange={(e) => setPassword(e.target.value)} name="password" type="password" required ></input>
                                </div>
                                <div className="signup-input-component">
                                    <label for="confirm-password" className="signup-label"><b>Confirm password</b></label>
                                    <input placeholder="Re-enter your password" className="signup-input" onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" type="password"></input>
                                </div>
                            </div>
                            <div className="signup-buttons-container">
                                <Button className="login-button" colorScheme='purple' onClick={(e) => handleSignUp(e)}>Sign Up</Button>
                                {/* <button className="login-button" onClick={(e) => handleSignUp(e)}>Sign up</button> */}
                            </div>
                            <p className="account-link">Already have an account? <b><Link  className="link-to-home" to='/login' style={{ textDecoration: 'none' }}>Log in now</Link></b></p>
                        </form>
                    </motion.div>
                    <div></div>
                </div>
                {modal && <div className="overlay">
                    <Modal modal={modal} setModal={setModal} modalContent={modalContent}/></div>}
            </div>
         );
    }

 
export default SignUp;