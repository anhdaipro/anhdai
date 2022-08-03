import React, {useState,useEffect} from 'react'
import {dataAddonURL, detailFollowOffershopURL} from "../../urls"
import { valid_from, valid_to,timevalue,timesubmit } from '../../constants'
import FollowerOfferInfo from '../../hocs/FollowerOfferInfo'
import { useParams} from "react-router-dom";
import axios from 'axios';
import { headers } from '../../actions/auth';

const DetailFollowerOffer=()=>{
    const { id } = useParams(); 
    const [loading,setLoading]=useState(true)
    const [follower_offer,setFolloweroffer]=useState({valid_from:new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16),
    promotion_name:'',combo_type:'1',
    valid_to:new Date(new Date().setHours(new Date().getHours()+1)).toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).substr(0,16)
    })
    
    useEffect(() => {
        const getJournal = async () => {
            await axios(`${detailFollowOffershopURL}/${id}`,headers)
            .then(res=>{
                let data=res.data
                const limit=data.maximum_discount==null?'U':'L'
                setFolloweroffer({...data,limit:limit,valid_from:timesubmit(data.valid_from),valid_to:timesubmit(data.valid_to)})
                setLoading(true)
          })
        }
        getJournal();
    }, [id])
    return(
        <>
            <FollowerOfferInfo
                loading_content={loading}
                follower_offer_shop={follower_offer}
                url={detailFollowOffershopURL}
            />
        </>
    )
}

export default DetailFollowerOffer