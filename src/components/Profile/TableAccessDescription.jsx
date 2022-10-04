/**
 * Ui component which describes the accesses' colors
 * @returns {JSX.Element}
 * @constructor
 */
const TableAccessDescription = () => {
    return (
        <div  className='d-flex justify-content-left gap-3'
              style={{textAlign : 'center',backgroundColor: '',width:''}}
        >
            <div style={{color: "#ADD8E6", fontWeight: '900'}}>&#9632; <span>Private</span></div>
            {/*<div style={{color: "#FFE898",fontWeight: '900'}}>&#9632; <span>Access required</span></div>*/}
            <div style={{color: "#FFD580",fontWeight: '900'}}>&#9632; <span>Required</span></div>
            <div style={{color: "#90EE90",fontWeight: '900'}}>&#9632; <span>Public</span></div>
            <div style={{color: "#FFB6C1",fontWeight: '900'}}>&#9632; <span>Permitted</span></div>
        </div>
    );
};

export default TableAccessDescription;
