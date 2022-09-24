import Navbar from '../Navbar'
import HomePage from '../Home'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { ratingitem } from '../../constants'
import React,{ useState,useRef,useCallback,useMemo } from 'react'
import { Stylediv1,Stylecontent } from './styles'
const Header=styled.div`
position:relative;
height:3.5rem;
margin-top:40px;
display:flex
`
const Hr=styled.hr`
position: absolute;
border-top: 1px dotted rgba(0,0,0,.26);
width: 100%;
left: 0;
top: 50%;
margin: 0;
`
const Title=styled.h1`
    font-size: 1.25rem;
    line-height: 1;
    letter-spacing: .01em;
    user-select: none;
    cursor: default;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-weight: 500;
    color: #fff;
    padding: 1.125rem 1.25rem;
    display: inline-block;
    background-color: #ee4d2d;
    margin: auto;
    z-index: 1;
    border-radius: 0.625rem;
    text-transform: capitalize;
`

const ListItem=styled.div`
display:flex;
flex-wrap:wrap;
margin: 0 -0.375rem 6.25rem;
`
const Item=styled.div`
width:16.6667%;
padding:4px;
box-sizing:border-box;
&:hover .item{transform:translateY(-1px);
    border:1px solid #ee4d2d;
    z-index:2;
    box-shadow: 0.0625rem 0.125rem 0.125rem 0.0625rem rgb(0 0 0 / 10%)
}
&:hover .find-same{
    opacity:1;
}
.item {
    background-color:#fff;
    box-shadow: 0 0.0625rem 0.125rem 0 rgb(0 0 0 / 10%);
    border-radius: 0.125rem;
    cursor:pointer;
    border: 1px solid transparent;
    height:100%;
    position:relative;
    box-sizing:border-box;
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
line-height: 14px;
font-size:.75rem;
min-height:1.75rem
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
`
const Styletext=styled.div`
color:rgba(0,0,0,.26);
font-size:0.75rem;
margin-left:${props=>props.margin||0}
`
const Rating=styled.div`
display:flex;
align-item:center;
font-size: .625rem;
overflow:hidden;
svg{
    color: #ffce3d;
    stroke: #ffce3d;
    
}
`
const StyleSection=styled.section`
padding:40px 0
`
const Findsame=styled.div`
background-color: #ee4d2d;
color:#fff;
padding:4px 8px;
top:100%;
position:absolute;
left:-1px;
width:calc(100% + 0.125rem);
opacity:0;
text-align:center;
border-bottom-left-radius: 0.125rem;
border-bottom-right-radius: 0.125rem;
border:1px solid #ee4d2d;
z-index:1
`
const Percent=styled.div`
width: 36px;
height: 32px;
top:0;
padding:4px 2px 2px;
font-size:0.75rem;
line-height:0.815rem;
text-align: center;
right:0;
color:#ee4d2d;
position:absolute;
background-color: rgba(255,212,36,.9);
text-transform: uppercase;
&::before{
    width:0;
    height:0;
    border-style: solid;
    left: 0;
    content:'';
    bottom: -4px;
    position: absolute;
    border-color: transparent rgba(255,212,36,.9);
    border-width: 0 18px 4px
}
`
const Shoptype=styled.div`
top:4px;
padding:4px 2px 2px;
font-size:0.75rem;
line-height:0.815rem;
text-align: center;
left:-3px;
color:#fff;
position:absolute;
border-bottom-right-radius:2px;
border-top-right-radius:2px;
background-color: rgb(242, 82, 32);
&:before{
    width:0;
    height:0;
    bottom: -3px;
    left:0;
    position: absolute;
    content:'';
    border-top: 3px solid;
    filter: brightness(60%);
    border-left: 3px solid transparent;
}
`
const listchoice=["Bánh Pía Sầu Riêng","Áo Thun Polo Nam Ngắn Tay","Quần Short Nam","Nồi Cơm Điện Mini","Áo Sơmi Nam","Quần Boxer","Quần Lót Nam Co Dãn","Ví Da Nam,Quần Legging Cạp Cao","Hình Xăm Dán","Hạnh Nhân","Mít Sấy Vụn","Ốp Lưng Iphone","Quần Lót Nữ Cotton","Nồi Cơm Điện","Gương Mini","Giá Đỡ Điện Thoại","Bút Kẻ Mắt Chống Nước","Nước Tẩy Trang L'Oreal","Khẩu Trang Unicharm"]
const Daily=()=>{
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
                <Header>
                    <Title>Tất cả</Title>
                    <Hr/>
                </Header>
                <StyleSection>
                    <ListItem>
                        <Item>
                            <Link to='/'>
                                <div className="item">
                                    <div style={{position:'relative'}}>
                                        <StyleImage url='https://cf.shopee.vn/file/4fc8e8ef0964b90be4b6d53d3cf50861_tn'></StyleImage>
                                        <Percent>
                                            <div>50%</div>
                                            <div>GIẢM</div>
                                        </Percent>
                                        <Shoptype>Yêu thích</Shoptype>
                                    </div>
                                    <Info>
                                        <Name>
                                            <span>1 gói bánh pía mini sầu riêng ( free ship) bánh pía mini đặc sản sóc trăng</span>
                                        </Name>
                                        <Price>₫17.000</Price>
                                        <StyleDiv>
                                            
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                        
                                            </div>
                                            <Styletext margin='4px'>Styletext</Styletext>
                                        </StyleDiv>
                                    </Info>
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
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
                                            
                                            <div className="item-center">
                                                <Rating>
                                                    {ratingitem(5,product)}
                                                </Rating>
                                                <Styletext margin='4px'>(56)</Styletext>
                                            </div>
                                            <Styletext>Styletext</Styletext>
                                        </StyleDiv>
                                    </Info>
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
                                </div>
                            </Link>
                        </Item>
                        
                        
                        
                    </ListItem>
                </StyleSection>
                
            </Stylecontent>
        </div>
    )
}
export default Daily