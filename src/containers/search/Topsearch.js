import Navbar from '../Navbar'
import HomePage from '../Home'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { ratingitem } from '../../constants'
import React,{ useState,useRef,useCallback,useMemo } from 'react'
import { Stylediv1,Stylecontent } from './styles'

const Title=styled.h1`
margin:24px 0;
font-size:24px;
color:#333;
font-weight: 500;
text-align: center;
`
const Navtabs=styled.ul`
box-shadow: rgb(0 0 0 / 5%) 0px 1px 1px 0px;
background-color: rgb(255, 255, 255);
margin: 0px;
padding: 0px;
border-bottom: 1px solid rgba(0,0,0,.09);
display: flex;
`
const Tab=styled.li`
flex:1 1 auto;
display: flex;
min-width:6rem;
font-weight: 400;
font-family: -apple-system,Helvetica Neue,Helvetica,Roboto,Droid Sans,Arial,sans-serif;
font-size: 14px;
padding:0;
justify-content: center;
align-items: center;
cursor:pointer;
color:#333;

&:hover div::before{
    opacity:${props=>props.hide?0:0.6}
}
&.active{
    color:#ee4d2d;
}
`
const Tabdiv=styled.div`
    overflow: ${props=>props.visiale?'':'hidden'};
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    width: 100%;
    height:100%;
    padding: 1.1875rem 0.625rem;
    text-align: center;
    text-transform: capitalize;
    font-size: 1rem;
    box-sizing: border-box;
&::before{
    position:absolute;
    width:100%;
    content:'';
    height:3px;
    background-color:#ee4d2d;
    left:0;
    bottom:0;
    opacity:0
}
&:hover{
    color:${props=>props.hide?'#333':'#ee4d2d'}
}
&.tab-active:before{
    opacity:1
}
`
const ListItem=styled.div`
display:flex;
flex-wrap:wrap;
margin: 0.5625rem -0.375rem 6.25rem;
`
const Item=styled.div`
width:20%;
padding:4px;
&:hover .item{transform:translateY(-1px);
    box-shadow: 0.0625rem 0.125rem 0.125rem 0.0625rem rgb(0 0 0 / 10%)
}
.item {
    background-color:#fff;
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 10%);
    border-radius: 0.125rem;
    cursor:pointer
}
`
const StyleImage=styled.div`
background-image:url(${props=>props.url});
background-size: contain;
background-repeat: no-repeat;
background-position: 50%;
background-size: cover;
padding-top: 100%;
display: block;
background-color: transparent;
`

const Info=styled.div`
padding:4px 8px;
`
const Name=styled.div`
overflow: hidden;
display: -webkit-box;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
word-wrap: break-word;
line-height: 1.125rem;
height: 2.25rem;
`
const Price=styled.div`
color:#ee4d2d;
margin-top:12px;
margin-bottom:12px;
font-size:14px
`
const StyleDiv=styled.div`
display:flex;
align-item:center;
justify-content:space-between
`
const Styletext=styled.div`
color:rgba(0,0,0,.26);
font-size:0.75rem;
margin-left:${props=>props.margin||0}
`
const Rating=styled.div`
display:flex;
align-item:center;
font-size:0.65rem;
overflow:hidden
`
const StyleListDrop=styled.div`
display:flex;
flex-wrap:wrap;
width:25.625rem;
padding:4px 12px;
box-shadow: 0 1px 4px 0 rgb(0 0 0 / 26%);
box-sizing:border-box;
background-color:#fff
`
const StyleitemDrop=styled.span`
overflow: hidden;
display: -webkit-box;
text-overflow: ellipsis;
word-wrap: break-word;
white-space:nowrap;
padding:0.625rem 0;
width:11.25rem;
color:${props=>props.active?'#ee4d2d':'#333'};
&:hover{
    color:#ee4d2d
}
`
const ArrowTop=styled.div`
position:absolute;
border-left:10px solid transparent;
border-right:10px solid transparent;
border-bottom:10px solid #fff;
right:${props=>props.right};
width:0;
height:0;
filter:drop-shadow(0 -2px 2px rgba(0,0,0,.05));
top:-10px
`
const DropdowContent=styled.div`
width:100%;
cursor:pointer
`

