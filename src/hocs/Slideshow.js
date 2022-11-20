import React,{useEffect,useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
const SlideshowGallery=({slides,automatic,top})=>{
    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const slideRef=useRef()
    const lastSlide = slides[slides.length - 1]
    const [time,setTime]=useState(6000)
    const [state, setState] = useState({
    activeSlide: 0,
    transition: 500,
    transitioning: false,
    _slides: [lastSlide, ...slides, firstSlide]
  })

  const { activeSlide, translate, _slides, transition, transitioning } = state

  useEffect(()=>{
    const timer=setInterval(function() {
      const index=activeSlide+1
      setState(prev=>{return {...prev,activeSlide:index>slides.length-1?0:index,transition:500}})
    },time)
    return ()=>clearInterval(timer)
  },[activeSlide])
  const setslide=(value)=>{
    setState({...state,activeSlide:value<0?slides.length-1:value>slides.length-1?0:value,transition:500})
  }
  const back=()=> {
    slideRef.current.goBack();
  }

  const next=()=> {
    slideRef.current.goNext();
  }
    return(
        <div className="stardust-carousel">
            {slides.length>0?<>
            <div  className="stardust-carousel__item-list-wrapper">
                <Slide 
                    arrows={false}
                    autoplay={true}
                    duration={4000}
                    easing="ease"
                    ref={slideRef}
                    transitionDuration={500}
                    indicators={(index)=>
                    <div key={index} className="stardust-carousel__dot"></div>
                    }
                >
                    {slides.map((item,i)=>
                    
                        <div className="stardust-carousel__item-inner-wrapper">
                            <Link className="full-home-banners__banner-image" to={`/${item.url_field}`}>
                                <div className="_3XtrnR full-home-banners__light-background">
                                    <div className="full-home-banners__main-banner-image nO87xn" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',paddingTop:`${top}%`}}></div>
                                </div>
                            </Link>
                        </div>
                    )} 
                </Slide>
                <div onClick={back} class="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--prev"><svg enable-background="new 0 0 13 20" viewBox="0 0 13 20" role="img" class="stardust-icon stardust-icon-arrow-left-bold"><path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path></svg></div>
                <div onClick={next} class="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--next"><svg enable-background="new 0 0 13 21" viewBox="0 0 13 21" role="img" class="stardust-icon stardust-icon-arrow-right-bold"><path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path></svg></div>
            </div>
            </>:
            ''}
        </div>
    )
}
export default SlideshowGallery
