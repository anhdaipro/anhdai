import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import {useMemo, useState} from "react"
import styled from 'styled-components'
import SlideshowGallery from '../../hocs/Slideshow';
import {partition} from "../../constants"
import Items from './Displayitem';
const Content=styled.div`
width: 50rem;
display: inline-block;
background-color: rgb(255, 255, 255);
`
const Contentslide=styled.div`
    width: 400px;
    height: 472px;
    display: inline-block;
    padding: 10px 0px 10px 10px;
    background-color: rgb(255, 255, 255);
    vertical-align: top;
`
const ImageBackground=styled.div`
    background-size: cover;
    background-image:url(${props=>props.image});
    background-repeat: no-repeat;
    width: 100%;
    padding-top: 120%;

`
const items=[
    {image:'https://cf.shopee.vn/file/a2c97acccc2213d2fcc3729cf1ab40a4',url_field:'/phamdai'},
    {image:'https://cf.shopee.vn/file/5824537f420e7f1ae501fd6059e35e81',url_field:'/phamdai'},
    {image:'https://cf.shopee.vn/file/a0abb2ab28a3cedd2afddeab71a71a56',url_field:'/phamdai'},
    {image:'https://cf.shopee.vn/file/5fef93dfdfd1949341bace89f3ede8cd',url_field:'/phamdai'},
    {image:'https://cf.shopee.vn/file/9687f840376bd97a95a7f6967b7e8c0f',url_field:'/phamdai'},
]
const listitem=[
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/d272a771fbf4da531c8aae0e55c054bf_xhdpi',name:'Pro. Vươt trội.'},
    {image:'https://cf.shopee.vn/file/e3f6d87dee0fbab3ae58e98b31c5407c_xhdpi',name:'Mua 1 tặng 2'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
    {image:'https://cf.shopee.vn/file/087e91c91d23ebb7c425612a7ee721ff_xhdpi',name:'Mua là có quà'},
]
const int=2
const categories=partition(listitem, int).map(subarray => subarray)

const Brand=(props)=>{
    const itemdisplay=(item)=>{
        return(
            <div>
                {item.map((category,index)=>
                    <div key={index} class="ofs-carousel__item" location="14" shopid="37251700">
                        <Link class="ofs-carousel__shop-cover-image" to="/larocheposay">
                            <div class="n-CE6j">
                                <ImageBackground image={category.image} class="ofs-carousel__cover-image edy5hG"></ImageBackground>
                            </div>
                        </Link>
                        <div class="ofs-carousel__item__text">{category.name}</div>
                    </div>
                )}
            </div> 
        )
    }
    return(
        <>
            <Contentslide>
                <div style={{width:'100%'}}>
                    <SlideshowGallery
                        slides={items}
                        automatic={true}
                        timeout={`2500`}
                        top={118.947}
                        dot={true}
                    />
                </div>
            </Contentslide>
            <Content>
                <Items
                    itemdisplay={itemdisplay}
                    num_display={4}
                    num_show={4}
                    width={800}
                    items={categories}
                />         
            </Content>
        </>
    )
}
export default Brand