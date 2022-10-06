import React, {useState} from 'react';
import Button from "react-bootstrap/Button";

/**
 * This component copies a text to the clipboard
 * @param value
 * @returns {JSX.Element}
 * @constructor
 */
const CopyTextButton = ({value}) => {
    const [isCopied,setIsCopied] = useState(false);

   const handleCopying = ()=> {

      setIsCopied(true);
      void navigator.clipboard.writeText(`${value}`)
    }

    // navigator.clipboard.writeText(`${value}`)
    return (
        <div>
            <Button onClick={handleCopying}>
                {!isCopied ? 'Copy' : 'Copied' }
            </Button>
        </div>
    );
};

export default CopyTextButton;
