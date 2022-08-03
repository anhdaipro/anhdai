
import Programinfo from "../../hocs/Programinfo"
import React, {useState} from 'react'
import {newprogramURL} from "../../urls"
import { valid_from,valid_to } from "../../constants"

const Newprogram=()=>{
    
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    
    return(
        <>
            <Programinfo
            loading_content={loading}
            item_program={itemshop}
            url_program={newprogramURL}
            />
        </>
    )
}
export default Newprogram