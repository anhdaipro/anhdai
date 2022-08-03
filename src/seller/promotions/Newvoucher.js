import React, {useState} from 'react'
import {vouchershopURL} from "../../urls"
import Voucherinfo from "../../hocs/Voucherinfo"
import { valid_from, valid_to } from '../../constants'
const Newvoucher=()=>{
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
        ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(true)
    return(
        <>
            <Voucherinfo
                itemvoucher={itemshop}
                loading_content={loading}
                url_voucher={vouchershopURL}
            />
        </>
    )
}

export default Newvoucher