
import React, {useState} from 'react'
import Promotioninfo from "../hocs/Promotioninfo"
import {newcomboURL} from "../constants"
const Newpromotion=()=>{
    const [combo,setCombo]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    quantity_to_reduced:null,discount_price:null,price_special_sale:null,
    discount_percent:0,limit_order:null,promotion_combo_name:'',combo_type:'1',
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
        ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(true)
    
    return(
        <>
            <Promotioninfo
            item_combo={itemshop}
            loading_content={loading}
            combo_shop={combo}
            date_combo={date}
            url_combo={newcomboURL}
            
            />
        </>
    )
}
export default Newpromotion