import axios from 'axios';
import React, {useState, useEffect,useCallback,useRef} from 'react'
import {formatter,dataURLtoFile,checkDay,itemvariation,timeformat,timevalue} from "../constants"
import { connect } from 'react-redux';
import {conversationsURL,listThreadlURL,updatefileURL,} from "../urls"
import { headers,expiry} from '../actions/auth';
import io from "socket.io-client";
import {Link,useNavigate} from "react-router-dom"
import {debounce} from 'lodash';
const listaction=[ {name:'Ghim Trò Chuyện',gim:true},{name:'Bỏ gim cuộc Trò Chuyện',gim:false},
{name:'Đánh dấu đã đọc',unread:false},{name:'Đánh dấu đã đọc',unread:true},
{name:'Xóa trò chuyện',delete:true}]
const list_type_chat=[{'name':'Tất cả',value:'1'},{'name':'Unread',value:'2'},{'name':'Đã gim',value:'3'}]
const Shopmember=(props)=>{
    const {thread,setshop,showdata,sendproduct,sendorder,loadingdata,setloading,shopchoice,user,listmember,showmoreitem,setshopchoice,shop}=props
    const [show,setShow]=useState(false)
    const [keyword,setKeyword]=useState('')
    const shopref=useRef()
    useEffect(()=>{
        if(showdata.show_product||showdata.show_order){
            setShow(true)
        }
        else{
            setShow(false)
        }
    },[showdata])
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick = (event) => {
        const { target } = event
        if(shopref.current!=null){
            if (!shopref.current.contains(target)) {
                setShow(false)
            }
        }
    }
    const fetchkey=(e)=>{
        const value=e.target.value
        setKeyword(value)
        fetchdata(value)
    }
    const fetchdata=useCallback(debounce((value)=>{
        (async()=>{
            setloading(false)
            const res= await axios.get(`${conversationsURL}/${thread.id}?user_id=${shop.user_id}&action=showitem&keyword=${value}`,headers)
            setshop({list_items:res.data.list_items})
            setloading(true)
        })()
        
    },1000),[thread,shop])

    return(
        <>
        {show?
        <div ref={shopref} className="src-product">
            <div className="src-product-content--1mfan">
                <div className="src-components-index__root--3vLtz">
                    <div className="_7-BLd7BF4x null">
                    <div className="_3vLtzAtDd0qclx5tZzPjE1">
                    {shop.choice=='item'?
                    <>
                    <div className="src-components-index__tabs--Y19NK">
                        {listmember.filter(member=>member.count_product_shop>0).map(member=>
                        <div onClick={(e)=>setshopchoice(member.user_id)} className={`${member.user_id==shopchoice?'src-components-index__active--2KOj5':''} src-components-index__header--2FJYt src-modules-ProductPopover-index__complete--3dtzk`}>
                            <div className={`${member.user_id==shopchoice?'_2KOj5VuVuj4vllVcc2JdME':''} _2FJYtfdtHjeRTnhvvl2K60 VVy7Epss6jbZON_gAV8DL`}>
                                <div className="_3QOGROVLeZnXLm4tuSQ1mw">
                                    <div className="_2SUuRqTi0kYb8yVs0qG7Vy">
                                        <div className="_2xGjvAuHdCo364lNgvhQYC undefined">
                                            <div className="_29uoglXEwg_2RaVW0_CFBG">
                                                <img alt="" src="https://cf.shopee.vn/file/e09b7eec5fbf3add1ed6287059ad87cd"/>
                                                <div className="_2Wkz3CDhCMDEZwE7G91OSy"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_33otEWhJi9FGHJjr-QenUb" title={`${member.user_id==user.id?'Shop của Tôi':member.username}`}>{member.user_id==user.id?'Shop của Tôi':member.username}</div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="src-components-index__main--RhtCG">
                        <section className="src-modules-index__container--2BjL8">
                        <div className="Wm99cbuMTHUN-lPHdXJcw">
                            <div title="" className="Cgb3ZVppxcdV9lpRAtf_Z _1DNCoJpKBYj0FIH4kdEoQ2 ">
                            <input className="_3oQvjrwelQNbCCFf7TLCw2" placeholder="Tìm kiếm" onChange={e=>fetchkey(e)} value={keyword}/>
                            <div className="eFqTfAmTMJ6cXc3Y2pFCG _1DNCoJpKBYj0FIH4kdEoQ2">
                                <div className="_3d4w9o9pz5PFzKbRKZsBnn"><i className="_3kEAcT1Mk5 _2w7NPuMDjqdQj1bLEtEyn3"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><g transform="translate(3 3)"><path d="M393.846 708.923c174.012 0 315.077-141.065 315.077-315.077S567.858 78.77 393.846 78.77 78.77 219.834 78.77 393.846s141.065 315.077 315.077 315.077zm0 78.77C176.331 787.692 0 611.36 0 393.845S176.33 0 393.846 0c217.515 0 393.846 176.33 393.846 393.846 0 217.515-176.33 393.846-393.846 393.846z"></path><rect transform="rotate(135 825.098 825.098)" x="785.713" y="588.79" width="78.769" height="472.615" rx="1"></rect></g></svg></i></div></div></div></div>
                            <div className="_3-vMpVByDVfsbNbjW0Gevd">
                                <div onScroll={(e)=>showmoreitem(e,'item')} className="_31xcV2AYAe7PQCE5go9tBW">
                                    
                                    {shop.list_items.map(item=>
                                        <div className="_1DGA-XJjpraK9hM8eikWlD" key={item.id}>
                                            <div className="_1xYuf-CUfbCu2l4v3KD11l">
                                                <img alt="" className="_2xTkYOoqGC3DJpd0pTYF66" src={item.image}/>
                                                <div className="_2c8yVDz8vsa8w41K7EsTMn">
                                                    <div className="_1Cq62Bf6tvJC3Bf6efiMj7">
                                                        <div style={{overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', display: '-webkit-box', WebkitLineClamp: 1}}>
                                                            <div title={`${item.name}`} style={{width: `100%`, wordBreak: `break-all`}}> {item.name}</div>
                                                        </div>
                                                    </div>
                                                <div className="_3a6r65Fja-PAPufuq_uQ6I"></div>
                                                <div className="_3gFaGjBODalETgK02YnB_F">₫{formatter.format(item.min_price*(1-item.percent_discount/100))} {item.min_price<item.max_price?` - ₫${formatter.format(item.max_price*(1-item.percent_discount/100))}`:''}</div>
                                            </div>
                                        </div>
                                        <div className="_2_gLCkJ8OCG2K6t27pYdD2 ">
                                            <div onClick={(e)=>sendproduct(e,item)} className="_2Al9UPDLsxMEfnJkCa3HQD">Gửi</div>
                                            <div className="_3bQkg0Y5mVCrvuPfuQSEM-">
                                                <div className="_10VxDOhu-xe6SAa18uZyqh">{item.item_inventory} có sẵn</div>
                                                <div>{item.number_order} đã bán</div>
                                            </div>
                                        </div>
                                    </div>     
                                    )}
                                    {loadingdata?<>
                                    {shop.list_items.length==0?
                                    <div class="_3YurerlznH jHfK1c-Py0hqmZG0XqDnq">
                                        <img src='https://res.cloudinary.com/dupep1afe/image/upload/v1657708116/download_5_jxvcq5.png' class="_1jxtCX6jiG"/>
                                        <div class="_3l9IBXMpxr">Không có kết quả nào</div>
                                    </div>:''}</>:
                                    <div className="_3YurerlznH jHfK1c-Py0hqmZG0XqDnq">
                                        <div className="loading_item item-center">
                                            <div className="ball"></div>
                                            <div className="ball"></div>
                                            <div className="ball"></div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </section>
                    </div>
                    </>
                    :
                    <>
                    <div className="src-components-Common-ListContainer-index__tabs--Y19NK">
                        <div className="src-components-Common-ListContainer-index__header--2FJYt ">Mua</div>
                    </div>
                    <div className="src-components-index__main--RhtCG">
                        <div onScroll={(e)=>showmoreitem(e,'order')} className="src-components-Common-ScrollList-style__root--31xcV">
                            {shop.list_orders.map(order=>
                                <div className="src-modules-order-index__root--yf6BH" key={order.id}>
                                    <div className="src-modules-order-index__header--MQYX3">
                                        <div className="src-modules-order-index__shop--3s53F">
                                            <div className="src-modules-order-index__avatar--3WmjS">
                                                <div className="src-components-avatar-index__root--2xGjv undefined">
                                                    <i className=" _3kEAcT1Mk5 src-components-avatar-index__shop--1erCv">
                                                        <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path fillRule="evenodd" clip-rule="evenodd" d="M1.438.5a.5.5 0 00-.485.382L.073 4.5A1.461 1.461 0 000 4.957C0 5.81.733 6.5 1.636 6.5a1.65 1.65 0 001.455-.835 1.65 1.65 0 001.454.835A1.65 1.65 0 006 5.665a1.65 1.65 0 001.455.835 1.65 1.65 0 001.454-.835 1.65 1.65 0 001.455.835C11.267 6.5 12 5.81 12 4.957c0-.102-.01-.201-.03-.298h.002L11.048.881A.5.5 0 0010.562.5H1.438zm8.926 6.98c.27 0 .532-.04.779-.114v3.277a1 1 0 01-1 1H1.857a1 1 0 01-1-1V7.366a2.704 2.704 0 001.5.017v2.76h7.286v-2.76c.23.063.473.097.72.097z"></path></svg>
                                                    </i>
                                                </div>
                                            </div>
                                            <div className="src-modules-order-index__name--MHX5O">{order.shop}</div>
                                        </div>
                                        <div className="src-modules-order-index__status--1opb5">
                                            <i className={`_3kEAcT1Mk5 src-modules-order-index__status-icon--BSEvA src-modules-order-index__${order.received?'completed':order.canceled?'canceled':'waiting'}--yk7cQ`}>
                                            <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M6 2.25v1.5h6v-1.5h3a.75.75 0 01.75.75v12a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V3A.75.75 0 013 2.25h3zm1.409 8.553L5.288 8.682l-1.061 1.06 3.182 3.183 6.364-6.364-1.06-1.061-5.304 5.303zM7.5 1.5h3a.75.75 0 01.75.75V3h-4.5v-.75a.75.75 0 01.75-.75z"></path></svg>
                                            </i>{order.received?'Hoàn tất':order.canceled?'Đã hủy':order.being_delivery?"Đang vận chuyển":'Chờ xác nhận'}
                                        </div>
                                    </div>
                                    <div className="src-modules-order-index__products--3f0tb">
                                        {order.cart_item.map(cartitem=>
                                            <div className="src-modules-orderCard-index__product--KTy0W" key={cartitem.id}>
                                                <div className="src-modules-orderCard-index__left--1P7zN src-modules-orderCard-index__center--3wE9z">
                                                    <img alt="" className="src-modules-orderCard-index__picture--2xI6-" src={cartitem.item_image}/>
                                                    <div>
                                                        <div className="src-modules-orderCard-index__name--hZc60">{cartitem.item_name}</div>
                                                        <div className="src-modules-orderCard-index__details--3V7Qm">Phân loại: {itemvariation(cartitem)}</div>
                                                    </div>
                                                </div>
                                                <div className="src-modules-orderCard-index__right--1ZZpT">
                                                    <div className="src-modules-orderCard-index__money--fhUD7">₫{cartitem.price}</div>
                                                    <div className="src-modules-orderCard-index__count--27aZv">x{cartitem.quantity}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="src-modules-order-index__details--1RkzD src-modules-order-index__content--JZYlh">
                                        <div>Tổng Cộng</div>
                                        <div className="src-modules-order-index__content--JZYlh">
                                            <div className="src-modules-order-index__counts--274SY">{order.count_item} products</div>
                                            <div className="src-modules-order-index__payment--69nYO">₫{formatter.format(order.total_final_order)}</div>
                                        </div>
                                    </div>
                                    <div className="src-modules-order-index__cancel--O-khp">
                                        {order.canceled?'Hủy bởi bạn':''}
                                    </div>
                                    <div>
                                        <div className="src-modules-order-index__button--2IX82">Chi Tiết</div>
                                        <div onClick={(e)=>sendorder(e,order)} className="src-modules-order-index__button--2IX82">Gửi</div>
                                    </div>
                                </div>
                            )}
                        </div>   
                    </div>
                    </>}
                    </div>
                    </div>
                </div>
            </div>
        </div>:''}
        </>
    )
}

const Threadinfo=(props)=>{
    const [show,setShow]=useState(false)
    const {thread,showmessage,setactionconversations,user,i}=props
    const threadref=useRef()
    const direact_chat=(thread)=>{
        return(thread.members.find(member=>member.user_id!=user.id))
    }
    const user_chat=(thread)=>{
        return(thread.members.find(member=>member.user_id==user.id))
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick = (event) => {
        const { target } = event
        if(threadref.current!=null){
            if (!threadref.current.contains(target)) {
                setShow(false)
            }
        }
    }
    const setaction=(e,thread,name,value)=>{
        setactionconversations(e,thread,name,value)
        setShow(false)
    }
    return(
        <div key={i} onClick={(e)=>{
            showmessage(e,thread)
        }} className="chat-pages-index__root" style={{height: '48px', left: '0px', position: 'absolute', top: `${i*48}px`, width: '100%'}}>
            <div className="chat-pages-index__avatar">
                <div className="chat-avatar-index__avatar-wrapper">
                    <img alt="" src={`${direact_chat(thread).avatar}`}/>
                    <div className="chat-avatar-index__avatar-border"></div>
                </div>
            </div>
            <div className="chat-pages-index__container">
                <div className="chat-pages-index__upper">
                    <div className="chat-pages-index__username" title={direact_chat(thread).name}>{direact_chat(thread).name}</div>
                </div>
                <div className="chat-pages-index__lower"> 
                    <>
                    {!thread.message_last?'':
                    thread.message_last.message_type=='1'?
                    <div className={`${thread.message_last.user_id!=user.id?'q66pz984':''} text-overflow`}>{thread.message_last.message}</div>
                    :thread.message_last.message_type=='2'?
                    <>
                    <i className="icon image-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M19 18.974V5H5v14h.005l4.775-5.594a.5.5 0 01.656-.093L19 18.974zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path></svg>
                    </i>
                    image</>:
                    thread.message_last.message_type=='3'?
                    <>
                    <i className="icon icon-document"> 
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="45.057px" height="45.057px" viewBox="0 0 45.057 45.057" style={{enableBackground:'new 0 0 45.057 45.057'}} xmlSpace="preserve">
                            <g>
                            <path d="M13.323,13.381c6.418,0,12.834,0,19.252,0c1.613,0,1.613-2.5,0-2.5c-6.418,0-12.834,0-19.252,0     C11.711,10.881,11.711,13.381,13.323,13.381z"></path>
                            <path d="M32.577,16.798c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,19.298,34.188,16.798,32.577,16.798z"></path>
                            <path d="M32.577,22.281c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,24.781,34.188,22.281,32.577,22.281z"></path>
                            <path d="M32.577,28.197c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,30.697,34.188,28.197,32.577,28.197z"></path>
                            <path d="M32.204,33.781c-6.418,0-12.834,0-19.252,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.834,0,19.252,0     C33.817,36.281,33.817,33.781,32.204,33.781z"></path>
                            <path d="M33.431,0H5.179v45.057h34.699V6.251L33.431,0z M36.878,42.056H8.179V3h23.707v4.76h4.992V42.056z"></path>
                            </g>
                        </svg>
                    </i>
                    video
                    </>:
                    thread.message_last.message_type=='5'?
                    <div className="text-overflow">Cam on ban da dat hang</div>:
                    <div className="text-overflow">Cam on ban da quan tam san pham</div>}
                    </>  
                </div>
            </div>
        
            <div ref={threadref} className="action-thread">
                {user_chat(thread).count_message_unseen>0?
                <div className="unread-message" id="unRead1">
                    <span className="badge badge-soft-danger rounded-pill">{user_chat(thread).count_message_unseen>99?'99+':user_chat(thread).count_message_unseen}</span>
                </div>:""}
                <div className="chat-messsage-time-last">
                    {thread.message_last?<>{checkDay(new Date(thread.message_last.date_created))=="Today"?`${("0" + new Date(thread.message_last.date_created).getHours()).slice(-2)}:${("0" + new Date(thread.message_last.date_created).getMinutes()).slice(-2)}`:checkDay(new Date(thread.message_last.date_created))=="Yesterday"?`Yesterday, ${("0" + new Date(thread.message_last.date_created).getHours()).slice(-2)}:${("0" + new Date(thread.message_last.date_created).getMinutes()).slice(-2)}`:new Date(thread.message_last.date_created).getFullYear()<new Date().getFullYear()?`${("0" + new Date(thread.message_last.date_created).getDate()).slice(-2)} Tháng ${("0"+(new Date(thread.message_last.date_created).getMonth()+1)).slice(-2)}, ${new Date(thread.message_last.date_created).getFullYear()}`:`${("0" + new Date(thread.message_last.date_created).getDate()).slice(-2)} Tháng ${(new Date(thread.message_last.date_created).getMonth()+1)}`}</>:''}
                </div>
                <div onClick={(e)=>setShow(!show)} id="460390502831204148" className="src-pages-index__three-dots">
                    <i className="_3kEAcT1Mk5 src-pages-ConversationLists-ConversationCells-index__three-dots-icon--1psZR ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="chat-icon"><path d="M224 576c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zM512 576c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zM800 576c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path></svg>
                    </i>
                </div>
                {show?
                <div className="drop-down-action-thread">
                    <div className="list-actions">
                        <div onClick={(e)=>setaction(e,thread,'gim',!thread.gim?true:false)} className="conversation-action-option">
                            <i className="action-options-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="chat-icon"><path d="M11.29 16.243H4.54v-2.872l2.927-1.9V2.444a1 1 0 011-1h7.073a1 1 0 011 1v8.957l3 1.97v2.872h-6.75v6.201h-1.5v-6.201zm6.75-1.5v-.563l-3-1.97V2.944H8.967v9.342l-2.927 1.9v.557h12z"></path></svg>
                            </i>{!thread.gim?'Ghim Trò Chuyện':'Bỏ gim trò chuyện'}
                        </div>
                        <div onClick={(e)=>setaction(e,thread,'seen',direact_chat(thread).count_message_unseen==0?true:false)} className="conversation-action-option">
                            <i className="action-options-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="chat-icon"><path d="M15 4c-.337.448-.6.954-.771 1.5H3.5v13.85l3.085-1.85H19.5v-5.525a4.968 4.968 0 001.5-.391V18a1 1 0 01-1 1H7l-5 3V5a1 1 0 011-1h12zm4 6.75a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zm0-1.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"></path></svg>
                            </i>{direact_chat(thread).count_message_unseen>0?'Đánh dấu đã đọc':'Đánh dấu chưa đọc'}
                        </div>
                        <div onClick={(e)=>setaction(e,thread,'delete',true)} className="conversation-action-option">
                            <i className="action-options-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="chat-icon"><path d="M3.5 5v.5h15V5h-4V3a.5.5 0 00-.5-.5H8a.5.5 0 00-.5.5v2h-4zM14 3v2H8V3h6zM9 9.5v8h.5v-8H9zm3.5 0v8h.5v-8h-.5zM5 7.5h-.5V21a.5.5 0 00.5.5h12a.5.5 0 00.5-.5V7.5H17V21H5V7.5z" stroke="#888"></path></svg>
                            </i>Xóa trò chuyện
                        </div>
                    </div> 
                </div>:''}
            </div>
            
        </div>
    )
}
const Message=(props)=>{
    const {threadstate,isAuthenticated,list_threads,user,messages,members,showchat,count_message_unseen}=props
    const [state, setState] = useState({show_type_chat:false,type_chat:1,user_search:null,loading:false,
    show_product:false,show_order:false,loading_more:false});
    const [show, setShow] = useState(false);
    const [showshop, setShowshop] = useState({show_product:false,show_order:false});
    const [shop,setShop]=useState({list_orders:[],list_items:[],count_product:0,count_order:0,choice:null})
    const [list_messages,setListmessages]=useState([]);
    const [message,setMessage]=useState('')
    const [threads,setThreads]=useState([]);
    const [message_unseen,setMessage_unseen]=useState(0)
    const [thread,setThread]=useState();
    const [showemoji,setShowemoji]=useState(false)
    const [show_type_chat,setShow_type_chat]=useState(false)
    const [receiver,setReceiver]=useState([])
    const [listfile,setListfile]=useState([]);
    const [listmember,setListmember]=useState([])
    const [typing,setTyping]=useState({typing:false,send_to:null})
    const [messagefile,setMessagefile]=useState([])
    const [length,setLength]=useState(40)
    const [typechat,setTypechat]=useState()
    const [loading,setLoading]=useState(false)
    const [shopchoice,setShopchoice]=useState();
    const navigate=useNavigate()
    const socket=useRef()   
    const scrollRef=useRef(null);
    const typechatref=useRef(null);
    const direact=listmember.find(member=>member.user_id!=user.id)
    const direact_user=listmember.find(member=>member.user_id==user.id)
    const direact_chat=(thread)=>{
        return(thread.members.find(member=>member.user_id!=user.id))
    }
    const user_chat=(thread)=>{
        return(thread.members.find(member=>member.user_id==user.id))
    }
    useEffect(()=>{
        setMessage_unseen(count_message_unseen)
    },[count_message_unseen])
    useEffect(() =>  {
        if(showchat){
        setListmember(members)
        setShow(showchat)
        setState({...state,loading_more:true,loading:true})
        setThread(threadstate)
        setListmessages(messages.reverse())
        }
    }, [threadstate,members,messages,showchat]);
    useEffect(()=>{
        if(list_threads){
            setThreads(list_threads)
        }
    },[list_threads])
    console.log(show)
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    const handleClick = (event) => {
        const { target } = event
        if(typechatref.current!=null){
            if (!typechatref.current.contains(target)) {
                setShow_type_chat(false)
            }
        }
    }

    useEffect(() => {
        socket.current=io.connect('https://server-socket-123.herokuapp.com')
        socket.current.on('message',data=>{
            console.log(data)
            if(data.typing || data.typing==""){
                if(data.typing==""){
                    setTyping({typing:false})
                }
                else{
                setTyping({typing:true})
                if(thread.id==data.thread_id){
                    setReceiver(data.receiver)
                }
                }
            }
            else{
                const listmessages=[...list_messages,...data.message]
                setTyping({typing:false})
                if(thread.id==data.thread_id){
                    setListmessages(listmessages)
                }
                setTyping({typing:false,send_to:data.send_to})
                const convesations=threads.map(thread=>{
                    if(data.thread_id==thread.id){
                    return({...thread,message_last:data.message[data.message.length-1],members:thread.members.map(member=>{
                        if(member.user_id!=data.send_by){
                            return({...member,count_message_unseen:member.count_message_unseen+data.message.length})
                        }
                        return({...member})
                    })})
                    }
                    return({...thread})
                })
                setThreads(convesations)
                if(scrollRef.current){
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }
            }
        })
        
        return () => {
            socket.current.disconnect();
        };
    },[list_messages,scrollRef,threads]);
    
    const showthread=()=>{
        setShow(true)
        axios.get(listThreadlURL,headers)
        .then(res=>{
            setState({...state,loading:true})
            const threads=res.data.map(item=>{
                return({...item,show_action:false})
            })
            setThreads(threads)
            
        })
    }

    const showmessage=useCallback((e,threadchoice)=>{
        const list_thread=threads.map(thread=>{
            if(thread.id==threadchoice.id){
                return({...thread,members:thread.members.map(member=>{
                    if(member.user_id==user.id){
                        return({...member,count_message_unseen:0})
                    }
                    return({...member})
                })})
            }
            return({...thread})
        })
        setThreads(list_thread)
        setThread(threadchoice)
        setListmember(threadchoice.members)
        
        if(!thread || threadchoice.members.some(member=>member.count_message_unseen>0 && member.user_id==user.id) ||  (threadchoice && threadchoice.id!=thread.id)){
            setState({...state,loading:false})
            axios.get(`${conversationsURL}/${threadchoice.id}?action=showmessage`,headers)
            .then(res=>{
                setState({...state,loading:true})
                const datamesssage=res.data.reverse()
                setListmessages(datamesssage)
                if(scrollRef.current){
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                }
            })
        }
    },[list_messages,listmember,threads,thread,state])

    console.log(list_messages)
    const sendproduct=(e,item)=>{
        (async ()=>{
            try{
                let form=new FormData()
                form.append('item_id',item.id) 
                form.append('action','create-message')
                form.append('send_to',direact.user_id)
                const res=await axios.post(`${conversationsURL}/${thread.id}`,form,headers)
                setShowshop({show_product:false,show_order:false})
                if(!res.data.error){
                    const messages={message:res.data,thread_id:thread.id,send_by:user.id}
                    socket.current.emit("sendData",messages)
                }
                else{
                    alert(res.data.error)
                }
            }
            catch(e){
                console.log(e)
            }
        })() 
    }

    const sendorder=(e,order)=>{
        (async ()=>{
            try{
                let form=new FormData()
                form.append('order_id',order.id) 
                form.append('send_to',direact.user_id)
                form.append('action','create-message')
                const res=await axios.post(`${conversationsURL}/${thread.id}`,form,headers)
                setShowshop({show_product:false,show_order:false})
                if(!res.data.error){
                const messages={message:res.data,thread_id:thread.id,send_by:user.id}
                socket.current.emit("sendData",messages)
                }
                else{
                   
                alert(res.data.error)
                    
                }
            }
            catch(e){
                console.log(e)
            }
        })()
    }

    const settyping=(e)=>{ 
        let value=e.target.value 
        setMessage(e.target.value)
        sentyping(value)
    }

    const sentyping= useCallback(debounce((value)=>{
        let data={
        typing:value,
        thread_id: thread.id,
        send_by:user.id,
        receiver:listmember.filter(member=>user.id!=member.user_id),
        }
        socket.current.emit('sendData',data)
    },1000),[user,listmember])
    
    const senmessage=(e)=>{
        if(listfile.filter(file=>file.filetype=='image').length>0 || message.trim()!=''){ 
            let form=new FormData()
            form.append('action','create-message')
            form.append('send_to',direact.user_id)
            form.append('send_by',user.id)
            if(message.trim()!=''){
                form.append('message',message)
            }
            listfile.filter(file=>file.filetype=='image').map(file=>{
                form.append('image',file.file)
            }) 
            setListfile(listfile.filter(file=>file.filetype!='image')) 
            axios.post(`${conversationsURL}/${thread.id}`,form,headers)
            .then(res=>{ 
                setShowemoji(false)
                setMessage('') 
                if(!res.data.error){
                    const messages={message:res.data,thread_id:thread.id,send_by:user.id}
                    socket.current.emit("sendData",messages)
                }
                else{
                    alert(res.data.error)
                }
                
            })
        } 

        if(listfile.find(file=>file.filetype!=='image')){  
            setTimeout(()=>{
                let formfile=new FormData()
                formfile.append('action','create-message')
                formfile.append('send_by',user.id)
                formfile.append('send_to',direact.user_id)
                listfile.filter(file=>file.filetype!=='image').map((file,i)=>{
                    formfile.append('file',file.file)
                    formfile.append('filetype',file.filetype)
                    formfile.append('file_preview',file.file_preview)
                    formfile.append('duration',file.duration)
                    formfile.append('name',file.file_name)
                })  
                const messagefile=listfile.filter(file=>file.filetype!=='image').map((file,i)=>{
                    return({message:null,filetype:file.filetype,
                    user_id:user.id,date_created:new Date().toString(),
                    list_file:[{media:file.media,file_name:file.file_name,
                    media_preview:file.media_preview,duration:file.duration,filetype:file.filetype}]
                    })
                })  
                setListfile([])
                setMessagefile(messagefile)
                axios.post(`${conversationsURL}/${thread.id}`,formfile,headers)
                .then(res=>{
                    setMessagefile([])
                    if(!res.data.error){
                    const messages={message:res.data,thread_id:thread.id,send_by:user.id}
                    socket.current.emit("sendData",messages)   
                    } 
                    else{
                        alert(res.data.error)
                    }  
                }) 
            },200)
        }
    }
    
    //add message
    const addmessage=(e)=>{
        e.stopPropagation()
        if(state.loading && e.target.scrollTop==0 && list_messages.length<thread.count_message){
            setState({...state,loading:false})
            axios.get(`${conversationsURL}/${thread.id}?offset=${list_messages.length}`,headers)
            .then(res=>{
                setState({...state,loading:true})
                const datamesssage=res.data.reverse()
                e.target.scrollTop = 60
                setListmessages([...datamesssage,...list_messages])
            })
        }
        else{
            setState({...state,loading:true}) 
        }
    }

    //input click
    const onBtnClick=(e)=>{
        console.log(e.currentTarget)
        e.currentTarget.querySelector('input').click()
    }

    const listdate=()=>{
        let list_days_unique=[]
        let list_days=[]
        const list_day=list_messages.map(message=>{
            return(("0" + new Date(message.date_created).getDate()).slice(-2) + "-" + ("0"+(new Date(message.date_created).getMonth()+1)).slice(-2) + "-" +
            new Date(message.date_created).getFullYear())
        })
        for(let j=0;j<list_day.length;j++){
            if(list_days[list_day[j]]) continue;
            list_days[list_day[j]] = true;
            list_days_unique.push(j)
        }
        return list_days_unique
    }
    
    let list_file=[]
    const previewFile=(e)=>{
        [].forEach.call(e.target.files, function(file) {
            if ((/image\/.*/.test(file.type))){
                list_file.push({file:file,file_preview:undefined,duration:0,filetype:'image',
                file_name:file.name,media_preview:(window.URL || window.webkitURL).createObjectURL(file)})
                const list_file_chat=[...listfile,...list_file]
                setListfile(list_file_chat)
            }
            else if(file.type.match('video.*')){ 
                var url = (window.URL || window.webkitURL).createObjectURL(file);
                let video = document.createElement('video');
                video.src = url;
                video.addEventListener('loadeddata', e =>{
                    video.currentTime=1
                });
                video.addEventListener('timeupdate',e=>{
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                let image = canvas.toDataURL("image/png");
                let file_preview = dataURLtoFile(image,'dbc9a-rg53.png');
                list_file.push({file_name:file.name,filetype:'video',file:file,file_preview:file_preview,duration:video.duration,media:url,media_preview:(window.URL || window.webkitURL).createObjectURL(file_preview)})    
                const list_file_chat=[...listfile,...list_file]
                setListfile(list_file_chat)
                });
                video.preload = 'metadata';
                // Load video in Safari / IE11
                video.muted = true;
                }
            })
    }

    const deletefile=(file,i)=>{
        const list_files=listfile.filter(item=>listfile.indexOf(item)!=i)
        setListfile(list_files)
       
    }                

    const chatproduct=()=>{
        setShop({...shop,choice:'item'})
        setShowshop({...showshop,show_product:!showshop.show_product,show_order:false})
        const user_id=direact_user.count_product_shop>0?user.id:direact.user_id
        if(!showshop.show_product && shop.list_items.length==0){
            setShopchoice(user_id)
        }
    }


    useEffect(()=>{
        (async ()=>{
            try{
                if(shopchoice){
                    setLoading(false)
                    const res= await axios.get(`${conversationsURL}/${thread.id}?user_id=${shopchoice}&action=showitem`,headers)
                    setShop({...shop,list_items:res.data.list_items,choice:'item',count_product:res.data.count_product})
                    setLoading(true)
                }
            }
            catch(e){
                console.log(e)
            }
        })()
    },[shopchoice])
   
    const chatorder=()=>{
        setShop({...shop,choice:'order'})
        setShowshop({...showshop,show_order:!showshop.show_order,show_product:false})
        if(!showshop.show_order && shop.list_orders.length==0){
            setLoading(false)
            axios.get(`${conversationsURL}/${thread.id}?user_id=${direact.user_id}&action=showorder`,headers)
            .then(res=>{
                setLoading(true)
                setShop({...shop,user_id:direact.user_id,list_orders:res.data.list_orders,choice:'order',count_order:res.data.count_order})
            })
        }
    }

    const showmoreitem=useCallback((e,name)=>{
        if(e.target.scrollTop==e.target.scrollHeight-e.target.offsetHeight && state.loading){
            if(name=='item' && shop.count_product>shop.list_items.length){
                setLoading(false)
                axios.get(`${conversationsURL}/${thread.id}?user_id=${shopchoice}&action=showitem&offset=${shop.list_items.length}`,headers)
                .then(res => {
                    const list_items=[...shop.list_items,...res.data.list_items]
                    setShop({...shop,list_items:list_items})
                    setLoading(true)
                })
            }
            if(name=='order' && shop.count_product>shop.list_orders.length){
                setLoading(false)
                axios.get(`${conversationsURL}/${thread.id}?user_id=${shopchoice}&action=showorder&offset=${shop.list_orders.length}`,headers)
                .then(res => {
                    const list_orders=[...shop.list_orders,...res.data.list_orders]
                    setShop({...shop,list_orders:list_orders})
                    setLoading(true)
                })
            }
        }
    },[shop,state])
    
    const setactionconversations=useCallback((e,thread,name,value)=>{
        e.stopPropagation()
        let form=new FormData()
        form.append('action',name)
        axios.post(`${conversationsURL}/${thread.id}`,form,headers)
        .then(res=>{
            const list_convesations=name=='delete'?
                threads.filter(item=>item.id!=thread.id)
                :name=='seen'?threads.map(item=>{
                    if(item.id==thread.id){
                        return({...item,members:item.members.map(member=>{
                            if(member.user_id==user.id){
                                return({...member,count_message_unseen:value?0:1})
                            }
                            return({...member})
                        })})
                    }
                    return({...item})
                })
                
                :threads.map(item=>{
                    if(item.id==thread.id){
                        return({...item,[name]:value}) 
                    }
                    return({...item})
                })
            setThreads(list_convesations) 
        })
    },[threads])

    ///set tychat
    useEffect(()=>{
        (async()=>{
            if(typechat){
                const res =await axios.get(`${listThreadlURL}?type_chat=${typechat}`,headers)
                const threads=res.data.map(thread=>{
                    return({...thread,show_action:false})
                })
                setThreads(threads)
                
                if(!res.data.some(thread=>thread.id==thread.id)){
                    setThread()
                    setListmessages([])
                }
            }
        })()
    },[typechat])
        
     
    

    // show actio
    const setshowaction=(e,thread)=>{
        e.stopPropagation()
        const list_convesations=threads.map(item=>{
            if(thread.id==item.id){
                return({...item,show_action:!item.show_action})
            }
            return({...item,show_action:false})
        })
        setThreads(list_convesations)
    }

    const setshopchoice=useCallback((data)=>{
        setShopchoice(data)
    },[shopchoice])

    const setshop=useCallback((data)=>{
        setShop({...shop,...data})
    },[shop])
    return(
        <>
        <div id="mini-chat-embedded" style={{position: 'fixed', right: '8px', bottom: '0px', zIndex: 99999}}>
        {user!=null?
        !show?
        <div onClick={()=>showthread()} className={`src-pages-index__root--1G_Ox ${message_unseen?'unread':''}`}>
            <div className="src-pages-index__logo-wrapper--IqLfz">
                {message_unseen>0?<div className="src-pages-index__counts--1f4Va">{message_unseen>0?message_unseen:''}</div>:''}
                <i className="_3kEAcT1Mk5 src-pages-index__chat--3rr3d">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="chat-icon"><path d="M18 6.07a1 1 0 01.993.883L19 7.07v10.365a1 1 0 01-1.64.768l-1.6-1.333H6.42a1 1 0 01-.98-.8l-.016-.117-.149-1.783h9.292a1.8 1.8 0 001.776-1.508l.018-.154.494-6.438H18zm-2.78-4.5a1 1 0 011 1l-.003.077-.746 9.7a1 1 0 01-.997.923H4.24l-1.6 1.333a1 1 0 01-.5.222l-.14.01a1 1 0 01-.993-.883L1 13.835V2.57a1 1 0 011-1h13.22zm-4.638 5.082c-.223.222-.53.397-.903.526A4.61 4.61 0 018.2 7.42a4.61 4.61 0 01-1.48-.242c-.372-.129-.68-.304-.902-.526a.45.45 0 00-.636.636c.329.33.753.571 1.246.74A5.448 5.448 0 008.2 8.32c.51 0 1.126-.068 1.772-.291.493-.17.917-.412 1.246-.74a.45.45 0 00-.636-.637z"></path></svg>
                </i>
                <i className="_3kEAcT1Mk5 src-pages-index__logo--2m8Mr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 22" className="chat-icon"><path d="M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z"></path></svg>
                </i>
            </div>
        </div>:
        
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-message-new">
                    <i className="_3kEAcT1Mk5 chat-header-logo icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 22" className="chat-icon"><path d="M9.286 6.001c1.161 0 2.276.365 3.164 1.033.092.064.137.107.252.194.09.085.158.064.203 0 .046-.043.182-.194.251-.26.182-.17.433-.43.752-.752a.445.445 0 00.159-.323c0-.172-.092-.3-.227-.365A7.517 7.517 0 009.286 4C5.278 4 2 7.077 2 10.885s3.256 6.885 7.286 6.885a7.49 7.49 0 004.508-1.484l.022-.043a.411.411 0 00.046-.71v-.022a25.083 25.083 0 00-.957-.946.156.156 0 00-.227 0c-.933.796-2.117 1.205-3.392 1.205-2.846 0-5.169-2.196-5.169-4.885C4.117 8.195 6.417 6 9.286 6zm32.27 9.998h-.736c-.69 0-1.247-.54-1.247-1.209v-3.715h1.96a.44.44 0 00.445-.433V9.347h-2.45V7.035c-.021-.043-.066-.065-.111-.043l-1.603.583a.423.423 0 00-.29.41v1.362h-1.781v1.295c0 .238.2.433.445.433h1.337v4.19c0 1.382 1.158 2.505 2.583 2.505H42v-1.339a.44.44 0 00-.445-.432zm-21.901-6.62c-.739 0-1.41.172-2.013.496V4.43a.44.44 0 00-.446-.43h-1.788v13.77h2.234v-4.303c0-1.076.895-1.936 2.013-1.936 1.117 0 2.01.86 2.01 1.936v4.239h2.234v-4.561l-.021-.043c-.202-2.088-2.012-3.723-4.223-3.723zm10.054 6.785c-1.475 0-2.681-1.12-2.681-2.525 0-1.383 1.206-2.524 2.681-2.524 1.476 0 2.682 1.12 2.682 2.524 0 1.405-1.206 2.525-2.682 2.525zm2.884-6.224v.603a4.786 4.786 0 00-2.985-1.035c-2.533 0-4.591 1.897-4.591 4.246 0 2.35 2.058 4.246 4.59 4.246 1.131 0 2.194-.388 2.986-1.035v.604c0 .237.203.431.453.431h1.356V9.508h-1.356c-.25 0-.453.173-.453.432z"></path></svg>
                    </i>
                    {message_unseen>0?
                    <div className="chat-count-new-message">
                        <i className="_3kEAcT1Mk5 icon chat-close">
                            <svg viewBox="0 0 3 12" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M2.788 12L3 11.383c-.514-.443-.959-1.113-1.335-2.013-.376-.9-.564-2.01-.564-3.333v-.074c0-1.323.189-2.434.567-3.333.378-.9.822-1.553 1.332-1.961L2.788.006 2.754 0C2.102.354 1.48 1.063.888 2.127.296 3.19 0 4.473 0 5.974v.052c0 1.505.296 2.789.888 3.85.592 1.062 1.214 1.77 1.866 2.124h.034z"></path></svg>
                        </i>{message_unseen>0?message_unseen:''}
                        <i className="_3kEAcT1Mk5 icon chat-close">
                            <svg viewBox="0 0 3 12" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M.246 12c.648-.354 1.269-1.062 1.863-2.124C2.703 8.815 3 7.531 3 6.026v-.052c0-1.501-.297-2.784-.891-3.847C1.515 1.063.894.354.246 0H.212L0 .617c.48.42.917 1.09 1.31 2.01.393.92.59 2.032.59 3.336v.074c0 1.33-.191 2.454-.573 3.37-.382.917-.824 1.575-1.327 1.976L.212 12h.034z"></path></svg>
                        </i>
                    </div>:""}
                </div>
                <div className="operator-wrapper">
                    <div className="operator-item-wrapper">
                        <i className="_3kEAcT1Mk5 chat-hide-dialog icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="chat-icon"><path d="M14 1a1 1 0 011 1v12a1 1 0 01-1 1H9v-1h5V2H9V1h5zM2 13v1h1v1H2a1 1 0 01-.993-.883L1 14v-1h1zm6 1v1H4v-1h4zM2 3.999V12H1V3.999h1zm5.854 1.319l2.828 2.828a.5.5 0 010 .708l-2.828 2.828a.5.5 0 11-.708-.707L9.121 9H4.5a.5.5 0 010-1h4.621L7.146 6.025a.5.5 0 11.708-.707zM3 1v1H2v.999H1V2a1 1 0 01.883-.993L2 1h1zm5 0v1H4V1h4z"></path></svg>
                        </i>
                    </div>
                    <div className="operator-item-wrapper">
                        <i onClick={()=>{setShow(false)}} className="_3kEAcT1Mk5 chat-hide-dialog icon">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M14 1a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1h12zm0 1H2v12h12V2zm-2.904 5.268l-2.828 2.828a.5.5 0 01-.707 0L4.732 7.268a.5.5 0 11.707-.707l2.475 2.475L10.39 6.56a.5.5 0 11.707.707z"></path></svg>
                        </i>
                    </div>
                </div>
            </div>
            <div className="chat-body">
                {thread?
                <div className="chat-window-detail">
                    <div className="chat-shop-info item-center"> 
                        <div className="chat-shop-name">{direact.username}</div>
                        <i className="icon-dropdown icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="chat-icon"><path d="M6.243 6.182L9.425 3l1.06 1.06-4.242 4.243L2 4.061 3.06 3z"></path></svg>
                        </i>
                    </div>
                    <div className="chat-message-detail">
                        <div className="chat-message-detail-wrap" id="messagesContainer">
                            {listfile.length>0?
                            <div className="chat-mediapreview-wrap">
                                <section className="chat-mediapreview-section">
                                    <div className="chat-mediapreview-section-content">
                                        <div className="chat-mediapreview-section-files">   
                                            {listfile.map((file,i)=>{
                                                if(file.filetype=="image" || file.filetype=="video"){
                                                    return(
                                                        <div className="vbUibIOQCdVGpvTHR9QZ5" key={i}>
                                                            <img className="_3KQNXANNUSJKR1Z2adRPjF" src={file.media_preview} />
                                                            {file.filetype=="video"?
                                                            <i className="_3kEAcT1Mk5 _3Fs5Tyt_FBVBTwz60zkqsd">
                                                                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17" cy="17" r="16.3333" fill="black" fill-opacity="0.5" stroke="white" strokeWidth="0.666667"></circle><path fillRule="evenodd" clip-rule="evenodd" d="M23.0444 16.2005C23.5778 16.6005 23.5778 17.4005 23.0444 17.8005L15.0444 23.8005C14.3852 24.2949 13.4444 23.8245 13.4444 23.0005L13.4444 11.0005C13.4444 10.1764 14.3852 9.70606 15.0444 10.2005L23.0444 16.2005Z" fill="white"></path></svg>
                                                            </i>:''}
                                                            <i onClick={()=>deletefile(file,i)} className="icon-chat-message-delete">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#8EA4D1"></circle><path fillRule="evenodd" clip-rule="evenodd" d="M8 9.26316L10.7368 12L12 10.7368L9.26316 8L12 5.26316L10.7368 4L8 6.73684L5.26316 4L4 5.26316L6.73684 8L4 10.7368L5.26316 12L8 9.26316Z" fill="white"></path></svg>
                                                            </i>
                                                        </div>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <div className="item-center m7zwrmfr vbUibIOQCdVGpvTHR9QZ5 taijpn5t" key={i}>
                                                            <i onClick={()=>deletefile(file,i)} className="icon-chat-message-delete">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#8EA4D1"></circle><path fillRule="evenodd" clip-rule="evenodd" d="M8 9.26316L10.7368 12L12 10.7368L9.26316 8L12 5.26316L10.7368 4L8 6.73684L5.26316 4L4 5.26316L6.73684 8L4 10.7368L5.26316 12L8 9.26316Z" fill="white"></path></svg>
                                                            </i>
                                                            <div className="s45kfl79 emlxlaya item-center">
                                                                <i className="icon ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="45.057px" height="45.057px" viewBox="0 0 45.057 45.057" style={{enableBackground:'new 0 0 45.057 45.057'}} xmlSpace="preserve">
                                                                        <g id="_x35_1_80_">
                                                                            <path d="M13.323,13.381c6.418,0,12.834,0,19.252,0c1.613,0,1.613-2.5,0-2.5c-6.418,0-12.834,0-19.252,0     C11.711,10.881,11.711,13.381,13.323,13.381z"/>
                                                                            <path d="M32.577,16.798c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,19.298,34.188,16.798,32.577,16.798z"/>
                                                                            <path d="M32.577,22.281c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,24.781,34.188,22.281,32.577,22.281z"/>
                                                                            <path d="M32.577,28.197c-6.418,0-12.835,0-19.253,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.835,0,19.253,0     C34.188,30.697,34.188,28.197,32.577,28.197z"/>
                                                                            <path d="M32.204,33.781c-6.418,0-12.834,0-19.252,0c-1.612,0-1.612,2.5,0,2.5c6.418,0,12.834,0,19.252,0     C33.817,36.281,33.817,33.781,32.204,33.781z"/>
                                                                            <path d="M33.431,0H5.179v45.057h34.699V6.251L33.431,0z M36.878,42.056H8.179V3h23.707v4.76h4.992V42.056z"/>
                                                                        </g>
                                                                    </svg>
                                                                </i>
                                                            </div>
                                                            <div className="buofh1pr oo9gr5id item-center">
                                                                <span className="mau55g9w c8b282yb d3f4x2em iv3no6db">
                                                                    <span className="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7" style={{webkitBoxOrient: 'vertical', webkitLineClamp: 2, display: '-webkit-box'}}>{file.file_name}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                            <div onClick={(e)=>onBtnClick(e)} className="">
                                                <div>
                                                    <input onChange={(e)=>previewFile(e)} accept="video/*,.flv,.3gp,.rm,.rmvb,.asf,.mp4,.webm,image/png,image/jpeg,image/jpg" multiple="" type="file" style={{display: 'none'}}/>
                                                    <div className="add-file">
                                                        <i className="icon icon-add-file">
                                                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="14.5" width="31" height="3" fill="#8EA4D1" stroke="#8EA4D1"></rect><rect x="17.5" y="0.5" width="31" height="3" transform="rotate(90 17.5 0.5)" fill="#8EA4D1" stroke="#8EA4D1"></rect></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-message-action">
                                        <i className="icon-message">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="chat-icon"><path d="M-1595 1c-282.8 0-512 229.2-512 512s229.2 512 512 512 512-229.2 512-512S-1312.2 1-1595 1zm313.3 380.4l-362 362c-16.7 16.7-43.7 16.7-60.3 0l-201.1-201.1c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l171 171 331.8-331.9c16.7-16.7 43.7-16.7 60.3 0 16.7 16.6 16.7 43.7 0 60.3zM-117.3 42.7h-853.3c-23.6 0-42.7 19.1-42.7 42.7v853.3c0 23.6 19.1 42.7 42.7 42.7h853.3c23.6 0 42.7-19.1 42.7-42.7V85.3c-.1-23.5-19.2-42.6-42.7-42.6zm-115.4 340.7l-362 362c-16.7 16.7-43.7 16.7-60.3 0l-201.1-201.1c-16.7-16.7-16.7-43.7 0-60.3 16.7-16.7 43.7-16.7 60.3 0l171 171L-293 323.1c16.7-16.7 43.7-16.7 60.3 0 16.7 16.6 16.7 43.7 0 60.3zM601.9 512.1l402.3-401.5c25.1-25 25.1-65.7.1-90.8-25-25.1-65.7-25.1-90.8-.1L511.1 421.4 108.6 19.7c-25.1-25-65.7-25-90.8.1-25 25.1-25 65.7.1 90.8l402.3 401.5L17.9 913.6c-25.1 25-25.1 65.7-.1 90.8s65.7 25.1 90.8.1l402.5-401.7 402.5 401.7c25.1 25 65.7 25 90.8-.1s25-65.7-.1-90.8L601.9 512.1z"></path></svg>
                                        </i>
                                    </div>
                                </section>
                            </div>:''}
                            <div ref={scrollRef} onScroll={(e)=>addmessage(e)} className="chat-message-container" style={{overflowX: 'hidden',boxSizing: 'border-box',direction: 'ltr',height: `${242-parseInt(message.length/length)*20}px`,position: 'relative',padding: '0 7.5px',width: '283px',willChange: 'transform',overflowY: 'auto'}}> 
                                {state.loading?'':<div className="item-centers">
                                    <div className="loader"></div>
                                </div>}
                                {list_messages.map((message,i)=>
                                <div key={i}>
                                    {listdate().includes(i)?
                                        <div className="chat-message-time">{checkDay(new Date(message.date_created))=="Today"?`${("0" + new Date(message.date_created).getHours()).slice(-2)}:${("0" + new Date(message.date_created).getMinutes()).slice(-2)}`:checkDay(new Date(message.date_created))=="Yesterday"?`Yesterday, ${("0" + new Date(message.date_created).getHours()).slice(-2)}:${("0" + new Date(message.date_created).getMinutes()).slice(-2)}`:`${("0" + new Date(message.date_created).getDate()).slice(-2)} Th${("0"+(new Date(message.date_created).getMonth()+1)).slice(-2)} ${new Date(message.date_created).getFullYear()}, ${("0" + new Date(message.date_created).getHours()).slice(-2)}:${("0" + new Date(message.date_created).getMinutes()).slice(-2)}`}</div>
                                    :''}
                                    <div className={`chat-message-table ${message.user_id==user.id?'chat-message-sender':'chat-message-receiver'}`}>
                                        <div className="chat-message">
                                        {message.message_type=='1'?
                                        <pre className="message-send message-text">{message.message}</pre>
                                        :
                                        message.message_type=='2'?
                                        <div className="chat-message-images">
                                            {message.list_file.map(file=>                                                                                              
                                                <div key={file.file_name} style={{width:`${message.list_file.length==1?'200px':''}`}} className={`chat-file ${message.list_file.length>2?'kuivcneq':message.list_file.length==2?'hkbzh7o3':''}`}>
                                                    <Link to={`/message_media?thread_id=${thread.id}&message_id=${message.id}&id=${file.id}`}>
                                                        <div className="chat-message-image">
                                                            <div className="image">
                                                                <img className="chat-image" src={file.file} alt="" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>                                                                                                                                                           
                                            )}
                                        </div>
                                        :message.message_type=='3'?
                                        <>
                                            {message.list_file.map(file=>
                                            <Link to={`/message_media?thread_id=${thread.id}&message_id=${message.id}&id=${file.id}`}>
                                                <div className='chat-message-file' key={file.file_name}>
                                                    <div className="chat-messsage-file-preview">
                                                        <img className="chat-image-preview" src={file.media_preview?file.media_preview:file.file_preview} alt=""/>
                                                        <div className="chat-message-image-preview-wrap">
                                                            <div className="chat-message-image-preview-pause">
                                                                <div className="chat-message-image-preview-icon">
                                                                    <svg viewBox="0 0 25 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M0 2.79798C0 1.18996 1.8014 0.239405 3.12882 1.14699L23.9004 15.3489C25.062 16.1431 25.062 17.8567 23.9004 18.6509L3.12882 32.8529C1.8014 33.7605 0 32.8099 0 31.2019V2.79798Z" fill="white"></path></svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="chat-message-video-duration">00:{Math.round(file.duration)}</div>
                                                    </div>
                                                </div> 
                                            </Link>)}
                                        </>
                                        :message.message_type=='5'?
                                        <div className="onDrqkSpt9r3zn_6p3pRf _18r49d6bjodvFmJMZ-4Ew5">
                                            <div className="KIDOiX8kg8qYOZk2r28XZ">
                                                <div className="_2rOpog8D_jhF1evUqNokLy">ĐƠN HÀNG</div>
                                                <div className="_2CAkb_LMf57hsgDBtSNYew">
                                                    <div className="_2obfFH3oH2jVsvdvjYZoPK">
                                                        <img alt="" src={message.message_order.item_image}/>
                                                        <div></div>
                                                    </div>
                                                    <div className="_2E0sI6wm9acOLm_2ioVqAs">
                                                        <div className="_1Gsk8KcmxOiyCa572sYIgY">
                                                            <div className={`_4Rre943DmKbgF7ChJZzS ${message.message_order.canceled?'_5cjqTTn1-EwQpqCWOJUC2':message.message_order.received?'_2_8fZmU8_RrKDY8dWgF5_q':'_1g431B6tnDb9O6uIPAz3Yv'}`}></div>
                                                            <div className="_3t_t657LT1vpua8FTRvt6a">{message.message_order.canceled?'Đã hủy':message.message_order.received?'Hoàn tất':message.message_order.received?'Đang vận chuyển':'Chờ xác nhận'}</div>
                                                        </div>
                                                        <div className="_1YkKqqrhlAZhrxNylsozUT">{message.message_order.total_quantity} Sản phẩm</div>
                                                    </div>
                                                </div>
                                                <div className="_3RhC3E-K1SW0dO9GXnXAdD">
                                                    <div className="_1J50foL86TucYAx5ydsfRg">
                                                        <div className="_1_YEoXvsxaosJh4Z-TcdSL">Tổng Giá Trị Thanh Toán từ Người Mua:</div>
                                                        <div className="_3m3ryYq5AE6bex0iq6qTCI">₫-{message.message_order.amount}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>: 
                                        <div className="xaMUYIRSRlS1WYaJbpOwG DAgS9n3scQ7kWR3b9O-Va _2IM8caVK5bv3GniwHQxIv4 _1-jFwlhhdMvfDXAJH72LUv">
                                            <div class="x9sshLfmzEnXDsbF57Qmx _2j0RH_nXNLwh2Q73wyiUu7">
                                                <div class="_3-nmomaD6LPerIxLhiPYxJ _3PPerJ_xDR4sC-MObqPua0">SẢN PHẨM</div>
                                                <div class="_34yQfy01N86VpubvG6CS4a _2koJrpCamdLkmdKUGhwdKU">
                                                    <div class="_2PjYtS6WFYVM7M2Q5IAr5U">
                                                        <div class="_3-NQ41O_LLyQ367SS_0dcY UMm4MDR5mkB_ctVxJocZq">
                                                            <img alt="" src={message.message_product.image}/>
                                                            <div class="xrgygwVVBiOr5X2mHjO92 _3I8LHfvixxTAYbK5RR8_SI"></div>
                                                        </div>
                                                        <div class="MK4RAJcIfHxp1tEXQDzts ITzmll2K9ovLC9mx6zS62 _3T4Jgbn-JoFBpuheVCmlnh _1IsSL6qNYQwomYLW5H4pW1">
                                                            <div class="_1zCv57JLI668_Ek5DSiDDH _3qYzFdZiOTp_Rfs0EvFcUZ undefined" title={`${message.message_product.name}`}>{message.message_product.name}</div>
                                                            <div class="GIqgeOS-QZ5DGb-i8L8qg item-center _3cL3bjO1xbF4C-mj5bENVs iVpMx9O-viRKqBFvDuEO_ undefined _3OFGwHwOoNti2VXQOaGl2m">
                                                                {message.message_product.min_price==message.message_product.max_price?
                                                                <span class="_1BDeEH9Fg1p0_-0lSNOrc0">₫{formatter.format(message.message_product.min_price*(1-message.message_product.percent_discount/100))}</span>:
                                                                <div class="_3F2ZINemDNbvVrHyEorcG5"><span>₫{formatter.format(message.message_product.min_price*(1-message.message_product.percent_discount/100))}</span> - <span> ₫{formatter.format(message.message_product.max_price*(1-message.message_product.percent_discount/100))}</span></div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                        </div>
             
                                    </div> 
                                </div>
                                )}
                                {typing.typing && receiver.some(item=>item.id==user.id)?
                                <div className="chat-message-table chat-message-receiver" style={{marginTop: '8px'}}>
                                    <div className="chat-message">
                                        <div className="chat-typing">
                                            typing
                                            <div className="typing">
                                                <div className="dot"></div>
                                                <div className="dot"></div>
                                                <div className="dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                        
                        <div className="chat-input">
                            <div className="chat-input-field-index">
                                <div className="chat-inputfield-chateditor-index__root">
                                    <textarea onChange={(e)=>settyping(e)} 
                                    value={message}
                                    className="chat-inputfield-chateditor-index__editor" 
                                    placeholder="Gửi tin nhắn" style={{overflow: 'hidden',height:`${26+parseInt(message.length/length)*20}px`}}></textarea>
                                    <div onClick={(e)=>senmessage(e)} className="chat-send-button">
                                        <div className="chat-send-tooltip">
                                            <i className="icon chat-index__button">
                                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M4 14.497v3.724L18.409 12 4 5.779v3.718l10 2.5-10 2.5zM2.698 3.038l18.63 8.044a1 1 0 010 1.836l-18.63 8.044a.5.5 0 01-.698-.46V3.498a.5.5 0 01.698-.459z"></path></svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-index__toolbar">
                                    <div className="chat-inputfield-toolbar">
                                        <div className="chat-inputfield-toolbar__left">
                                            <div onClick={()=>setShowemoji(!showemoji)} className="chat-inputfield-toolbar-index__drawer" aria-label="Sticker">
                                                <div className="">
                                                    <div className="">
                                                        <i className="icon chat-inputfield-toolbar-index__stickers chat-inputfield-toolbar__label chat-inputfield-toolbar__inactive-label">
                                                            <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M9 1a8 8 0 110 16A8 8 0 019 1zm0 1.6a6.4 6.4 0 100 12.8A6.4 6.4 0 009 2.6zM5 9.8h8a4 4 0 01-7.995.2L5 9.8h8-8zm1.2-4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm5.6 0a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={(e)=>onBtnClick(e)} className="chat-inputfield-toolbar-index__drawer" aria-label="Picture">
                                                <div>
                                                    <input onChange={(e)=>previewFile(e)} accept="image/png,image/jpeg,image/jpg" multiple={true} type="file" style={{display: 'none'}}/>
                                                    <div className="">
                                                        <i className="icon chat-inputfield-toolbar-index__stickers chat-inputfield-toolbar__label chat-inputfield-toolbar__inactive-label">
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M19 18.974V5H5v14h.005l4.775-5.594a.5.5 0 01.656-.093L19 18.974zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={(e)=>onBtnClick(e)} className="chat-inputfield-toolbar-index__drawer" aria-label="Video">
                                                <div>
                                                    <input onChange={(e)=>previewFile(e)} accept="video/*,.flv,.3gp,.rm,.rmvb,.asf,.mp4,.webm" multiple={true} type="file" style={{display: 'none'}}/>
                                                    <div className="">
                                                        <i className="icon chat-inputfield-toolbar-index__video chat-inputfield-toolbar__label chat-inputfield-toolbar__inactive-label">
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path fillRule="evenodd" clip-rule="evenodd" d="M19.974 3h-16a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zm-15 16V5h14v14h-14z"></path><path d="M15.42 11.733a.3.3 0 010 .534L9.627 15.24a.3.3 0 01-.437-.267V9.027a.3.3 0 01.437-.267l5.793 2.973z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div onClick={()=>chatproduct()} className="chat-inputfield-toolbar-index__drawer" aria-label="Porducts">
                                                <div className="">
                                                    <div className="">
                                                        <i className="icon chat-inputField-toolbar-index__products chat-inputfield-toolbar__label chat-inputfield-toolbar__inactive-label">
                                                            <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M14.442 2c.413 0 .753.322.776.735l.692 12.444a.778.778 0 01-.734.82l-.043.001H2.777a.778.778 0 01-.772-.687L2 15.2l.692-12.466A.778.778 0 013.47 2h10.973zm-.736 1.556H4.204L3.734 12h10.441l-.469-8.444zm-1.64 1.556v1.042l-.004.149C11.978 7.825 10.601 9 8.955 9c-1.698 0-3.11-1.252-3.11-2.846V5.12H7.4v1.034l.005.103c.063.646.716 1.187 1.55 1.187.879 0 1.556-.6 1.556-1.29V5.111h1.555z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onClick={()=>chatorder()} className="chat-inputfield-toolbar-index__drawer" aria-label="Orrders">
                                                <div className="">
                                                    <div className="">
                                                        <i className="icon chat-inputField-toolbar-index__orders chat-inputfield-toolbar__label chat-inputfield-toolbar__inactive-label">
                                                            <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><path d="M5.111 2.003v1.365h7.778V2.003h2.333c.43 0 .778.354.778.79v8.44a2 2 0 01-.575 1.404l-2.726 2.767a2 2 0 01-1.425.596H2.778A.784.784 0 012 15.21V2.794c0-.436.348-.79.778-.79H5.11zm9.333 2.944H3.556v9.474H11V11.5a.5.5 0 01.5-.5h2.944V4.947zM12.89 8.105v1.58H5.11v-1.58h7.778zM11.61 1a.5.5 0 01.5.5v1.079H5.89V1.5a.5.5 0 01.5-.5h5.222z"></path></svg>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="chatwindow-index__blank--2pLm1">
                    <div className="chatwindow-index__plate--2ADRp">
                        <img src="https://res.cloudinary.com/dupep1afe/image/upload/v1651031948/file/profile/6abdc0872a25853b36d17e7498335326_ukumfd.png" className="chatwindow-index__image--3GQ-r"/>
                    </div>
                    <div className="chatwindow-index__title--200qt">Xin Chào!</div>
                </div>}
                <div className="chat-conversationlists-index">
                    <div className="chat-conversationlists-headerbar-index">
                        <div className="chat-conversationlists-headerbar-index-index__search">
                            <input onChange={e=>setState({...state,user_search:e.target.value})} className="chat-conversationlists-headerbar-index-index__input" placeholder="Tìm theo tên khách hàng" value={state.user_search}/>
                            <div className="chat-conversationlists-headerbar-index-index__wrapper">
                                <i className="icon chat-conversationlists-headerbar-index-index__icon">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="chat-icon"><g transform="translate(3 3)"><path d="M393.846 708.923c174.012 0 315.077-141.065 315.077-315.077S567.858 78.77 393.846 78.77 78.77 219.834 78.77 393.846s141.065 315.077 315.077 315.077zm0 78.77C176.331 787.692 0 611.36 0 393.845S176.33 0 393.846 0c217.515 0 393.846 176.33 393.846 393.846 0 217.515-176.33 393.846-393.846 393.846z"></path><rect transform="rotate(135 825.098 825.098)" x="785.713" y="588.79" width="78.769" height="472.615" rx="1"></rect></g></svg>
                                </i>
                            </div>
                        </div>
                        <div className="chat-conversationlists-headerbar-index-index__filter chat-conversationlists-headerbar-index-index__reddot-filter--1McFP">
                            <div className="chat-conversationlists-headerbar-index-index__reddot"></div>
                            <div ref={typechatref} className="chat-components-common-menus-index__root">
                                <div onClick={e=>setShow_type_chat(!show_type_chat)} className="chat-components-common-menus-index__popover">
                                    <div className="chat-components-common-menus-index__button">
                                        <div className="chat-conversationlists-headerbar-index-index__selected">{typechat?list_type_chat.find(item=>item.value==typechat).name:'Tất cả'}
                                            <i className="icon chat-conversationlists-headerbar-index-index__arrow-down">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="chat-icon"><path d="M6.243 6.182L9.425 3l1.06 1.06-4.242 4.243L2 4.061 3.06 3z"></path></svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                {show_type_chat?
                                <div className="drop-chat">
                                    <div className="list-type-chat">
                                        {list_type_chat.map(item=>
                                        <div onClick={(e)=>{setTypechat(item.value)
                                            setShow_type_chat(false)
                                        }} className="type-chat">{item.name}</div>
                                        )}
                                    </div>
                                </div>:''}
                            </div>
                        </div>
                    </div>
                    <div className="chat-conversation-lists-container chat-index__conversation-lists">
                        {threads.length==0 || (state.user_search!=null && state.user_search.trim()!='' && !threads.some(thread=>direact.username.toUpperCase().indexOf(state.user_search.toUpperCase())>-1))?
                        <div className="_3YurerlznH src-pages-conversationLists-index__empty--2z4Bf">
                            <img src="https://res.cloudinary.com/dupep1afe/image/upload/v1651031916/file/profile/143e062750363ec2d5f8d5601a9b595a_lfxpez.png" className="_1jxtCX6jiG"/>
                            <div className="_3l9IBXMpxr">Không tìm thấy cuộc hội thoại nào.</div>
                        </div>:
                        <div className="chat-message-container" style={{height: '100%',boxSizing: 'border-box',direction: 'ltr',position: 'relative',width: '222px',willChange: 'transform',overflow: 'auto'}}>
                            <div className="chat-message-container">
                                {threads.map((thread,i)=>{
                                    if(state.user_search==null ||state.user_search=='' || (state.user_search!='' && direact_chat(thread).name.toUpperCase().indexOf(state.user_search.toUpperCase())>-1)){
                                        return(
                                            <Threadinfo
                                                user={user}
                                                i={i}
                                                thread={thread}
                                                setactionconversations={(e,thread,name,value)=>setactionconversations(e,thread,name,value)}
                                                showmessage={(e,thread)=>showmessage(e,thread)}
                                            />
                                        )
                                    }}
                                )}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        :''} 
        </div>
        <Shopmember
            sendproduct={(e,item)=>sendproduct(e,item)}
            sendorder={(e,order)=>sendorder(e,order)}
            shop={shop}
            showdata={showshop}
            setshop={data=>setshop(data)}
            thread={thread}
            listmember={listmember}
            loadingdata={loading}
            setloading={data=>setLoading(data)}
            setshowshop={()=>setShowshop({show_order:false,show_product:false})}
            user={user}
            shopchoice={shopchoice}
            setshopchoice={data=>setshopchoice(data)}
            showmoreitem={(e,name)=>showmoreitem(e,name)}
        />
            <div data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" class="_2QLhFk_X2O _1BzVU7fHvH" style={{position: 'absolute', inset: '0px auto auto 0px', transform: `translate(215px, 383px)`}}>
                <div class="_15v99gbQSv">
                    <div class="_3zpMyJKkl2WoOerymVZPuR">
                        <div class="_32eIwz3LtMqgfk1YqB6IIN _18E_V1N5iaI_S92DHx8vqU">
                            <div class="_3gUqnenePUrxbbMEeh9i4M">
                                <div class="_2xGjvAuHdCo364lNgvhQYC undefined">
                                    <div class="_29uoglXEwg_2RaVW0_CFBG">
                                        <img alt="" src="https://cf.shopee.vn/file/abaee1d1cfd28d21dd4c67a2c7c0c218_tn"/>
                                        <div class="_2Wkz3CDhCMDEZwE7G91OSy">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="_1quVkM8A5NvTpdli3Wc-rj">
                                <div title="ccutun" class="_1h02b9izN7ZJFXg60EFE8- _3hKrXgKJrf8GP0HSHSC9JA">ccutun</div>
                            </div>
                        </div>
                        <div class="_39MlxwpZU6">
                            <div class="_1DylYknmeT"></div>
                            <div onClick={e=>navigate('/shop')} class="_3cyrFIvvEl _2Tt8-1KAq6cSZW7Eu5Q-Lz">
                                <div>Xem thông tin cá nhân</div>
                            </div>
                            <div class="_1DylYknmeT"></div>
                            <div onClick={(e)=>setactionconversations(e)} class="_3cyrFIvvEl _2Tt8-1KAq6cSZW7Eu5Q-Lz">
                                <div>Chặn người dùng</div>
                            </div>
                            <div class="_1DylYknmeT"></div>
                            <div onClick={(e)=>setactionconversations(e)} class="_3cyrFIvvEl _2Tt8-1KAq6cSZW7Eu5Q-Lz">
                                <div>Báo cáo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,user:state.user,count_message_unseen:state.count_message_unseen,
    showchat:state.showchat,list_threads:state.threads,
    messages:state.messages,threadstate:state.thread,members:state.members
});
export default connect(mapStateToProps)(Message);
