import axios from 'axios';
import {useParams} from 'react-router-dom'
import React, {useState,useEffect} from 'react'
import {detailvoucherURL} from "../urls"
import Voucherinfo from "../hocs/Voucherinfo"
import { headers } from '../actions/auth';
let Pagesize=10
const Detailvoucher=()=>{
    const { id } = useParams(); 
    const [voucher,setVoucher]=useState({name_of_the_discount_program:'',code_type:'All',code:'',
        valid_from:null,valid_to:null,discount_type:'Percent',amount:null,percent:null,limit:'U',
        maximum_usage:null,voucher_type:"Offer",maximum_discount:null,minimum_order_value:null,
        setting_display:'Show many'})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const getJournal = async () => {
            await axios(detailvoucherURL+id,headers)
           // <-- passed to API URL
            .then(res=>{
                let data=res.data
                const limit=data.maximum_discount==null?'U':'L'
                setVoucher({...data.voucher,limit:limit})
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
            edit={true}
            url_voucher={detailvoucherURL+id}
            />
        </>
    )
}

export default Detailvoucher