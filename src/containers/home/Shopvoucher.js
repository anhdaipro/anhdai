import React, {useState, useEffect,useRef} from 'react'
import styled from "styled-components"
import Items from './Displayitem'

const Flex=styled.div`
display:flex;
`
const Flexcolumn=styled(Flex)`
flex-direction:collumn
`
const Flexcenter=styled(Flex)`
    align-items: center;
    justify-content: center;
`
const ContentInfo=styled.span`
margin: 0.3125rem 0.3125rem 0 0;
text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
const Boxvoucher=styled(Flex)`
    box-shadow: 0.125rem 0.125rem 0.3125rem rgb(0 0 0 / 7%);
    padding: 0;
    width: 100%;
    height: 6.75rem;
    position:relative;
    border-radius: 0.125rem;
    overflow: visible;
`
const Iteminfo=styled(Flex)`
    flex-direction: column;
    position: relative;
    justify-content:center;
    flex:1;
    max-width: 100%;
    height: 100%;
    padding-right: 0.1875rem;
`

const Styletext=styled.div`
color: #d0011b;
font-size: ${props=>props.size}rem;
line-height: ${props=>props.primary?1.25:1}rem;
font-weight: 500;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`
const Percentuse=styled.div`
    width: 100%;
    height: 0.25rem;
    background: rgba(0,0,0,.09);
    border-radius: 0.25rem;
    overflow: hidden;
`
const Boxcontent=styled(Flexcenter)`
    background: #fff4f4;
    border: 1px solid #f8d0d3;
    padding: 0 0 0 0.4375rem;
    flex:1;
    position: relative;
    border-left: 0 solid transparent;
`
const Dot=styled.div`
position:absolute;
height:100%;
width:1px;
right:0;
border-left: 1px dotted #e8e8e8;
`
const Infomore=styled.div`
margin-top:0.25rem
`
const StyleDiv= styled(Flexcenter)`
    border-top: 1px solid #f8d0d3;
    border-bottom: 1px solid #f8d0d3;
    position: relative;
    min-width: 0.3125rem;
    background: linear-gradient(90deg,transparent 0,transparent 0.25rem,#fff4f4 0);
    margin-left: 1px;
    border-radius: 0.1875rem 0 0 0.1875rem;
`
const StyleDiv2= styled.div`
    background: radial-gradient(circle at 0 0.375rem,transparent 0,rgba(0,0,0,.03) 0.1875rem,#f8d0d3 0,#f8d0d3 0.25rem,#fff4f4 0);
    background-size: 0.25rem 0.625rem;
    background-repeat: repeat-y;
    position: absolute;
    top: 0;
    left: 0;
    width: 0.25rem;
    height: 100%;
`
const StyleDiv1= styled.div`
    top: 0;
    left: 0;
    width: 0.3125rem;
    position: absolute;
    height: 100%;`
const ContentWrap=styled.div`
background-color: #fff;
    padding: 1.25rem 1.875rem;
    margin-top:1.5rem
`
const StyleDiv3= styled.div`
    top: 0;
    left: 0;
    background: repeating-linear-gradient(#f8d0d3,#f8d0d3 0.1875rem,transparent 0,transparent 0.625rem);
    background-size: 1px 0.625rem;
    width:1px;
    position: absolute;
    height: 100%;`
const Styletext1=styled.span`
    color: ${props=>props.primary?'#ff424f':'rgba(0,0,0,.54)'};
    font-weight: 400;
    font-size:0.625rem;
`

const Shopvoycher=(props)=>{
    const {categories}=props
    
    const itemdisplay=(item)=>{
        return(
            <div>
                <Boxvoucher>
                    <StyleDiv style={{borderColor:'#e8e8e8'}}>
                        <StyleDiv1>
                            <StyleDiv2>
                                <StyleDiv3></StyleDiv3>
                            </StyleDiv2>
                        </StyleDiv1>
                    </StyleDiv>
                    <Boxcontent>
                        <Iteminfo>
                            
                            <div className="pr-1_2"> 
                                <Styletext primary size={1}>Giảm ₫{item.discount_price}k</Styletext>
                                    
                                <Styletext size={0.875}>Đơn Tối Thiểu ₫180k</Styletext>
                            </div>
                                
                            
                            <ContentInfo>
                                <Percentuse>
                                    <div style={{width: `91%`, height: `100%`, background: `linear-gradient(270deg, rgb(255, 176, 0) 0%, rgb(235, 23, 23) 100%)`}}></div>
                                </Percentuse>
                                <Infomore>
                                    <Styletext1 primary>Đã dùng 91%, </Styletext1>
                                    <Styletext1>HSD: 31.10.2022</Styletext1>
                                </Infomore>
                            </ContentInfo>        
                            <Dot></Dot>
                            
                        </Iteminfo>
                        <div className="mx-1">
                            <button type="button" className="btn btn-solid-primary btn--s btn--inline _2juLw1 _2H9aBl D_d49Y" aria-disabled="false">Lưu</button>
                        </div>
                    </Boxcontent>
                </Boxvoucher>
            </div> 
        )
    }
    return(
        <Items
            items={categories}
            num_display={3.5}
            num_show={3.5}
            itemdisplay={itemdisplay}
            width={1200-30}
        />
               
    )
}
export default Shopvoycher