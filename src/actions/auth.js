import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GOOGLE_AUTH_SUCCESS,
    UPDATE_PROFILE,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    SHOW_CHAT,
    SHOW_THREADS,
    BUYAGAIN,
    SHOWONLINE
} from './types';
import {createthreadURL, listThreadlURL,buyagainURL,loginURL, user} from "../urls"
import axios from 'axios';
import { validatEemail } from '../constants';
import dayjs from 'dayjs';
const expirationDate = localStorage.getItem("expirationDate")
export const expiry=()=>{
  return  new Date(expirationDate).getTime() - new Date().getTime()
}
export const headers=()=>{
   return {'headers': localStorage.token && expiry()>0?{ Authorization:`JWT ${localStorage.token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
}
export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const res = await axios.get(user,{ 'headers': { Authorization:`JWT ${localStorage.token}` }})
            dispatch({
                 payload: res.data,
                    type: AUTHENTICATED_SUCCESS
            });
            localStorage.setItem('user',res.data.id);
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            localStorage.removeItem('user')
           
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const responseGoogle = (response) => async dispatch => {
    const res=await axios.post('https://web-production-fecd.up.railway.app/api-auth/convert-token', {
        token: response.accessToken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "456152692700-qape5ita2bvpgdb8rpnb5bkltg8mhpus.apps.googleusercontent.com",
        client_secret: "zg1qSsLmVaKs9d4XLcG3LXPk7p61jdU5k0LEepWyGwrokIuEmlgXxANZPTl32vLZK55XDS2LZAcrhOjDK2wZjsvbAsBW4tybAR6EVXbbsQMs8OpxCNHT4GU8FCRjiJt8",
    })
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res1= await axios.post(loginURL,JSON.stringify({token:res.data.access_token}), config)
    const data = res1.data
    localStorage.setItem("expirationDate", data.access_expires);
    localStorage.setItem('token',data.access);
    localStorage.setItem('refresh',data.refresh)
	window.location.href="/"
    dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data
    });
}
export const setuseronline=(data)=>{
    return{
        payload:data,
        type:SHOWONLINE
    }
}
export const responseFb = (accessToken) => async dispatch =>{
    try {
    const res=await axios.post('https://web-production-fecd.up.railway.app/api-auth/convert-token', {
        token: accessToken,
        backend: "facebook",
        grant_type: "convert_token",
        client_id: "Ae9Jn7CtA9wrHFvOdTtsFHyzp2iJOxAHDr2VE4Kb",
        client_secret: "zg1qSsLmVaKs9d4XLcG3LXPk7p61jdU5k0LEepWyGwrokIuEmlgXxANZPTl32vLZK55XDS2LZAcrhOjDK2wZjsvbAsBW4tybAR6EVXbbsQMs8OpxCNHT4GU8FCRjiJt8",
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res1= await axios.post(loginURL,JSON.stringify({token:res.data.access_token}), config)
        const data = res1.data
        localStorage.setItem("expirationDate", data.access_expires);
        localStorage.setItem('token',data.access);
        localStorage.setItem('refresh',data.refresh)
        dispatch({
            type: FACEBOOK_AUTH_SUCCESS,
            payload: res.data
        });
	window.location.href="/"
    }
    catch (err) {
        dispatch({
            type: FACEBOOK_AUTH_FAIL
        });
    }
};

export const loginotp = (user_id) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
   
    try {
        const res = await axios.post('https://web-production-fecd.up.railway.app/api/v4/login', JSON.stringify({user_id:user_id}), config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            
        });
        const expirationDate = new Date().getTime() + 1800 * 1000
        localStorage.setItem("expirationDate", expirationDate);
        const token = res.data.access;
        localStorage.setItem('token',token);
       
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
export const facebookAuthenticate = (state, code) => async dispatch => {
    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`https://web-production-fecd.up.railway.app/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });
        }
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const form=!validatEemail(username)?{username:username,password:password}:{email:username,password:password}
    try {
        const res = await axios.post(loginURL,JSON.stringify(form), config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            
        });
        
        const data = res.data
        
        localStorage.setItem("expirationDate", data.access_expires);
        localStorage.setItem('token',data.access);
        localStorage.setItem('refresh',data.refresh)
       
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (username, email, password,phone) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password, profile:{phone} });
   
    try {
        const res = await axios.post(`https://web-production-fecd.up.railway.app/api/v4/register`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`https://web-production-fecd.up.railway.app/api/v4/reset/password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uidb64, token, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uidb64, token,password});

    try {
        await axios.post(`https://web-production-fecd.up.railway.app/api/v4/password-reset/${uidb64}/${token}/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    dispatch({
        type: LOGOUT
    });
};
export const showthreads=()=> async dispatch=>{
    try{
        const res=await axios.get(listThreadlURL,headers())
        dispatch({
            type: SHOW_THREADS,
            payload: res.data
        })
    }
    catch(e){
        console.log(e)
    }
}
export const  buyagain=(data)=>async dispatch =>{
    try{
        const datacart=data.cart_item.map(cartitem=>{
            return(cartitem.product_id)
        })
        const form={product_id:datacart,shop_id:data.shop.id}
        const res=await axios.post(buyagainURL,JSON.stringify(form),headers())
        dispatch({
            type: BUYAGAIN,
            payload: res.data
        })
    }
    catch(e){
        console.log(e)
    }
}
export const showchat = (data) => async dispatch => {
    try{
        if(!data.thread){
            const res=await axios.post(createthreadURL,JSON.stringify(data),headers())
            const datachat={showchat:true,...res.data}
            dispatch({
                type: SHOW_CHAT,
                payload: datachat
            })
        }
        else{
            dispatch({
                type: SHOW_CHAT,
                payload: data
            })
        }  
    }
    catch(e){
        console.log(e)
    }
} 

export const updateprofile=(data)=>{
    return {
        type:UPDATE_PROFILE,
        payload:data
    }
}
