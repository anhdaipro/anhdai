import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, expiry} from '../actions/auth';
import Message from "../containers/Chat" 
const Layout = ({children,checkAuthenticated }) => {
    useEffect(() => {
        if(localStorage.token && expiry>0){
        checkAuthenticated()
        }
    }, []);

    console.log(checkAuthenticated)
   
    return (
        <>  
            {children}
            <div id="modal"></div>
            <div id="mini-chat-embedded" style={{position: 'fixed', right: '8px', bottom: '0px', zIndex: 99999}}>
                <Message
            /> 
            </div>
            
        </>  
    );
};

export default connect(null,{checkAuthenticated})(Layout);
