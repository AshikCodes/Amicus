import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'


const Modal = ({setModal, modal, modalContent}) => {

    useEffect(() => {
        console.log(`modal value is ${modal}`)
    })

    const handleClick = () => {
        setModal((modal) => !modal)
    }

    return ( 
        <div>
            <div className="modal-container">
                <div className="modal-header">
                    <h4 className='modal-title'>{modalContent.title}</h4>
                    <FontAwesomeIcon icon={faXmark} className='modal-close-btn' onClick={handleClick}/>
                </div>
                <div className="modal-body">
                    <p>{modalContent.body}</p>
                </div>
                <button className='got-it-btn' onClick={handleClick}>GOT IT</button>
            </div>
        </div>
     );
}
 
export default Modal;