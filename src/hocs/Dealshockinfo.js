
import React, {useState,useEffect,useCallback,useRef, memo} from 'react'
import {code_type,timevalue} from "../constants"
import Timeoffer from "./Timeoffer"
const Dealshockinfo=({deal,setform,editdeal,disable,setdealtype,edit,state,setdatevalid,time_start,time_end})=>{
    return(
        <div className="voucher-basic-info">
            <h4>info basic</h4>
            <div className="basic-info-wrapper">
                <div>
                    <div className="info__edit">
                        <div className="item-center mb-1">                                           
                            <label for="" className="form-item__label">Code type</label>                                                  
                            <div className="d-flex ">
                                {code_type.map(item=>
                                    <div key={item.value} onClick={()=>setdealtype(item)} className={`voucher-card ${deal.shock_deal_type === item.value && disable?'disable':''}`}>
                                        <img src={item.image} alt="" height="40px"/>
                                        <span className="ml-1">{item.name}</span> 
                                        <div className={`top-right ${deal.shock_deal_type==item.value?'top-right-active':''}`}>
                                            <i className="icon icons _197TMCnJUWA9y6pE8Fp4-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03 7.47a.75.75 0 00-1.06 1.06l3.358 3.359a.75.75 0 001.06 0l5.863-5.862a.75.75 0 00-1.061-1.06l-5.332 5.33L4.03 7.47z"></path></svg>
                                            </i>
                                        </div>
                                    </div>
                                )}  
                            </div>
                        </div>
                        <div className="item-base-line mb-1">
                            <label for="" className="form-item__label title-deal">Program name {deal.shock_deal_type=='1'?'buy with shock deal':'by to receive gifts'}</label>
                            <div className="">
                                <div className="input-inner" style={{width: '420px'}}> 
                                    <input onChange={(e)=>setform(e)} type="text" className="form-select" value={deal.program_name_buy_with_shock_deal} name="program_name_buy_with_shock_deal" placeholder="Enter" style={{width: '420px'}} required=""/>
                                    <div className="input__suffix">
                                    </div>
                                </div>
                                <div className="info_more info-deal">The name {deal.shock_deal_type=='1'?'Shock Deal':'Buy to Get Gifts'} will not be visible to the buyer.</div>
                            </div>
                        </div>
                        <div className="item-base-line mb-1">
                            <label for="" className="form-item__label">Time to save discount code</label>
                            <Timeoffer
                            state={state}
                            data={deal}
                            selectRange={true}
                            time_end={time_end}
                            time_start={time_start}
                            setdatevalid={(index,date)=>setdatevalid(index,date)}
                            edit={edit}
                            />
                        </div>
                        <div className="item-base-line mb-1">
                            <label className="form-item__label">{deal.shock_deal_type=='1'?'Limited product bundles':'Conditions for receiving gifts'}</label>          
                            <div className={`${deal.shock_deal_type=='1'?'':'bundle-info-form item-center'}`}>
                                {deal.shock_deal_type=='1'?<>
                                <div className="input-inner" style={{width: '420px'}}> 
                                    <input onChange={(e)=>setform(e)} type="text" className="form-select" value={deal.limited_product_bundles} name="limited_product_bundles" placeholder="Enter" style={{width: '420px'}} required=""/>
                                    <div className="input__suffix">
                                    </div>
                                </div>
                                <div className="info_more">The maximum number of shock deal products per customer is allowed to purchase with each order.</div>
                                </>:
                                <>
                                Buy
                                    <div className="input-inner mx-1_2"> 
                                        <input onChange={(e)=>setform(e)} type="text" className="form-select" value={deal.minimum_price_to_receive_gift} name="minimum_price_to_receive_gift" placeholder="" minLength="10" maxLength="100" style={{width: '140px'}} required=""/>
                                        <div className="input__suffix">
                                            <span className="input__suffix-split"></span>₫
                                        </div>
                                    </div>
                                    to receive                                            
                                    <div className="input-inner mx-1_2"> 
                                        <input onChange={(e)=>setform(e)} type="text" className="form-select" value={deal.number_gift} name="number_gift" placeholder="quantity less than 50" minLength="10" maxLength="100" style={{width: '160px'}} required=""/>
                                        <div className="input__suffix">
                                        </div>
                                    </div>
                                gift
                                </>}      
                            </div>
                        </div>
                    </div>
                    <div className="item-base-line mb-1">
                        <label for="" className="form-item__label"></label>
                        <button onClick={()=>editdeal()} type="button" className="save btn-m btn-orange">
                            <span>Save</span>
                        </button> 
                    </div>
                </div>
                <div>  
                    <img src="https://deo.shopeemobile.com/shopee/seller-live-sg/rootpages/static/modules/vouchers/image/multilang_voucher_illustration_vn.29df4f1.png" alt=""/>
                </div>
            </div>
        </div>
    )
}
export default memo(Dealshockinfo)