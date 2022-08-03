import React, {useState} from 'react'
import {newFollowOffershopURL, vouchershopURL} from "../../urls"
import { valid_from, valid_to } from '../../constants'
import FollowerOfferInfo from '../../hocs/FollowerOfferInfo'
const NewFollowerOffer=()=>{
    const [loading,setLoading]=useState(true)
    return(
        <>
            <FollowerOfferInfo
                loading_content={loading}
                url={newFollowOffershopURL}
            />
        </>
    )
}

export default NewFollowerOffer