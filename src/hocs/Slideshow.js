import React,{useEffect,useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom"
const SlideshowGallery=({slides,automatic})=>{
    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const lastSlide = slides[slides.length - 1]
    const [timeout,settime]=useState(4000)
    const [state, setState] = useState({
    activeSlide: 0,
    transition: 500,
    transitioning: false,
    _slides: [lastSlide, ...slides, firstSlide]
  })

  const { activeSlide, translate, _slides, transition, transitioning } = state

  const autoPlayRef = useRef()
  const transitionRef = useRef()
  const resizeRef = useRef()
  const sliderRef = useRef()
  const throttleRef = useRef()

  useEffect(() => {
    autoPlayRef.current = nextSlide
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
    throttleRef.current = throttleArrows
  })

  useEffect(() => {
    const slider = sliderRef.current

    const smooth = e => {
      if (e.target.className.includes('stardust-carousel__item-list')) {
        transitionRef.current()
      }
    }

    const resize = () => {
      resizeRef.current()
    }

    const throttle = e => {
      if (e.target.className.includes('stardust-carousel__item-list')) {
        throttleRef.current()
      }
    }

    slider.addEventListener('transitionstart', throttle)
    slider.addEventListener('transitionend', smooth)
    window.addEventListener('resize', resize)

    return () => {
      slider.removeEventListener('transitionstart', throttle)
      slider.removeEventListener('transitionend', smooth)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    const play = () => {
        autoPlayRef.current();
        setState(prev=>{return{...prev,transition:500}})
    }
    const interval = setInterval(play, timeout);
    return () => {
        clearInterval(interval);
    };
  }, [activeSlide])


  const throttleArrows = () => {
    setState({...state, transitioning: true })
  }

  const handleResize = () => {
    setState({ ...state, transition: 500 })
  }

  const nextSlide = () => {
    setState(prev=>{return{
      ...prev,
      transition:500,
      activeSlide:activeSlide==slides.length-1?0: activeSlide + 1
    }})
  }

  const prevSlide = () => {
    setState({
      ...state,
      transition:500,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    })
  }

  const smoothTransition = () => {
    setState({
      ...state,
      transition: 0,
    })
  }
    return(
        <div className="stardust-carousel">
            {slides.length>0?<>
            <div  className="stardust-carousel__item-list-wrapper" style={{paddingTop: '29.5003%'}}>
                <ul ref={sliderRef}  className="stardust-carousel__item-list" style={{width: `${100*slides.length}%`, transition: `ease ${state.transition}ms`,
                 transform: `translate3d(${-(activeSlide)*(100/slides.length)}%, 0, 0)`}}>
                    {slides.map((item,i)=>
                    <li key={i} className="stardust-carousel__item" style={{width: `${100/slides.length}%`}}>
                        <div className="stardust-carousel__item-inner-wrapper">
                            <Link className="full-home-banners__banner-image" to={item.url_field}>
                                <div className="_3XtrnR full-home-banners__light-background">
                                    <div className="full-home-banners__main-banner-image nO87xn" style={{backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                                </div>
                            </Link>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
            <div onClick={prevSlide} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--prev"><svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" role="img" className="stardust-icon stardust-icon-arrow-left-bold"><path stroke="none" d="m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z"></path></svg></div>
            <div onClick={nextSlide} className="stardust-carousel__arrow stardust-carousel__arrow--type-1 stardust-carousel__arrow--next"><svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" role="img" className="stardust-icon stardust-icon-arrow-right-bold"><path stroke="none" d="m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z"></path></svg></div>
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
