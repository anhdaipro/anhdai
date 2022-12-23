import {useNavigate , Link,useLocation, Navigate,useParams,useSearchParams} from 'react-router-dom';
import {useState} from "react"
import Items from './Displayitem';
const Shopmall=(props)=>{
    const {categories}=props
    const itemdisplay=(item)=>{
        return(
            <div className="ofs-carousel__column ofs-carousel__column--two-row">
                {item.map((category,j)=>
                    <div key={j} className="ofs-carousel__item">
                        <Link className="ofs-carousel__shop-cover-image" to="/sp.btw2">
                            <div className="_25_r8I">
                                <div className="ofs-carousel__cover-image _2GchKS" style={{backgroundImage:`url(${category.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                            </div>
                        </Link>
                </div>)}
                                            
            </div>
        )
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
                <Items
                    num_display={6}
                    num_show={6}
                    width={1200}
                    itemdisplay={itemdisplay}
                    items={categories}
                />

                        
            </div>
        </div>
    )
}
export default Shopmall