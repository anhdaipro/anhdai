
import Programinfo from "../hocs/Programinfo"
import React, {useState} from 'react'
import {newprogramURL} from "../urls"
const Newprogram=()=>{
    const [program,setProgram]=useState({name_program:'',valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    const [date,setDate]=useState([{time:new Date(),show:false,hours:new Date().getHours(),minutes:new Date().getMinutes()}
    ,{time:new Date(),show:false,hours:new Date().getHours()+1,minutes:new Date().getMinutes()}])
    const [itemshop,setItem]=useState({items:[],page_count_main:0,items_choice:[],savemain:false
    ,page_count_by:0,byproduct:[],byproduct_choice:[],savebyproduct:false})
    const [loading,setLoading]=useState(false)
    
    return(
        <>
            <Programinfo
            loading_content={loading}
            item_program={itemshop}
            date_program={date}
            program_shop={program}
            url_program={newprogramURL}
            />
        </>
    )
}
export default Newprogram