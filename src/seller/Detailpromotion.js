import axios from 'axios';
import React, {useState,useEffect} from 'react'
import Promotioninfo from "../hocs/Promotioninfo"
import {detailcomboURL} from "../constants"
import { useParams,Link } from "react-router-dom";
import { headers } from '../actions/auth';
let Pagesize=5

const Detailpromotion=()=>{
    const { id } = useParams(); 
    const [combo,setCombo]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    quantity_to_reduced:null,discount_price:null,price_special_sale:null,
    discount_percent:0,limit_order:null,promotion_combo_name:'',combo_type:'1',
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailcomboURL+id,headers)
            .then(res=>{
                let data=res.data
                setCombo(data.promotion_combo)
                setDate([{time:new Date(data.promotion_combo.valid_from),show:false,hours:new Date(data.promotion_combo.valid_from).getHours(),minutes:new Date(data.promotion_combo.valid_from).getMinutes()}
              ,{time:new Date(data.promotion_combo.valid_to),show:false,hours:new Date(data.promotion_combo.valid_to).getHours(),minutes:new Date(data.promotion_combo.valid_to).getMinutes()}])
                setLoading(true)
                setItem({...itemshop,items_choice:data.items_choice,page_count_main:Math.ceil(data.items_choice.length / Pagesize)})
          })
        }
        getJournal();
    }, [id])

    return(
        <>
            <Promotioninfo
            item_combo={itemshop}
            loading_content={loading}
            combo_shop={combo}
            date_combo={date}
            url_combo={detailcomboURL+id}
            
            />
        </>
    )
}
export default Detailpromotion

