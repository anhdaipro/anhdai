import axios from 'axios';
import React, {useState,useEffect,useCallback,useRef} from 'react'
import {localhost,newdealURL} from "../urls"
import 'react-calendar/dist/Calendar.css';
import Dealshockinfo from "../hocs/Dealshockinfo"
import Navbar from "./Navbar"

import { headers } from '../actions/auth';
const Newdealshock=()=>{
    const [deal,setDeal]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),limited_product_bundle:null,minimum_price_to_receive_gift:null,number_gift:null,
    program_name_buy_with_shock_deal:'',shock_deal_type:'1',valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [disable,setDisable]=useState(false)
    const onChange = useCallback((datechoice) => {
        const list_date=date.map(item=>{
            if(item.show){
                return({...item,time:datechoice})
            }
            return({...item})
        })

        setDate(list_date);
    },[date])

    const settimechoice=useCallback((value,index,name)=>{
        const list_date=date.map((item,i)=>{
            if(i==index){
                console.log(name)
                return({...item,[name]:value})
            }
            return({...item})
        })
        setDate(list_date); 
    },[date])

    const setindexchoice=useCallback((list_date)=>{
        setDate(list_date);
    },[date])

    const setdatevalid=useCallback((index)=>{
        if(index==0){
            deal.valid_from=date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)
            setDeal({...deal,valid_from:deal.valid_from})

        }
        else{
            setDeal({...deal,valid_to:deal.valid_to})
            deal.valid_to=date[index].time.toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,10)+' '+('0'+date[index].hours).slice(-2)+':'+("0"+date[index].minutes).slice(-2)
        }
    },[date])

    const setform=useCallback((e)=>{
        setDeal({...deal,[e.target.name]:e.target.value})
    },[deal])

    const editdeal=useCallback(()=>{
        const datadeal= Object.keys(deal).map(item=>{
            if(deal[item]!=null){
                return({item:deal[item]})
            }
        })
        const data={...datadeal,action:'change'}
        axios.post(newdealURL,JSON.stringify(data),headers)
        .then(res=>{
            let id=res.data.id
           
        })
    },[])

    const setdealtype=useCallback((item)=>{
        setDeal({...deal,shock_deal_type:item.value})
    },[deal])

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
                            settimechoice={(value,index,name)=>settimechoice(value,index,name)}
                            setindexchoice={(list_date)=>setindexchoice(list_date)}
                            setdatevalid={(index)=>setdatevalid(index)}
                            onChange={(datechoice)=>onChange(datechoice)}
                            disable={disable}
                            date={date}
                            deal={deal}
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