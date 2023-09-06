import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { Badge } from "@chakra-ui/react";


const AdminSidebar = () => {
    const sidebarItems = [
        {name: 'Dashboard', link: '/admin/dashboard'},
        {name: 'Case Management', link: '/admin/case-management'},
        {name: 'Custom Plans', link: '/admin/custom-plans'},
        {name: 'Engagments', link: '/admin/engagements'},
        {name: 'Billing Management', link: '/admin/billing'},
        {name: 'Messages', link: '/admin/messages'},
        {name: 'Video', link: '/admin/video-conference'},
        {name: 'Settings', link: '/admin/settings'}
    ]


    return ( 
        <div>
            <div className="admin-sidebar-container">
            <Badge ml='1' fontSize='1.9em' colorScheme='red' mb='2em' mt='2em'>
                ADMIN
            </Badge>
                <ul className="admin-sidebar-contents">
                    {sidebarItems.map((sidebarItem) => (
                      <motion.li className="admin-sidebar-item" whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default AdminSidebar;