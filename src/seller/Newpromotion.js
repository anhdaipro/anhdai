
import React, {useState} from 'react'
import { valid_from, valid_to } from '../constants'
import Promotioninfo from "../hocs/Promotioninfo"
import {newcomboURL} from "../urls"
const Newpromotion=()=>{
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(true)
    return(
        <>
            <Promotioninfo
            url_combo={newcomboURL}
            
            />
        </>
    )
}
export default Newpromotion