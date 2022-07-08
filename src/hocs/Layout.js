import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated} from '../actions/auth';

const Layout = ({children,checkAuthenticated }) => {
    useEffect(() => {
        if(localStorage.token!='null'){
        checkAuthenticated()
        }
    }, []);

    console.log(checkAuthenticated)
   
    return (
        <>  
            {children}
            
        </>
        
    );
};

export default connect(null,{checkAuthenticated})(Layout);
