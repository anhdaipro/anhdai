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
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    SHOW_CHAT,
    SHOW_THREADS,
    BUYAGAIN
} from './types';
import {createthreadURL, listThreadlURL,buyagainURL} from "../urls"
import axios from 'axios';
axios.defaults.withCredentials = true;
const expirationDate = localStorage.getItem("expirationDate")
export const expiry=new Date(expirationDate).getTime() - new Date().getTime()
export const headers={'headers': localStorage.token!='null' && expiry>0?{ Authorization:`JWT ${localStorage.token}`,'Content-Type': 'application/json' }:{'Content-Type': 'application/json'}}
export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        try {
            const res = await axios.get(`https://anhdai.herokuapp.com/api/v4/user-id/`,{ 'headers': { Authorization:`JWT ${localStorage.token}` }})
            dispatch({
                 payload: res.data,
                    type: AUTHENTICATED_SUCCESS
            });
            localStorage.setItem('user',res.data.id);
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
            localStorage.user=null
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const googleAuthenticate = (state, code) => async dispatch => {
    if (state && code) {
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
            const res = await axios.post(`https://anhdai.herokuapp.com/auth/o/google-oauth2/?${formBody}`, config);
            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: GOOGLE_AUTH_FAIL
            });
        }
    }
};

export const googleLogin = (accessToken) => async dispatch => {
    try {
        const res=await axios.post('https://anhdai.herokuapp.com/api-auth/convert-token', {
			token: accessToken,
            backend: "google-oauth2",
            grant_type: "convert_token",
            client_id: "Ae9Jn7CtA9wrHFvOdTtsFHyzp2iJOxAHDr2VE4Kb",
            client_secret: "zg1qSsLmVaKs9d4XLcG3LXPk7p61jdU5k0LEepWyGwrokIuEmlgXxANZPTl32vLZK55XDS2LZAcrhOjDK2wZjsvbAsBW4tybAR6EVXbbsQMs8OpxCNHT4GU8FCRjiJt8",
		})
        dispatch({
            type: GOOGLE_AUTH_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('access_token', res.data.access_token);
		localStorage.setItem('refresh_token', res.data.refresh_token);
    }
    catch (err) {
        dispatch({
            type: GOOGLE_AUTH_FAIL
        });
    }
};

export const facebookLogin = (accessToken) => async dispatch =>{
    try {
    const res=await axios.post('https://anhdai.herokuapp.com/api-auth/convert-token', {
        token: accessToken,
        backend: "facebook",
        grant_type: "convert_token",
        client_id: "Ae9Jn7CtA9wrHFvOdTtsFHyzp2iJOxAHDr2VE4Kb",
        client_secret: "zg1qSsLmVaKs9d4XLcG3LXPk7p61jdU5k0LEepWyGwrokIuEmlgXxANZPTl32vLZK55XDS2LZAcrhOjDK2wZjsvbAsBW4tybAR6EVXbbsQMs8OpxCNHT4GU8FCRjiJt8",
        })
        dispatch({
            type: FACEBOOK_AUTH_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('access_token',res.data.access_token);
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
    let form=new FormData()
    form.append('user_id',user_id)
    
    try {
        const res = await axios.post('https://anhdai.herokuapp.com/api/v4/login', form, config);

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
            const res = await axios.post(`https://anhdai.herokuapp.com/auth/o/facebook/?${formBody}`, config);

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
    let form=new FormData()
    form.append('username',username)
    form.append('password',password)
    
    try {
        const res = await axios.post('https://anhdai.herokuapp.com/api/v4/login', form, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            
        });
        localStorage.setItem("expirationDate", res.data.access_expires);
        const token = res.data.access;
        localStorage.setItem('token',token);
       
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
        const res = await axios.post(`https://anhdai.herokuapp.com/api/v4/register`, body, config);

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
        await axios.post(`https://anhdai.herokuapp.com/api/v4/reset/password/`, body, config);

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
        await axios.post(`https://anhdai.herokuapp.com/api/v4/password-reset/${uidb64}/${token}/`, body, config);

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
    localStorage.token=null
    dispatch({
        type: LOGOUT
    });
};
export const showthreads=()=> async dispatch=>{
    try{
        const res=await axios.get(listThreadlURL,headers)
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
        const res=await axios.post(buyagainURL,JSON.stringify(form),headers)
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
            const res=await axios.post(createthreadURL,JSON.stringify(data),headers)
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
