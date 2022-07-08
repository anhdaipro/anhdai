import React,{useEffect,useState,useRef} from 'react';
import ReactDOM from 'react-dom';

import {detailURL,formatter,localhost,rating,rating_choice} from "../constants"
const SlideshowGallery=({list_image,automatic,timeout})=>{
    const [state,setState]=useState({slideIndex: 0})
    const parent=useRef()
    useEffect(() => {
        if (automatic) {
            const timer = setTimeout(function() {
                setState({slideIndex:getNewSlideIndex(state.slideIndex+1)})
            }, parseInt(timeout));
            
            return ()=> clearTimeout(timer)
          }
    },[state])
    
    
    
    const start = Date.now();
    const elapsed = Date.now();
    const remaining =  (parseInt(timeout)-elapsed)/1000;
    console.log(remaining)
    const getNewSlideIndex=(value)=> {
        const numberSlide = list_image.length;
        let newSlideIndex=value
        parent.current.style.transition='all 500ms ease 0s'
        if(value >= numberSlide){
            newSlideIndex=0
            parent.current.style.transition='all 0ms ease 0s'
        }
        else if(value<0){
            newSlideIndex=numberSlide - 1
            parent.current.style.transition='all 0ms ease 0s'
        }
        return newSlideIndex
      }

    return(
        <div className="stardust-carousel">
            {list_image.length>0?<>
            <div className="stardust-carousel__item-list-wrapper" style={{paddingTop: '29.5003%'}}>
                <ul ref={parent} className="stardust-carousel__item-list" style={{width: `${100*list_image.length}%`, transition: `all 0ms ease`,
                 transform: `translateX(-${state.slideIndex*(100/list_image.length)}%) translateX(0px)`}}>
                    {list_image.map(item=>
                    <li className="stardust-carousel__item" style={{width: `${100/list_image.length}%`}}>
                        <div className="stardust-carousel__item-inner-wrapper">
                            <a className="full-home-banners__banner-image" href="/shopeepayvn">
                                <div className="_3XtrnR full-home-banners__light-background">
                                    <div className="full-home-banners__main-banner-image nO87xn" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                                </div>
                            </a>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
            <div onClick={()=>setState({slideIndex:getNewSlideIndex(state.slideIndex-1)})} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--prev"><svg enable-background="new 0 0 13 20" viewBox="0 0 13 20" role="img" className="stardust-icon stardust-icon-arrow-left-bold"><path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path></svg></div>
            <div onClick={()=>setState({slideIndex:getNewSlideIndex(state.slideIndex+1)})} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--next"><svg enable-background="new 0 0 13 21" viewBox="0 0 13 21" role="img" className="stardust-icon stardust-icon-arrow-right-bold"><path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path></svg></div>
            <div className="stardust-carousel__dots">
                {Array(list_image.length).fill().map((_, i) => 
                    <div onClick={()=>setState({slideIndex:getNewSlideIndex(i)})} className={`stardust-carousel__dot ${i==state.slideIndex?'stardust-carousel__dot--active':''}`}></div>
                )}
            </div></>:
            ''}
        </div>
    )
}
export default SlideshowGallery
