import { useRef,useState,useEffect } from "react"
import PropTypes from 'prop-types'; // ES6
const Options=(props)=>{
    const optionRef=useRef()
    const {className,setOption,items,option,inputRef}=props
    const [show,setShow]=useState(false)
    useEffect(() => {
        const handleClick = (event) => {
            const { target } = event
            if(show){
                if (!optionRef.current.contains(target)) {
                    setShow(false)
                }
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [show])


    return(
        <div data-v-40673d96="" className="input-group search-type">
            <span ref={optionRef} className="input-group__prepend" style={{width: '160px'}}>
                <div data-v-40673d96="" className="select">
                    <div onClick={e=>setShow(!show)} tabIndex="0" className="selector selector--normal item-space"> 
                        <div className="selector__inner line-clamp--1">{items.find(item=>item.value==option).name}</div> 
                        <div className="selector__suffix"> 
                            <i className="selector__suffix-icon icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                            </i>
                        </div>
                    </div> 
                    {show?
                    <div className="select__options">
                        {items.map(item=>
                        <div key={item.value} onClick={(e)=>{setOption(item.value)
                            setShow(false)
                        }} data-v-40673d96="" className={`option ${item.value==option?'selected':''}`}>{item.name}</div>
                        )}
                        
                    </div>:''}
                </div>
            </span> 
            <span className="input-group__append">
                <div data-v-40673d96="" className="input search-input">
                    <div className="input__inner input__inner--normal"> 
                        <input ref={inputRef} type="text" placeholder=" " resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                    </div>
                </div>
            </span>
        </div>
    )
}

Options.prototype={
    className:PropTypes.string,
    setOption:PropTypes.func.isRequired,
    items:PropTypes.array.isRequired,
    option:PropTypes.string.isRequired,
    inputRef:PropTypes.object.isRequired
}
export default Options