import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";


const ClientSidebar = () => {

    const sidebarItems = [
        {name: 'Dashboard', link: '/client/dashboard'},
        {name: 'Cases', link: '/client/cases'},
        {name: 'Billing', link: '/client/billing'},
        {name: 'Engagements', link: '/client/engagements'},
        {name: 'Messages', link: '/client/messages'},
        {name: 'Video', link: '/client/video-conference'},
        {name: 'Settings', link: '/client/settings'}
    ]



    return ( 
        <div>
            <div className="sidebar-container">
                <ul className="sidebar-contents">
                    {/* {sidebarItems ? sidebarItems.map((sidebarItem, index) => (
                        <motion.li className="sidebar-item" initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{delay: index * 0.15, duration: 0.2, type: 'spring', stiffness: 120}} whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    )) : sidebarItems.map((sidebarItem) => (
                        <motion.li className="sidebar-item" whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    ))} */}
                    {sidebarItems.map((sidebarItem) => (
                       <motion.li className="sidebar-item" whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default ClientSidebar;