const listchoice=["Bánh Pía Sầu Riêng","Áo Thun Polo Nam Ngắn Tay","Quần Short Nam","Nồi Cơm Điện Mini","Áo Sơmi Nam","Quần Boxer","Quần Lót Nam Co Dãn","Ví Da Nam,Quần Legging Cạp Cao","Hình Xăm Dán","Hạnh Nhân","Mít Sấy Vụn","Ốp Lưng Iphone","Quần Lót Nữ Cotton","Nồi Cơm Điện","Gương Mini","Giá Đỡ Điện Thoại","Bút Kẻ Mắt Chống Nước","Nước Tẩy Trang L'Oreal","Khẩu Trang Unicharm"]
const TopSearch=()=>{
    const product={review_rating:4}
    const [state,setState]=useState()
    const [show,setShow]=useState(false)
    const [change,setChange]=useState(false)
    const parent=useRef()
    const [choice,setChoice]=useState('Bánh pía sóc trăng')
    const listdisplay=useMemo(()=>{
        const listremains=listchoice.filter(item=>item!=choice).slice(0,5)
        return change?[choice,...listremains]:listchoice.slice(0,6)
    },[choice,change])
    return(
        <div>
            <div className="item-col top container-wrapper">
            <Navbar/>
            </div>
            
            <Stylecontent>
                <Title>Tìm kiếm hàng đầu</Title>
                <Stylediv1>
                    {listdisplay.map((item,i)=>
                    <Tab onClick={e=>{setChoice(item)
                        setChange(false)
                    }} key={i} className={`${item==choice?'active':''}`}>
                        <Tabdiv className={`${item==choice?'tab-active':''}`}>{item}</Tabdiv>
                    </Tab>
                    )}
                    <Tab hide>
                        <DropdowContent>
                            <div className="stardust-popover" onMouseLeave={e=>setShow(false)} onMouseEnter={e=>setShow(true)} visiale ref={parent}>
                                <Tabdiv hide visiale>
                                    <div onMouseEnter={e=>setShow(true)}  className='item-center'>
                                        Xem thêm
                                        <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="svg-icon icon-down-arrow-filled"><path d="m6.5 12.9-6-7.9s-1.4-1.5.5-1.5h13s1.8 0 .6 1.5l-6 7.9c-.1 0-.9 1.3-2.1 0z"></path></svg>
                                    </div>
                                </Tabdiv>
                                {show?
                                <div style={{position:'absolute',top:parent.current.offsetHeight,right:0}} className="stardust-popover__popover stardust-popover__popover--show">
                                    <ArrowTop right={`${parent.current.offsetWidth/2}px`}></ArrowTop>
                                    <StyleListDrop>
                                        {listchoice.map(item=>
                                        <StyleitemDrop onClick={e=>{setChoice(item)
                                            setChange(true)
                                        setShow(false)}} key={item} active={item==choice?true:false}>{item}</StyleitemDrop>
                                        )}
                                    </StyleListDrop>  
                                </div>:''}
                            </div>
                        </DropdowContent> 
                    </Tab>
                    
                </Stylediv1>
                <section>
                    <ListItem>
                        <Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item>
                        <Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://res.cloudinary.com/dupep1afe/image/upload/v1/file/c6f3d0efb2d38c1060c7eb91770251ab_xxhdpi_glmkt3'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item><Item>
                            <Link to='/'>
                                <div className="item">
                                    <div>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            <Styletext>Styletext</Styletext>
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                        </StyleDiv>
                                    </Info>
                                </div>
                            </Link>
                        </Item>
                        
                        
                        
                    </ListItem>
                </section>
                
            </Stylecontent>
        </div>
    )
}
export default TopSearch