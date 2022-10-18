import React,{useEffect,useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom"
const SlideshowGallery=({slides,automatic,top})=>{
    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const sliderRef=useRef()
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
    return(
        <div className="stardust-carousel">
            {slides.length>0?<>
            <div  className="stardust-carousel__item-list-wrapper" style={{paddingTop: `${top}%`}}>
                <ul ref={sliderRef} onTransitionEnd={()=>setState({...state,transition:0})}  className="stardust-carousel__item-list" style={{width: `${100*slides.length}%`, transition: `${state.transition}ms`,
                 transform: `translate3d(${-(activeSlide)*(100/slides.length)}%, 0, 0)`}}>
                    
                    {slides.map((item,i)=>
                    <li key={i} className="stardust-carousel__item" style={{width: `${100/slides.length}%`}}>
                        <div className="stardust-carousel__item-inner-wrapper">
                            <Link className="full-home-banners__banner-image" to={`/${item.url_field}`}>
                                <div className="_3XtrnR full-home-banners__light-background">
                                    <div className="full-home-banners__main-banner-image nO87xn" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',paddingTop:`${top}%`}}></div>
                                </div>
                            </Link>
                        </div>
                    </li>
                    )}
                    
                </ul>
            </div>
            <div onClick={()=>setslide(activeSlide-1)} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--prev"><svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" role="img" className="stardust-icon stardust-icon-arrow-left-bold"><path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path></svg></div>
            <div onClick={()=>setslide(activeSlide+1)} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--next"><svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" role="img" className="stardust-icon stardust-icon-arrow-right-bold"><path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path></svg></div>
            <div className="stardust-carousel__dots">
                {Array(slides.length).fill().map((_, i) => 
                    <div key={i} onClick={()=>setState({...state,activeSlide:i,transition:500})} className={`stardust-carousel__dot ${i==activeSlide?'stardust-carousel__dot--active':''}`}></div>
                )}
            </div></>:
            ''}
        </div>
    )
}
export default SlideshowGallery
