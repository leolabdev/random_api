// import UserTokens from "./UserTokens";
import Tables from "./Tables";
import UserHasAccessTables from "./UserHasAccessTables";
import React from "react";

const ProfileMain = (props) => {
    return (
        <div id="container">

            <br/>
            {/*<UserTokens></UserTokens>*/}
            <div  className='d-flex justify-content-left gap-3'
                  style={{textAlign : 'center',backgroundColor: '',width:''}}
            >
                <div style={{color: "#ADD8E6", fontWeight: '900'}}>&#9632; <span>Private</span></div>
                {/*<div style={{color: "#FFE898",fontWeight: '900'}}>&#9632; <span>Access required</span></div>*/}
                <div style={{color: "#FFD580",fontWeight: '900'}}>&#9632; <span>Required</span></div>
                <div style={{color: "#90EE90",fontWeight: '900'}}>&#9632; <span>Public</span></div>
                <div style={{color: "#FFB6C1",fontWeight: '900'}}>&#9632; <span>Permitted</span></div>
            </div>
            <br/>

            <Tables setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}></Tables>

            <UserHasAccessTables/>
            <br/>
        </div>
    );
};

export default ProfileMain;
