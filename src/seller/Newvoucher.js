import React, {useState} from 'react'
import {vouchershopURL} from "../urls"
import Voucherinfo from "../hocs/Voucherinfo"
const Newvoucher=()=>{
    const [voucher,setVoucher]=useState({name_of_the_discount_program:'',code_type:'All',code:'',
        valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
        ,discount_type:'1',amount:null,percent:null,limit:'U',
        maximum_usage:null,voucher_type:"Offer",maximum_discount:null,minimum_order_value:null,
        setting_display:'Show many'})
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
        ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(true)
    return(
        <>
            <Voucherinfo
                itemvoucher={itemshop}
                loading_content={loading}
                voucher_shop={voucher}
                date_voucher={date}
                url_voucher={vouchershopURL}
            />
        </>
    )
}

export default Newvoucher