import { formatter } from "../../constants"
import styled from "styled-components"
import { Link } from 'react-router-dom';
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
font-size:0.75rem;
display: -webkit-box;
text-overflow: ellipsis;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
word-wrap: break-word;
line-height: 14px;
min-height:1.75rem
`
const Price=styled.div`
color:#ee4d2d;
font-size:1rem;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`
const StyleDiv=styled.div`
display:flex;
align-items:center;
padding:12px 0 0;
justify-content:space-between
`
const Styletext=styled.div`
color:rgba(0,0,0,.26);
font-size:0.75rem;
margin-left:${props=>props.margin||0}
`
const Rating=styled.div`
display:flex;
align-items:center;
font-size:0.65rem;
overflow:hidden
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
const Dailyreacomment=(props)=>{
    const {items}=props
    return(
                <StyleSection>
                    <ListItem>
                        {items.map(item=>
                        <Item key={item.id}>
                            <Link to={`${item.url}?itemId=${item.id}`}>
                                <div className="item">
                                    <div style={{position:'relative'}}>
                                        <StyleImage url={item.image}></StyleImage>
                                        {item.percent_discount?
                                        <Percent>
                                            <div>50%</div>
                                            <div>GIẢM</div>
                                        </Percent>:''}
                                        <Shoptype>Yêu thích</Shoptype>
                                    </div>
                                    <Info>
                                        <Name>
                                            {item.name}
                                        </Name>
                                        
                                        <StyleDiv>
                                            <Price>₫{formatter.format((item.max_price+item.min_price)/2)}</Price>
                                            <Styletext margin='4px'>Đã bán {item.number_order}</Styletext>
                                        </StyleDiv>
                                    </Info>
                                    <Findsame className="find-same">Tìm sản phẩm tương tự</Findsame>
                                </div>
                            </Link>
                        </Item>
                        )}
                    </ListItem>
                </StyleSection>
    )
}
export default Dailyreacomment