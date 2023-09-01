
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
const ScrollToTopBtn = ({scrollToSection, homeRef}) => {
    return ( 
        <div>
            <div onClick={() => scrollToSection(homeRef)} className="scroll-to-top-btn">
            <FontAwesomeIcon icon={faAnglesUp} size='xl' style={{"--fa-primary-color": "#d5d5d5", "--fa-secondary-color": "#feffff", "padding": "1.2em", color: 'white'}} />
            </div>
        </div>
     );
}
 
export default ScrollToTopBtn;