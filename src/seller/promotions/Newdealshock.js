import axios from 'axios';
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {localhost,newdealURL} from "../../urls"
import Dealshockinfo from "../../hocs/Dealshockinfo"
import Navbar from "../Navbar"
import { headers } from '../../actions/auth';
import { Navigate, useNavigate } from 'react-router';
import { valid_from, valid_to ,time_end,timevalue} from '../../constants';
const Newdealshock=()=>{
    const [deal,setDeal]=useState({valid_from:valid_from.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),limited_product_bundle:null,minimum_price_to_receive_gift:null,number_gift:null,
    program_name_buy_with_shock_deal:'',shock_deal_type:'1',valid_to:valid_to.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [disable,setDisable]=useState(false)
    const navigate=useNavigate()
    const [timestart,setTime_start]=useState(()=>timevalue(new Date()))
    const [timeend,setTime_end]=useState(()=>timevalue(time_end))
   
    const setdatevalid=(index,date)=>{
        if(index==0){
            setDeal({...deal,valid_from:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
        else{
            setDeal({...deal,valid_to:date.time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date.hours).slice(-2)+':'+("0"+date.minutes).slice(-2)})
        }
    }

    const setform=(e)=>{
        setDeal({...deal,[e.target.name]:e.target.value})
    }

    const editdeal=()=>{
        axios.post(newdealURL,JSON.stringify(deal),headers())
        .then(res=>{
            let id=res.data.id
            navigate(`/marketing/add-on-deal/${id}`)
        })
    }

    const setdealtype=(item)=>{
        setDeal({...deal,shock_deal_type:item.value})
    }

    return(
        <>
            <Navbar/>
            <div className="wrapper" data-v-448b76c5>
                <div className="wrapper-content">
                    <div data-v-7c09c0b8="" className="header">
                        <p data-v-7c09c0b8="" className="title">
                            <span data-v-7c09c0b8="" className="title-text">Tạo Deal Sốc</span>
                        </p>
                    </div>
                    <div className="main_info info-basic-deal">
                        <Dealshockinfo
                            editdeal={()=>editdeal()}
                            setdealtype={item=>setdealtype(item)}
                            setform={(e)=>setform(e)}
                            setdatevalid={(index,date)=>setdatevalid(index,date)}
                            disable={disable}
                            date={date}
                            deal={deal}
                            time_end={timeend}
                            time_start={timestart}
                        />
                    </div>
                    <div className="main_info">
                        <div className="title">Main product</div>
                        <div>The maximum amount of each customer can buy is 100 main products in the same program Shock Deal</div>
                    </div>
                    <div className="main_info">
                        <div className="title">Bundled products</div>
                        <div>Buyers can enjoy discounted purchases when they purchase any major product.</div>
                    </div>
                    <div className="bottom-card">
                        <div className="fix-container fixed-bottom">
                            <div className="action-button">
                                <button className="cancel btn-m btn-light">Cancel</button>
                                <button className="submit btn-orange btn-m" type="button" >Submit</button>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>

             
        </>
    )
}
export default Newdealshock