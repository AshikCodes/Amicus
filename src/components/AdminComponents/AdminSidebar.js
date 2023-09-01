import { Link } from "react-router-dom";
import { motion } from 'framer-motion'


const AdminSidebar = () => {
    const sidebarItems = [
        {name: 'Dashboard', link: '/admin/dashboard'},
        {name: 'Case Management', link: '/admin/case-management'},
        {name: 'Task Management', link: '/admin/task-management'},
        {name: 'Billing', link: '/admin/billing'},
        {name: 'Appointments', link: '/admin/appointments'},
        {name: 'Messages', link: '/admin/messages'},
        {name: 'Video', link: '/admin/video-conference'},
        {name: 'Settings', link: '/admin/settings'}
    ]


    return ( 
        <div>
            <div className="admin-sidebar-container">
                <ul className="admin-sidebar-contents">
                    {sidebarItems.map((sidebarItem) => (
                      <motion.li className="admin-sidebar-item" initial={{x: -100, opacity: 0}} animate={{x: 0, opacity: 1}} whileHover={{scale: 1.05, textShadow: "0px 0px 5px white"}}><Link to={sidebarItem.link} style={{color: 'white', textDecoration: 'none'}}>{sidebarItem.name}</Link></motion.li>
                    ))}
                </ul>
            </div>
        </div>
     );
}
 
export default AdminSidebar;