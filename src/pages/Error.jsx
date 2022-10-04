import {useNavigate} from "react-router-dom";

/**
 * Error page
 * @returns {JSX.Element}
 * @constructor
 */
function Error() {

    const navigate = useNavigate();
    return (
        <div>
            <h2>Not Found</h2>
            <button onClick={()=>navigate("/")}>Go to the main page</button>
        </div>
    );
}

export default Error;
