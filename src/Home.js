import { useEffect, useRef } from "react";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopBtn from "./components/ScrollToTopBtn"
import Accordian from "./components/Accordian";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';



const Home = () => {
    const userObj = useSelector(state => state.user)
    const dispatch = useDispatch()
    const homeRef = useRef(null)
    const servicesRef = useRef(null)
    const processRef = useRef(null)
    const pricesRef = useRef(null)
    const aboutRef = useRef(null)

    const accordianData = [
        {
            title: '👏 Who we are',
            content: 'Dedicated and experienced legal professionals in India, providing exceptional legal services as trusted partners in navigating the legal world.'
        },
        {
            title: '👏 Practice Areas',
            content: 'Expertise in Corporate Law, Real Estate, Intellectual Property, Employment, Bankruptcy, International Law, Civil Litigation, Insurance, and Recovery Claims.'
        },
        {
            title: '👏 Our Mission',
            content: 'To offer accessible and client-centric legal solutions, ensuring the best representation and tailored services for individuals and businesses.'
        },
        {
            title: '👏 Contact Us',
            content: `Reliable legal services in Kochi, Kerala, and beyond. Reach out to us at 123@amicuslaw.com for a consultation or inquiries. Let's achieve legal success together.`
        }
    ]

    const scrollToSection = (elementRef) => {
        console.log('clicked')
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return ( 
        <div >
            <div className="home-container" >         
                <section className="one" ref={homeRef}>
                    <div className="one-container">
                    <div className="navbar-container"> 
                        <motion.ul className="navbar" initial={{y: -250, opacity: 0}} animate={{y:0, opacity: 1}} transition={{type: 'spring', stiffness: 105}}>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}} onClick={() => scrollToSection(homeRef)}>HOME</motion.li>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}} onClick={() => scrollToSection(servicesRef)}>SERVICES</motion.li>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}} onClick={() => scrollToSection(processRef)}>PROCESS</motion.li>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}} onClick={() => scrollToSection(pricesRef)}>PRICING</motion.li>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}} onClick={() => scrollToSection(aboutRef)}>ABOUT</motion.li>
                            <motion.li className="navbar-item" whileHover={{scale: 1.1}}><Link to='/login'>LOGIN</Link></motion.li>
                        </motion.ul>
                    </div>
                        <div className="home-items-container">
                        <div className="title-slogan-container">
                            <motion.h1 className="title" initial={{x: -600, opacity: 0}} animate={{x: 0, opacity: 1}} >Amicus</motion.h1>
                            <motion.p className="slogan" initial={{x: 600, opacity: 0}} animate={{x: 0, opacity: 1}} >Precision in practice.</motion.p>
                        </div>
                        {/* <img className="amicus-logo" src={require("./amicus-logo.png")} alt="amicus logo" width="100px" height="100px"/> */}
                        <div style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div>
                        </div>
                    </div>
                </section>
                
                <section className="two" ref={servicesRef}>
                    <div className="two-container">
                        <h1 className="services-title">
                        <span className="services-gradient">What we do</span>
                        <span className="services-emoji">✍🏻</span>
                        </h1>
                            <div className="services-info-container" >
                                <motion.p className="first-service">👏 Draft documents</motion.p>
                                <p className="second-service">👏 Review contracts</p>
                                <p className="third-service">👏 Provide legal advice and guidance</p>
                                <p className="fourth-service">👏 Assist in Corporate and Commercial claims</p>
                                <p className="fifth-service">👏 Provide mediation and arbitration services</p>
                                <p className="sixth-service">👏 Assist clients in bankruptcy and debt relief</p>
                            </div>
                    </div>
                    
                </section>
                <section className="two-five" ref={processRef}>
                    <div className="two-five-container">
                        <h1 className="process-title">
                        <span className="process-gradient">The Process</span>
                        <span className="process-emoji">📌</span>
                        </h1>
                        {/* <ScrollToTopBtn scrollToSection={scrollToSection} homeRef={homeRef}/> */}
                        <div className="roadmap">
                            <div className="roadmap-line"></div>
                            <div className="roadmap-item1">
                                <h1>Account Creation 🌱</h1>
                                <p className="roadmap-item1-content">Begin by <Link to='/signup' style={{textDecoration: 'none', color: 'rgb(111, 111, 234)', fontWeight: 'bold'}}>setting up</Link> your secure account with us.</p>
                            </div>
                            <div className="roadmap-item2">
                                <h1>Choose Your Plan 🎯</h1>
                                <p className="roadmap-item2-content">Select the most suitable <b className="bold-plan" onClick={() => scrollToSection(pricesRef)}style={{color: 'rgb(111, 111, 234)'}}>plan </b>tailored to your business needs.</p>
                            </div>
                            <div className="roadmap-item3">
                                <h1>Submit Your Case Brief 📂</h1>
                                <p className="roadmap-item3-content">Provide the essential documents and case details to our experts.</p>
                            </div>
                            <div className="roadmap-item4">
                                <h1>Collaborate Effectively 🚀</h1>
                                <p className="roadmap-item4-content">Rocket-boost productivity through seamless video conferencing and messaging.</p>
                            </div>
                            <div className="roadmap-item5">
                                <h1>Timely Delivery 🏆</h1>
                                <p className="roadmap-item5-content">Celebrate success with on-time and accurate delivery.</p>
                            </div>
                            
                            <div className="roadmap-item6">
                                <h1>The Journey Continues 🌠</h1>
                                <p className="roadmap-item6-content">Explore new opportunities as we remain dedicated to your success.</p>
                            </div>
                        </div>
                        <ScrollToTopBtn scrollToSection={scrollToSection} homeRef={homeRef} />
                        {/* <div className="scroll-to-top-btn" onClick={() => scrollToSection(homeRef)}></div> */}
                    </div>
                </section>
                <section className="three" ref={pricesRef}>
                    <div className="three-container">
                        <h1 className="prices-title">
                            <span className="prices-gradient">Pricing</span>
                            <span className="prices-emoji">⚡</span>
                        </h1>
                <div className="prices-container">
                    <div className="price1-container">  
                        <h2 className="plan1">Starter</h2>
                        <div className="price1-title-container">
                            <h1 className="price1">$100 </h1>
                            <p style={{color: "#9b9a9a"}}>/case</p>
                        </div>
                        <ul className="prices1-info">
                            <li className="price-item">30-min consultation</li>
                            <li className="price-item">Standard contract (up to 5 pages)</li>
                            <li className="price-item">Business structure advice</li>
                            <li className="price-item">Trademark registration (1 mark, 1 class)</li>
                            <li className="price-item">Basic will preparation</li>
                        </ul>
                        <button className="price1-button"><Link style={{textDecoration: 'none', color: 'white'}}to='/signup'>GET STARTED</Link></button>
                    </div>
                    <div className="price2-container">
                        <div className="most-popular">MOST POPULAR 🔥</div>
                        <h2 className="plan2">Pro</h2>
                        <div className="price2-title-container">
                            <h1 className="price2">$200 </h1>
                            <p style={{color: "#9b9a9a"}}>/case</p>
                        </div>
                        <ul className="prices2-info">
                            <li className="price-item">1-hr consultation</li>
                            <li className="price-item">Complex contract (up to 10 pages)</li>
                            <li className="price-item">Business formation assistance</li>
                            <li className="price-item">Copyright registration (1 work)</li>
                            <li className="price-item">Comprehensive estate planning</li>
                        </ul>
                        <button className="price2-button"><Link style={{textDecoration: 'none', color: 'white'}}to='/signup'>GET STARTED</Link></button>
                    </div>
                    <div className="price3-container">
                        <h2 className="plan3">Enterprise</h2>
                        <div className="price3-title-container">
                            <h1 className="price3">$300 </h1>
                            <p style={{color: "#9b9a9a"}}>/case</p>
                        </div>
                        <ul className="prices3-info">
                            <li className="price-item">2-hr consultation</li>
                            <li className="price-item">Highly complex contract (up to 20 pages)</li>
                            <li className="price-item">In-depth business guidance</li>
                            <li className="price-item">Patent consultation and filing</li>
                            <li className="price-item">Complex estate planning</li>
                        </ul>
                        <button className="price3-button"><Link style={{textDecoration: 'none', color: 'white'}}to='/signup'>GET STARTED</Link></button>
                    </div>
                    <div className="price4-container">
                        <h2 className="plan4">Enterprise Custom</h2>
                        <div className="price4-title-container">
                            <h1 className="price4">Custom </h1>
                            <p style={{color: "#9b9a9a"}}>/case</p>
                        </div>
                        <ul className="prices4-info">
                            <li className="price-item">4-hr consultation</li>
                            <li className="price-item">Large-scale or multiple complex contracts</li>
                            <li className="price-item">Premium business formation services</li>
                            <li className="price-item">Full IP portfolio management</li>
                            <li className="price-item">Extensive custom estate</li>
                        </ul>
                        <button className="price4-button">GET QUOTE</button>
                    </div>
                    {/* <ScrollToTopBtn scrollToSection={scrollToSection} homeRef={homeRef} /> */}
                </div>

                    </div>
                </section>
                <section className="four" ref={aboutRef}>
                    <div className="four-container">
                        <h1 className="about-title">
                            <span className="about-gradient">About Us</span>
                            <span className="about-emoji"> 🏢</span>
                        </h1>
                        <div className="about-info">
                            <h3 className="about1-title">👏 Who we are</h3>
                            <p className="about1-content">Experienced legal professionals in India, your trusted partners in navigating the legal world.</p>
                            <h3 className="about5-title">👏 Practice Areas</h3>
                            <p className="about5-content"> Expertise in Corporate Law, Real Estate, Intellectual Property, Employment, Bankruptcy, International Law, Civil Litigation, Insurance, and Recovery Claims.</p>
                            <h3 className="about2-title">👏 Our Mission</h3>
                            <p className="about2-content">Offering client-centric legal solutions with tailored services for individuals and businesses.</p>
                            
                            <h3 className="about4-title">👏 Contact Us</h3>
                            <p className="about4-content">Reliable legal services worldwide. Contact us at 123@amicuslaw.com for consultations. Achieve legal success together.</p>
                            
                        </div>
                        <ScrollToTopBtn scrollToSection={scrollToSection} homeRef={homeRef} />
                    </div>
                </section>
                {/* <footer className="footer-container">
                    @Copyright Amicus 2023 - All Right Reserved.  
                </footer> */}
            </div>
        </div>
     );
}
 
export default Home;