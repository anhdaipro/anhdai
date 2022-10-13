import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import {useMemo, useState} from "react"
import styled from 'styled-components'
import SlideshowGallery from '../../hocs/Slideshow';
import {partition} from "../../constants"
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
    {image:'https://cf.shopee.vn/file/a2c97acccc2213d2fcc3729cf1ab40a4',url_field:'/enfaofficialstore'},
    {image:'https://cf.shopee.vn/file/5824537f420e7f1ae501fd6059e35e81',url_field:'/enfaofficialstore'},
    {image:'https://cf.shopee.vn/file/a0abb2ab28a3cedd2afddeab71a71a56',url_field:'/enfaofficialstore'},
    {image:'https://cf.shopee.vn/file/5fef93dfdfd1949341bace89f3ede8cd',url_field:'/enfaofficialstore'},
    {image:'https://cf.shopee.vn/file/9687f840376bd97a95a7f6967b7e8c0f',url_field:'/enfaofficialstore'},
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
    const {num_display,width}=props
   
    
    const [translateY,settranslateY]=useState(0)
    const widthcate=categories.length/num_display
    const settransform=(value)=>{
        settranslateY(value<=0?0:value>=widthcate-1?widthcate-1:value)
    }
    console.log(Math.ceil((categories.length/num_display)-1))
    console.log(translateY)
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
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: `${categories.length*100/num_display}%`, transform: `translate(-${translateY*width}px, 0px)`, transition: 'all 500ms ease 0s'}}>
                                    {categories.map((category,i)=>
                                    <li key={i} className="image-carousel__item" style={{padding: '0px',width: `${100/num_display}%`}}>
                                        <div>
                                            {category.map(item=>
                                                <div class="ofs-carousel__item" location="14" shopid="37251700">
                                                    <Link class="ofs-carousel__shop-cover-image" to="/larocheposay">
                                                        <div class="n-CE6j">
                                                            <ImageBackground image={item.image} class="ofs-carousel__cover-image edy5hG"></ImageBackground>
                                                        </div>
                                                    </Link>
                                                    <div class="ofs-carousel__item__text">{item.name}</div>
                                                </div>
                                            )}
                                        </div>
                                    </li>)}
                                </ul>
                            </div>
                            <div onClick={()=>settransform(translateY-1)} className={`carousel-arrow carousel-arrow--prev carousel-arrow--hint ${translateY==0?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateY==0?'hidden':'visible'}`, transform: 'translateX(calc(-50% + 0px))'}}>
                                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                            </div>
                            <div onClick={()=>settransform(translateY+1)}  className={`carousel-arrow carousel-arrow--next carousel-arrow--hint ${translateY==Math.ceil(categories.length/num_display)?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateY==widthcate-1?'hidden':'visible'}`, transform: 'translateX(calc(50% - 0px))'}}>
                                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                            </div>
                        </div>
                    </Content>
                </>
    )
}
export default Brand