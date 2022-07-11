
import React, {useState} from 'react'
import Flashsaleinfo from "../hocs/Flashsaleinfo"
import { newflashsaleURL } from '../urls';
const Newflashsale=()=>{
    const [flashsale,setFlashsale]=useState({time:null,hour:null,minutes:null,minutes_to:null,
        hour_to:null
    })
    const [date,setDate]=useState({time:new Date(),hour:null,minutes:null,minutes_to:null,
        hour_to:null,show:false})
    const [show,setShow]=useState({items:false,byproduct:false})
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(true)

    return(
        <>
            <Flashsaleinfo
            date_flashsale={date}
            item_flashsale={itemshop}
            flashsale_shop={flashsale}
            loading_content={loading}
            url_flashsale={newflashsaleURL}
            />
        </>
    )
}
export default Newflashsale