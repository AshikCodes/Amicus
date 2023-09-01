import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setAnimationCount } from "../reducers/animationReducer";


const ClientSidebar = () => {

    const animationCount = useSelector(state => state.animation)
    const dispatch = useDispatch()

    const sidebarItems = [
        {name: 'Dashboard', link: '/client/dashboard'},
        {name: 'Cases', link: '/client/cases'},
        {name: 'Billing', link: '/client/billing'},
        {name: 'Engagements', link: '/client/appointments'},
        {name: 'Messages', link: '/client/messages'},
        {name: 'Video', link: '/client/video-conference'},
        {name: 'Settings', link: '/client/settings'}
    ]

    const [showAnimation, setShowAnimation] = useState(false)
    const location = useLocation()

    useEffect(() => {
        console.log(`animation here is ${animationCount}`)
        console.log(location.pathname)
        if(location.pathname === '/client/dashboard' && animationCount === 0){
            setShowAnimation(true)
            dispatch(setAnimationCount(1))
        }
        else {
            setShowAnimation(false)
        }
    },[location])


    return ( 
        <div>
            <div className="sidebar-container">
                <ul className="sidebar-contents">
                    {showAnimation ? sidebarItems.map((sidebarItem, index) => (
                        <motion.li className="sidebar-item" initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: index * 0.15, duration: 0.2, type: 'spring', stiffness: 120}} whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    )) : sidebarItems.map((sidebarItem) => (
                        <motion.li className="sidebar-item" whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default ClientSidebar;