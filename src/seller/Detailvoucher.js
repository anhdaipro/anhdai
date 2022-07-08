import axios from 'axios';
import {useParams} from 'react-router-dom'
import React, {useState,useEffect} from 'react'
import {detailvoucherURL} from "../constants"
import Voucherinfo from "../hocs/Voucherinfo"
import { headers } from '../actions/auth';
let Pagesize=10
const Detailvoucher=()=>{
    const { id } = useParams(); 
    const [voucher,setVoucher]=useState({name_of_the_discount_program:'',code_type:'All',code:'',
        valid_from:null,valid_to:null,discount_type:'Percent',amount:null,percent:null,limit:'U',
        maximum_usage:null,voucher_type:"Offer",maximum_discount:null,minimum_order_value:null,
        setting_display:'Show many'})
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
        ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailvoucherURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                const limit=data.voucher.maximum_discount==null?'U':'L'
                setVoucher({...data.voucher,limit:limit})
                setDate([{time:new Date(data.voucher.valid_from),show:false,hours:new Date(data.voucher.valid_from).getHours(),minutes:new Date(data.voucher.valid_from).getMinutes()}
              ,{time:new Date(data.voucher.valid_to),show:false,hours:new Date(data.voucher.valid_to).getHours(),minutes:new Date(data.voucher.valid_to).getMinutes()}])
                setLoading(true)
                setItem({...itemshop,items_choice:data.items_choice,page_count_main:Math.ceil(data.items_choice.length / Pagesize)})
          })
        }
        getJournal();
    }, [id]);

    return(
        <>
            <Voucherinfo
            itemvoucher={itemshop}
            loading_content={loading}
            voucher_shop={voucher}
            date_voucher={date}
            url_voucher={detailvoucherURL+id}
            />
        </>
    )
}

export default Detailvoucher