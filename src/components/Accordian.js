import { useState } from "react";

const Accordian = ({title, content}) => {
    const [isActive, setIsActive] = useState(false)
    return ( 
        <div>
            <div className="accordian-item">
                <div className="accordian" onClick={() => setIsActive(!isActive)}>
                    <div className="accordian-header">
                        <div className="accordian-title">{title}</div>
                        <div className="accordian-btn">{isActive ? '-' : '+'}</div>
                    </div>
                    {isActive && <div className="accordian-content">{content}</div>}
                </div>
            </div>
        </div>
     );
}
 
export default Accordian;