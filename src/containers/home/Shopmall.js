import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import {useState} from "react"
const Shopmall=(props)=>{
    const {categories,num_display,width}=props
    const [translateY,settranslateY]=useState(0)
    const widthcate=categories.length/num_display
    const settransform=(value)=>{
        settranslateY(value<=0?0:value>=widthcate-1?widthcate-1:value)
    }
    return(
                <div className="ofs-carousel">
                    <div className="ofs-carousel__header">
                        <Link className="ofs-carousel__header-left ofs-carousel__header-left--clickable" to="/mall/Thời-Trang-Nam-cat.11035567">Anhdai Mall</Link>
                        <Link className="ofs-carousel__header-right" to="/mall/brands/11035567">
                            <div className="ofs-page__section-header-see-all item-center">Xem tất cả
                                <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="svg-icon icon-arrow-right"><path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
                            </div>
                        </Link>
                    </div>
                    <div className="ofs-carousel__items">
                        <div className="image-carousel">
                            <div className="image-carousel__item-list-wrapper">
                                <ul className="image-carousel__item-list" style={{width: `${categories.length*100/num_display}%`, transform: `translate(-${translateY*1200}px, 0px)`, transition: 'all 500ms ease 0s'}}>
                                    {categories.map((category,i)=>
                                    <li key={i} className="image-carousel__item" style={{padding: '0px',width: `${100/num_display}%`}}>
                                        <div className="ofs-carousel__column ofs-carousel__column--two-row">
                                            {category.map((item,j)=>
                                            <div key={j} className="ofs-carousel__item">
                                                <Link className="ofs-carousel__shop-cover-image" to="/sp.btw2">
                                                    <div className="_25_r8I">
                                                        <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage:`url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                                                    </div>
                                                </Link>
                                            </div>)}
                                            
                                        </div>
                                    </li>)}
                                </ul>
                            </div>
                            <div onClick={()=>settransform(translateY-1)} className={`carousel-arrow carousel-arrow--prev carousel-arrow--hint ${translateY==0?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateY==0?'hidden':'visible'}`, transform: 'translateX(calc(-50% + 0px))'}}>
                                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
                            </div>
                            <div onClick={()=>settransform(translateY+1)}  className={`carousel-arrow carousel-arrow--next carousel-arrow--hint ${translateY==(categories.length/num_display)?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateY==widthcate-1?'hidden':'visible'}`, transform: 'translateX(calc(50% - 0px))'}}>
                                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
export default Shopmall