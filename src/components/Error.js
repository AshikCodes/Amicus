import { Link } from "react-router-dom";

const Error = () => {
    return ( 
        <div>
            <div className="error-container">
                    <h1 className="error-title">404 🔍</h1>
                    <h3 className="error-message">Looks like you've stumbled into the unknown 🚀. But we promise it's not Area 51.</h3>
                    <Link to='/' style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2em', color: 'rgb(87, 87, 232)'}}>Go back</Link>
            </div>
        </div>
     );
}
 
export default Error;