import styled from "styled-components"
import axios from "axios"
import {newproductURL} from '../../urls'
import {useState,useEffect,useRef,useMemo,useTransition} from 'react'
const Dropcontent=styled.div`
position:relative;
width:100%;
height:100%
`
const Dropdown=styled.div`
position:absolute;
width:100%;
top:110%
`
const Selectoptions=styled.div`
padding-top: 8px;
padding-bottom: 8px;
`
const Contentinput=styled.div`
    position: relative;
    display: inline-table;
    width: 100%;
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    background-color: #fff;
    border-collapse: separate;
    border-spacing: 0;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    transition: border .2s ease-in-out;
    .input__input{ height: 30px;
    font-size: 14px;
    border-radius: 4px
    }
`
const Dropmenu=(props)=>{
    const {data,choice,setchoice,showsearch,addproperties}=props
    const parent=useRef()
    const [show, setShow] = useState(false)
    const [keyword,setKeyword]= useState('')
    const [value,setValue]=useState('')
    const [isPending,startTransition]=useTransition()
    const [addcate,setAddcate]=useState(false)
    const name_display=choice?data.find(item=>item.value==choice).name:'Vui lòng chọn'
    const listchoice=useMemo(()=>{
       return keyword?data.filter(item=>item.name.indexOf(keyword)!==-1 || item.name.indexOf(keyword[0].toUpperCase() + keyword.slice(1))!==-1):data
    },[keyword])
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])
    const handleClick=(event)=>{
        const { target } = event
        if(parent.current){
            if (!parent.current.contains(target)){
                setShow(false)
            }
        }
    }
    
    const setchoiceitem=(itemchoice)=>{
        setchoice(itemchoice.value)
        setShow(false)
        setKeyword('')
    }
    const searchitem=(e)=>{
        const value=e.target.value
        startTransition(() => {
        // Transition: Show the results
            setKeyword(value);
           
        });
    }
    return(
        <Dropcontent ref={parent} className="dropdown">
            <div className="selector item-space selector--large" onClick={()=>setShow(!show)}>
                <div className="selector__inner line-clamp--1">{name_display}</div>
                <div className={`selector__suffix ${show?'is-show':''}`}>
                    <i class="selector__suffix-icon icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                    </i>
                </div>
            </div>
            {show &&(
            <Dropdown className="popper">
                {showsearch &&(
                <div className="select__filter"> 
                    <Contentinput>
                        <div class="input__prefix">
                            <i class="input__prefix-icon icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.99383468,0.993751221 C10.3075432,0.993751221 12.9938347,3.68004272 12.9938347,6.99375122 C12.9938347,8.46891634 12.4614742,9.81974201 11.5783922,10.8645893 L14.8572322,14.1431825 C15.0524943,14.3384447 15.0524943,14.6550272 14.8572322,14.8502893 C14.6836658,15.0238557 14.4142414,15.0431408 14.2193733,14.9081448 L14.1501254,14.8502893 L10.8716694,11.5723862 C9.82585916,12.45901 8.47229467,12.9937512 6.99383468,12.9937512 C3.68012618,12.9937512 0.993834675,10.3074597 0.993834675,6.99375122 C0.993834675,3.68004272 3.68012618,0.993751221 6.99383468,0.993751221 Z M6.99383468,1.99375122 C4.23241093,1.99375122 1.99383468,4.23232747 1.99383468,6.99375122 C1.99383468,9.75517497 4.23241093,11.9937512 6.99383468,11.9937512 C9.75525842,11.9937512 11.9938347,9.75517497 11.9938347,6.99375122 C11.9938347,4.23232747 9.75525842,1.99375122 6.99383468,1.99375122 Z"></path></svg>
                            </i>
                        </div>
                        <input onChange={(e)=>searchitem(e)} type="text" value={keyword} placeholder="Nhập vào" clearable="true" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" class="input__input"/>
                        <div class="input__suffix">
                            <i class="input__clear-btn icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                            </i>
                        </div>
                    </Contentinput>
                </div>)}
                <div className="scrollbar__wrapper">
                    <div className="select__menu shopee-select__menu_no_top_radius" style={{maxHeight: '258px'}}>
                    
                    <Selectoptions>
                    {isPending && <p>Updating List...</p>}
                        {listchoice.map(item=>
                            <div className={`option ${item.value==choice?'selected':''}`} onClick={()=>setchoiceitem(item)} key={item.name}>{item.name}</div>
                        )}
                    </Selectoptions>
                    </div>
                </div>
                {addproperties && (
                <div className="option-add">
                    {!addcate?
                    <div onClick={(e)=>{
                        e.stopPropagation()
                       
                        setAddcate(true)}} class="option-add__text">
                        <i class="add-icon icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.48176704,1.5 C8.75790942,1.5 8.98176704,1.72385763 8.98176704,2 L8.981,7.997 L15,7.99797574 C15.2761424,7.99797574 15.5,8.22183336 15.5,8.49797574 C15.5,8.77411811 15.2761424,8.99797574 15,8.99797574 L8.981,8.997 L8.98176704,15 C8.98176704,15.2761424 8.75790942,15.5 8.48176704,15.5 C8.20562467,15.5 7.98176704,15.2761424 7.98176704,15 L7.981,8.997 L2,8.99797574 C1.72385763,8.99797574 1.5,8.77411811 1.5,8.49797574 C1.5,8.22183336 1.72385763,7.99797574 2,7.99797574 L7.981,7.997 L7.98176704,2 C7.98176704,1.72385763 8.20562467,1.5 8.48176704,1.5 Z"></path></svg>
                        </i> 
                        <span class="label">Thêm thuộc tính mới</span>
                    </div>:
                    <div class="option-add__input">
                        <div class="input input listing-unit-input-input">
                            <div class="input__inner input__inner--small">
                                <input onChange={(e)=>{

                                    setValue(e.target.value)}} value={value} type="text" placeholder="Nhập vào" size="small" resize="vertical" rows="2" minrows="2" maxlength="40" restrictiontype="input" max="Infinity" min="-Infinity" class="input__input"/> 
                            </div>
                        </div> 
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            
                            setAddcate(false)}} type="button" disabled={value?false:true} class={`button--normal ${value?'':'disabled'} option-add__add-confirm-icon`}>
                            <i class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.03033009,7.46966991 C3.73743687,7.1767767 3.26256313,7.1767767 2.96966991,7.46966991 C2.6767767,7.76256313 2.6767767,8.23743687 2.96966991,8.53033009 L6.32804531,11.8887055 C6.62093853,12.1815987 7.09581226,12.1815987 7.38870548,11.8887055 L13.2506629,6.02674809 C13.5435561,5.73385487 13.5435561,5.25898114 13.2506629,4.96608792 C12.9577697,4.6731947 12.4828959,4.6731947 12.1900027,4.96608792 L6.8583754,10.2977152 L4.03033009,7.46966991 Z"></path></svg>
                            </i>
                        </button> 
                        <button onClick={(e)=>{
                            e.stopPropagation()
                            setAddcate(false)
                            }} type="button" class="button--normal option-add__add-close-icon">
                            <i class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></path></svg>
                            </i>
                        </button>
                    </div>}
                </div>)}
            </Dropdown>)}
        </Dropcontent>
    )
}
export default Dropmenu