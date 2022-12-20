import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, expiry} from '../actions/auth';
import Message from "../containers/Chat" 
const Layout = ({children,checkAuthenticated,user }) => {
    useEffect(() => {
        if(localStorage.token && expiry()>0){
        checkAuthenticated()
        }
    }, []);

    console.log(checkAuthenticated)
    return (
        <>  
            {children}
            <div id="modal"></div>
            <Message
            />

           
            
        </>  
    );
};

export default connect(null,{checkAuthenticated})(Layout);
