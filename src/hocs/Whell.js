import axios from 'axios'
import React, {useState,useEffect,useCallback,memo,useMemo} from 'react'
import { headers } from '../actions/auth'
import { newAwardshopURL,detailAwardshopURL } from '../urls'
import {TaoSoNgauNhien,formatter} from "../constants"
import { useParams,Link } from "react-router-dom";
const listitem=[
    {name:'GIẢM 50K',award:true,to:29,},
    {name:'GIẢM 100K',award:false,from:270,to:329},
    {name:'GIẢM 5%',award:true,from:210,to:269},
    {name:'1 THẺ CÀO 50K',award:true,from:150,to:209},
    {name:'CHÚC BẠN MAY MẮN LẦN SAU',award:true,from:90,to:149},
    {name:'GIẢM 10K',award:true,from:30,to:89},
]
const Whell=()=>{
    const [rotate,setRotate]=useState(30)
    const [time,setTime]=useState(0)
    const [position,setPosition]=useState()
    const [show,setShow]=useState(false)
    const {id}=useParams()
     const [listaward,setListaward]=useState([])
    const [loading,setLoading]=useState(false)
    

    useEffect(() => {
        const getJournal = async () => {
            await axios(`${detailAwardshopURL}/${id}`,headers())
            .then(res=>{
                let data=res.data
                setLoading(true)
                const list_awards=data.list_awards.map((item,i)=>{
                    return({...item,award:true,from:i==0?null:i==1?90:i==2?150:i==3?210:270
                    ,to:i==0?29:i==1?89:i==2?149:i==3?209:269,name:`Giam ${item.discount_type=='1'?`${item.percent}`:`đ${formatter.format(item.amount)}`}`})
                })

                setListaward([...list_awards,{name:'CHÚC BẠN MAY MẮN LẦN SAU',award:true,from:270,to:329}])
          })
        }
        getJournal();
    }, [id])
    const itemchoice=loading?listaward.find(item=>position>=item.from && position<=item.to)?listaward.find(item=>position>=item.from && position<=item.to):listaward[0]:null
    
    const setwhell=()=>{
        setTime(5)
        let value=rotate
        const x = 800; //min value
        const y = 4000; //max value

        let random = TaoSoNgauNhien(720,1000)
        value+=random
        
        setRotate(current=>current+random)
        setTimeout(() => {
            setPosition(value % 360);
            setTime(0)
            setShow(true)
        }, 5000);
    }
    useEffect(()=>{
        (async()=>{
            try{
                const data=itemchoice
                if(position && time==0){
                   const res=await axios.post(newAwardshopURL,JSON.stringify(data),headers())
                }
            }
            catch(e){
                console.log(e)
            }
        })()
        
    },[position,time])
    return (
        <div>
        <div className="item-center">
            <div className="rule">
                        
                {listitem.map((item,index)=>
                <div key={index} className="rule__content">
                    <div className={`rule__color color-${index+1}`}>
                    </div>
                    <div className="rule__text">
                        {item.name}
                    </div>
                </div>)}
            </div>
            <div className="wheel">
            <div className="wheeldotsround">
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                            <div className={`wheeldots ${time==5?'active-dots':''}`}>
                            </div>
                        </div>
                <div className="wheel__inner" style={{transform: `rotate(${rotate}deg)`}}>
                
                    {listaward.map((item,i)=>
                    <div key={item.to} className="wheel__sec">
                        {i==5?
                        <i className="icon-bad">
                            <svg  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 122.88" style={{enableBackground:`new 0 0 122.88 122.88`}} xmlSpace="preserve"><g>
                                <path fill='#FBD433' className="st0" d="M45.54,2.11c32.77-8.78,66.45,10.67,75.23,43.43c8.78,32.77-10.67,66.45-43.43,75.23 c-32.77,8.78-66.45-10.67-75.23-43.43C-6.67,44.57,12.77,10.89,45.54,2.11L45.54,2.11z"/>
                                <path fill='#141518' className="st1" d="M45.78,32.27c4.3,0,7.78,5.05,7.78,11.27c0,6.22-3.48,11.27-7.78,11.27c-4.3,0-7.78-5.05-7.78-11.27 C38,37.32,41.48,32.27,45.78,32.27L45.78,32.27z M28.12,94.7c16.69-21.63,51.01-21.16,65.78,0.04l2.41-2.39 c-16.54-28.07-51.56-29.07-70.7-0.15L28.12,94.7L28.12,94.7z M77.1,32.27c4.3,0,7.78,5.05,7.78,11.27c0,6.22-3.48,11.27-7.78,11.27 c-4.3,0-7.78-5.05-7.78-11.27C69.31,37.32,72.8,32.27,77.1,32.27L77.1,32.27z"/></g>
                            </svg>
                        </i>
                    :<span style={{color:'#ffffff'}} >{item.name}</span>}
                    </div>
                    )}
                    
                </div>
                <div className="wheel__arrow">
                    <button onClick={()=>{
                        if(time==0){
                        setwhell()
                        }
                    }} className="wheel__button">QUAY</button>
                </div>
            </div>
            <div className="congratulation" style={{display: `${show?'block':''}`}}>
                <div className="congratulation__container">
                    <div onClick={e=>setShow(false)} className="congratulation__close">
                    <i className="close-btn icon"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path d="M557.3 513l226.3-226.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 467.7 285.7 241.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 513 240.5 739.3c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L512 558.3l226.3 226.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L557.3 513z"></path></svg></i>
                    </div>
                    <div className="congratulation__emotion">
                        <i className="fas fa-smile"></i>
                    </div>
                    <p className="congratulation__note">{itemchoice?itemchoice.name:null}</p>
                </div>
            </div>
        </div>
       
        <div className="Event___StyledDiv-sc-2xszun-0 giheuQ pc" style={{backgroundColor: `rgb(242, 103, 48)`, backgroundImage: `url(https://cf.shopee.vn/file/d27d25139624029a1b42986c51768d14)`, color: `rgb(15, 50, 104)`}}>
            <div className="Event___StyledLuckydraw-sc-2xszun-1 fWOLQT draw-wrapper" style={{marginTop: `210.756px`}}>
                <div className="style__DivOuterContainer-sc-1is5xc9-0 eKqPLM">
                    <div className="Wheel___StyledDiv-sc-1busdjs-0 eSllRk stop">
                        <div className="Wheel___StyledDiv2-sc-1busdjs-1 eOzsHg" style={{transform: `rotate(${rotate}deg)`,transition: `cubic-bezier(0.19, 1, 0.22, 1) 5s`}}>
                            <div className="style__DivWheel-sc-1is5xc9-1 fKFjrd">
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 hhmdQG">
                                </div>
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 iOhrcT">
                                </div>
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 XJVYL">
                                <div className="p-1_2">fuanr</div>
                                </div>
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 gDTFHd">
                                </div>
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 fHQoVh">
                                </div>
                                <div className="style__DivPrizeItem-sc-1is5xc9-2 FmieL">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="style__DivPointer-sc-1is5xc9-3 kEYTju">
                    </div>
                    <div className="style__DivButtonBorder-sc-1is5xc9-4 kInvFH">
                    </div>
                    <button onClick={()=>{
                        if(time==0){
                        setwhell()
                        }
                    }} type="button" className="style__Button-sc-1is5xc9-5 JYLda"></button>
                </div>
            </div>
            <div className="style__DivListContainer-sc-1kiu30y-0 jgCaNO">
                <div className="style__DivListTitleWrapper-sc-1kiu30y-2 eieSEM">
                    <div className="style__DivListTitle-sc-1kiu30y-3 dBwGxJ">Giải thưởng</div>
                </div>
                <div className="style__DivListWrapper-sc-1kiu30y-1 dRjCzA">
                    <div className="style__DivListItemWrapper-sc-1kiu30y-4 guAPKv">
                        <div className="list___StyledDiv-sc-1kye8t0-0 imqnpO">
                            <div className="style__DivListItemIconWrapper-sc-1kiu30y-5 llvLmw">
                                <img src=""/>
                            </div>
                            <div className="style__DivListItemContent-sc-1kiu30y-7 QEHWP">Giảm giá 3% , cho đơn từ ₫20.000</div>
                        </div>
                        <div className="list___StyledDiv-sc-1kye8t0-0 imqnpO">
                            <div className="style__DivListItemIconWrapper-sc-1kiu30y-5 llvLmw">
                                <img src=""/>
                            </div>
                            <div className="style__DivListItemContent-sc-1kiu30y-7 QEHWP">Giảm giá 4% , cho đơn từ ₫20.000</div>
                        </div>
                        <div className="list___StyledDiv-sc-1kye8t0-0 imqnpO">
                            <div className="style__DivListItemIconWrapper-sc-1kiu30y-5 llvLmw">
                                <img src=""/>
                            </div>
                            <div className="style__DivListItemContent-sc-1kiu30y-7 QEHWP">Giảm giá 3% , cho đơn từ ₫15.000</div>
                        </div>
                        <div className="list___StyledDiv-sc-1kye8t0-0 imqnpO">
                            <div className="style__DivListItemIconWrapper-sc-1kiu30y-5 llvLmw">
                                <img src=""/>
                            </div>
                            <div className="style__DivListItemContent-sc-1kiu30y-7 QEHWP">Giảm giá 3% , cho đơn từ ₫15.000</div>
                        </div>
                        <div className="list___StyledDiv-sc-1kye8t0-0 imqnpO">
                            <div className="style__DivListItemIconWrapper-sc-1kiu30y-5 llvLmw">
                                <img src=""/>
                            </div>
                            <div className="style__DivListItemContent-sc-1kiu30y-7 QEHWP">Giảm giá 4% , cho đơn từ ₫3.000</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chanceInfo___StyledDiv3-sc-15uhzom-2 hvFjmw" style={{visibility: `visible`}}>
                <div color="rgba(15, 50, 104, 1)" className="style__divChanceLeft-vmqj2w-0 bfRbJb">Bạn còn 4 lượt chơi</div>
            </div>
            <div className="style__divOuterWrapper-bs7ixc-0 bzIvKm">
                <div className="style__divContainer-bs7ixc-1 kpnMHw bg">
                    <p className="shareInfo___StyledP-sc-1uw305o-0 eytuCY">Nhận thêm lượt chơi lúc</p>
                    <div className="style__divBtnContainer-bs7ixc-2 apugu">
                        <div className="style__divBtnWrapper-bs7ixc-3 iIkGxu">
                            <button color="rgba(15, 50, 104, 1)" className="style__buttonShare-bs7ixc-4 jzLfrD">
                                <span className="style__spanIconWrapper-bs7ixc-5 gGuIca">
                                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>ic_share</title>
                                        <path d="M7.337 12.527a3.062 3.062 0 1 1-.27-4.6l4.642-3.224a3.063 3.063 0 1 1 .314 1.913L8.085 9.35a3.058 3.058 0 0 1 .097 1.642l3.813 2.38a3.062 3.062 0 1 1-.282 1.886l-4.376-2.73zM14.733 6.5a1.312 1.312 0 1 0 0-2.625 1.312 1.312 0 0 0 0 2.625zm-9.546 5.158a1.313 1.313 0 1 0 0-2.625 1.313 1.313 0 0 0 0 2.625zm9.546 4.4a1.312 1.312 0 1 0 0-2.625 1.312 1.312 0 0 0 0 2.625z" fill-rule="nonzero"></path></svg>
                                </span>
                                <span className="style__spanText-bs7ixc-6 iBdkuH">Chia sẻ để nhận lượt chơi</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="style__DivListContainer-jcpc72-0 iMxOhJ empty-list">
                <div className="style__DivListScroll-jcpc72-1 kFSpyK" style={{transform: `translateY(20px)`}}>
                </div>
            </div>
            <div className="rule___StyledDiv-sc-12mouf4-0 fVlPrn">
                <h2 className="rule___StyledH-sc-12mouf4-1 gEqsnv">- 
                    <span className="rule___StyledSpan-sc-12mouf4-2 cVNQIu">Mô tả trò chơi</span> -
                </h2>
                <div className="rule___StyledDiv2-sc-12mouf4-3 pxbqb">Bấm “QUAY” để bắt đầu quay vòng quay. Ô giải thưởng nào dừng lại ở vị trí mũi tên khi vòng quay kết thúc bạn sẽ nhận được quà của ô giải thưởng đó.</div>
            </div>
            <div className="rule___StyledDiv-sc-12mouf4-0 fVlPrn">
                <h2 className="rule___StyledH-sc-12mouf4-1 gEqsnv">- 
                    <span className="rule___StyledSpan-sc-12mouf4-2 cVNQIu">Thể lệ trò chơi</span> -
                </h2>
                <div className="rule___StyledDiv2-sc-12mouf4-3 pxbqb">
                    1. Đây là chương trình trong gian hàng của người bán. Shopee hoàn toàn không can thiệp và không phải là một bên hợp tác với người bán trong các chương trình này. Người bán tổ chức chương trình là bên duy nhất chịu trách nhiệm các vấn đề liên quan đến chương trình.
                    2. Shopee hoàn toàn hiểu và đồng ý rằng Apple không có bất kỳ nghĩa vụ hỗ trợ hay bảo đảm nào với chương trình.
                    3. Tất cả người dùng Shopee có đăng nhập tài khoản Shopee đều có thể tham gia chương trình tại gian hàng do Người bán tổ chức.
                    4. Bạn sẽ nhận được tối đa 4 lượt tham gia miễn phí mỗi Shop/ mỗi ngày, số lượt này đã bao gồm 1 lượt cộng thêm mỗi lần bạn chia sẻ chương trình với người khác trong ngày. Số lượt tham gia khả dụng sẽ không được tích lũy trong khoảng thời gian diễn ra chương trình mà được làm mới hàng ngày.
                    5. Trúng giải là khi bạn quay trúng ô giải thưởng trong vòng quay, và đồng thời nhận được bảng thông báo đã trúng giải thưởng tương ứng. 
                    6. Giải thưởng đã trúng ( Mã giảm giá hoặc Xu của shop) sẽ tự động được cập nhật vào ví của bạn. Giải thưởng có hiệu lực trong thời gian nhất định, vui lòng kiểm tra hiệu lực và sử dụng trước ngày hết hạn.
                    7. Chương trình sẽ tự động kết thúc khi các giải thưởng đã được trao hết.
                    8. Mọi tranh chấp phát sinh trong thời gian diễn ra chương trình, quyền quyết định cuối cùng thuộc về Shopee.</div>
                </div>
                <div className="shopInfo___StyledDiv-sc-1kbe848-0 hHQDel">
                    <div color="rgba(15, 50, 104, 1)" className="style__divContainer-sc-1ly2gru-0 eaoPfD">
                        <img src="https://cf.shopee.vn/file/e09b7eec5fbf3add1ed6287059ad87cd_tn" className="shopInfo___StyledImg-sc-1kbe848-1 icWoHp"/>
                        <p className="style__pShopName-sc-1ly2gru-1 kvGvgi">anhdai123456</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Whell