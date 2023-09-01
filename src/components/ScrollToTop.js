import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UilArrowUp } from '@iconscout/react-unicons'
// import { faCoffee } from '@fortawesome/fontawesome-free-solid'


const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)
  
    useEffect(() => {
        window.addEventListener("scroll", () => {
            // console.log('hehehehe')
            if (window.scrollY > 400) {
                console.log(`bigger than 400`)
                setVisible(true);
            } else {
                setVisible(false);
            }
        },  {capture: true });
    }, []);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

    

    return ( 
        <div>
            <div className="scroll-to-top-btn-container">
                {/* {visible && <FontAwesomeIcon icon="fa-solid fa-arrow-up-to-line" style={{color: "#2753b7", height: "20px", width: "20px"}} onClick={() => scrollTop()} className="scroll-to-top-btn"/>} */}
                {/* {visible && <UilArrowUp className="top-btn-position top-btn-style" onClick={() => scrollToTop()}/>} */}
                {visible && <div>back to top</div>}
            </div>
        </div>
     );
}
 
export default ScrollToTop;