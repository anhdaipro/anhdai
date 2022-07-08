
import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import Header from './Header';
const Welcomeseller=()=>{
    const navite=useNavigate()
    return(
        <div id="app">
            <div data-v-5634b4d5="" className="onboarding-page">
                <Header/>
                <div data-v-0c861202="" data-v-5634b4d5="" className="welcome card">
                    <div data-v-0c861202="" className="onboarding-welcome" page_id="3033">
                        <img src="https://res.cloudinary.com/dupep1afe/image/upload/v1650065137/upload_9dab85081088531ee6d1aa958a90f55e_zfawb5.png" alt="welcome" className="onboarding-welcome__img"/> 
                        <h3 className="onboarding-welcome__title">Chào mừng đến ANh!</h3> 
                        <p className="onboarding-welcome__desc">Để đăng ký bán hàng trên Anh, bạn cần cung cấp một số thông tin cơ bản.</p> 
                        <button onClick={()=>navite('/vendor/onboarding/form')} type="button" className="onboarding-welcome__btn button btn-orange">
                            <span>Đăng ký</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcomeseller