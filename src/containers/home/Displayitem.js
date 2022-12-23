import React,{useState,useEffect,createRef} from 'react';
const Items=(props)=>{
    const {items,num_display,width,num_show,itemdisplay}=props
    const [translateX,settranslateX]=useState(0)
    const widthcate=items.length/num_display
    const settransform=(value)=>{
        settranslateX(value<=0?0:value>=widthcate-1?widthcate-1:value)
    }
  
    const dx=parseInt(num_show)/num_display
    return(
        <div className="image-carousel">
            <div className="image-carousel__item-list-wrapper">                      
                <ul className="image-carousel__item-list" style={{width: `${items.length*100/num_display}%`, transform: `translate(-${translateX*width}px, 0px)`, transition: 'all 500ms ease 0s'}}>
                {
                items.map(item =>
                    <li key={item.id} className="image-carousel__item" style={{width:`${100/num_display}%`}}>
                        {itemdisplay(item)}
                    </li>
                    )
                    }
                </ul>
            </div>
            <div onClick={()=>settransform(translateX-dx)} className={`carousel-arrow carousel-arrow--prev carousel-arrow--hint ${translateX==0?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateX==0?'hidden':'visible'}`, transform: 'translateX(calc(-50% + 0px))'}}>
                <svg enableBackground="new 0 0 13 20" viewBox="0 0 13 20" x="0" y="0" className="svg-icon icon-arrow-left-bold"><polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon></svg>
            </div>
            <div onClick={()=>settransform(translateX+dx)}  className={`carousel-arrow carousel-arrow--next carousel-arrow--hint ${translateX==widthcate-1?'carousel-arrow--hidden':''}`} role="button" tabIndex="0" style={{opacity: 1, visibility: `${translateX==widthcate-1?'hidden':'visible'}`, transform: 'translateX(calc(50% - 0px))'}}>
                <svg enableBackground="new 0 0 13 21" viewBox="0 0 13 21" x="0" y="0" className="svg-icon icon-arrow-right-bold"><polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon></svg>
            </div>
        </div>
    )
}
export default Items