
import {Link,useNavigate,useParams} from 'react-router-dom'
import React, {useState, useEffect,useCallback,useRef,useMemo} from 'react'
import ReactDOM, { render } from 'react-dom'
import {dataURLtoFile,generateString, groupBy,formatter} from "../constants"
import Cropper from 'react-cropper'; 
import {updateimageURL,newproductURL, createvariationURL, detailproductURL,} from "../urls"
import axios from 'axios';
import 'cropperjs/dist/cropper.css';
import styled from "styled-components"
import { v4 as uuid } from 'uuid';
import { headers } from '../actions/auth';





const ContentLeft=styled.div`
display:flex;
flex-direction:column
`
const ContentRight=styled.div`
display:flex;
flex:1;
flex-direction:column
`
const Bodytable=styled.div`
flex:1;
display:flex;
flex-direction:column
`
const Flexcol=styled.div`
display:flex;
flex:1;
flex-direction:column;

`
const Variationcontent=styled(Flexcol)`
    border-left:1px solid #ebebeb;
  border-top:1px solid #ebebeb;
`

const Secondclassify=styled.div`
border-bottom:1px solid #ebebeb;
align-items:center;
display:flex;
justify-content:center;
flex:1;
&.variation-cell:last-child{
    border-bottom-width:0
}
`
const Variation=styled.div`
display:flex;
flex:1;
.product-edit-form-item{
    padding:8px;
    align-items:center;
    border:1px solid #ebebeb;
    flex:1;
    display:flex;
    justify-content:center;
    border-bottom-width:0;
    border-right-width:0
}
.product-edit-form-item-content{
    border:1px solid #ebebeb;
    height:32px;
    border-radius:6px
}
.input-content{
    height:100%;
    display:flex;
    padding:4px;
    align-items:center;
}
.textarea__edit{
    height:100%;
    padding:4px
}
.dot{
    height:20px;
    padding-right:4px;
    line-height:14px;
    margin-right:4px;
    border-right:1px solid #ebebeb
}
`
const price_ship={
    'Nhanh':[{weight_from:1,weight_to:500,price:16300},{weight_from:501,weight_to:1000,price:18300},
        {weight_from:1001,weight_to:1500,price:19300},{weight_from:1501,weight_to:2000,price:20100},
        {weight_from:1501,weight_to:2000,price:21100},
        {weight_from:2001,weight_to:40000,price:26100}
    ],
    'Tiết kiệm':[{weight_from:1,weight_to:500,price:14300},{weight_from:501,weight_to:1000,price:16300},
        {weight_from:1001,weight_to:1500,price:18300},{weight_from:1501,weight_to:2000,price:19100},
        {weight_from:1501,weight_to:2000,price:20100},
        {weight_from:2001,weight_to:40000,price:24400}
    ],
    'Hỏa tốc':[{weight_from:1,weight_to:500,price:18300},{weight_from:501,weight_to:1000,price:20300},
        {weight_from:1001,weight_to:1500,price:24300},{weight_from:1501,weight_to:2000,price:26100},
        {weight_from:2001,weight_to:40000,price:32400}
        
    ]
}

const detail=[{id:1,
    brand:[
        {value:'1',name:'No brand'},
        {value:'2',name:'AAA JEANS'},
        {value:'3',name:'ADAM STORE'},
        {value:'4',name:'ADDICTED'},
        {value:'5',name:'AFS Jeep'},
        {value:'6',name:'AGUYN'},
        {value:'7',name:'AIRism'},
        {value:'8',name:'AKUBA'},
        {value:'9',name:'AKYOO'},
        {value:'10',name:'ALEGO'},
        {value:'11',name:'ALIEN SPORTS'},
        {value:'12',name:'ALIGRO'},
        {value:'13',name:'ALOHA'},
        {value:'14',name:'AMANDA'},
        {value:'15',name:'AMANO'},
        {value:'16',name:'AMERICAN RAG'},
        {value:'17',name:'AMERICUS'},
        {value:'18',name:'AMIRI'},
        {value:'19',name:'AMIRO'},
        {value:'20',name:'ANDREW CHRISTIAN'},
        {value:'21',name:'ANH THO LEATHER'},
        {value:'22',name:'ANN CHERY'},
        {value:'23',name:'ANTELO'},
        {value:'24',name:'ARENO'},
        {value:'25',name:'ASRV'},
        {value:'26',name:'ATS'},
        {value:'27',name:'AVIANO'},
        {value:'28',name:'Alan Walker'},
        {value:'29',name:'Alpha'},
        {value:'30',name:'Alpha Industries'},
    ],
    material_clothes:[
        'chiffon',
        'chinese',
        'Cotton',
        'Denim',
        'Feather',
        'Felt',
        'Thin felt',
        'Fleece',
        'hair',
        'foot',
        'knit',
        'Ren',
        'Gives',
        'Linen',
        'Nylon',
        'Is different',
        'cotton',
        'Silk',
        'Synthetic',
        'Textile yarn',
        'Velvet',
        'Len',
    ], 
    pants_length:[
        "3/4  long",
        "Cut the bear",
        "Full length",
        "Is different",
        ],
    waist_version:[
        "Middle of the waist",
        "Low version",
        "Is different",
        "Large version",
        ],
    style:['sport'],
    pants_buckle_type:['Nút','Khóa kéo'],
    origin:[
        'Bangladesh',	
        'China',	
        'India',	
        'Indonesia',	
        'Japan',	
        'South Korea',	
        'Is different',	
        'Taiwan',	
        'Thailand',	
        'America',	
        'Vietnam', 
        ],
    pants_style:[
         'Khác',	
        'Thường',	
        'Skinny',	
        'Slim Fit',	
        'Đứng',	
        'Tapered',	
        'Ống rộng',	
        ],
    pants_style_women:[
        'Boyfriend',	
        'Medium and wide',	
        'Is different',	
        'Often',	
        'Skinny',	
        'Slim Fit',	
        'Stand',	
        'Tapered',	
        'Wide tube',	
        ],
    partener:[
        'Họa tiết',	
        'Sọc caro',	
        'Hoa',	
        'Khác',	
        'Trơn',	
        'Chấm bi',	
        'In',	
        ],
    Waist_version:[
        'Large version',	
        'Low version',	
        'Middle of the waist',	
        'Is different',	
        ],
    sample:['plaslid'],
    clothes_occasion:['Daily',],
    season:['Winter','Summer','Spring','Fall'],   
    clothes_collar:[
        'Boat neck',
        'Shirt collar',
        'Wire',
        'Late shoulder',
        'Is different',
        'Round neck',
        'Bottle neck',
    ],
    shirt_length:['long','regular'],
    sleeve_lenght:[
        '3/4',	
        'Long sleeve',	
        'Is different',	
        'Short hand',	
        'No hands',	
        ],
    skirt_length:['Maxi','Midi','Mini'],
    dress_style:[
        'skirt letter a',	
        'tight skirt',
        'Long fishtail skirt',
        'flared skirt',	
        'Is different',	
        'Pencil skirt',	
        'pleated skirt',	
        ]
},{
    id:260,
    brand:[ 
    {name:'SPACERAIL'},
    {name:'TITANER'},
    {name:'Penguin Trap'},
    {name:'SPIN MASTER'},
    {name:'TOHNICHI'},
    {name:'TOKADO'},
    {name:'STARIDER'},
    {name:'Laiersi'},
    {name:'Richpro'},
    {name:'TONY'},
    {name:'Rico'},
    {name:'Vietoys'},
    {name:'Rikagaku'},
    ],
    'Warranty Type':[
        'International warranty',
        'Manufacturers Warranty',
        'Supplier Warranty',
        'No warranty',
    ],
    
}]

const ProductDetail=({form,list_choice,data_item,list_buymore,shipping_shop,setshow,loading,
    listmedia,list_variation,shipping_item,category_choice})=>{
    const [state,setState]=useState({imageDestination: "",preview:false,order_before:true,
    classify1:'',classify2:'',variations:[],preview_video:false,play:false,list_media:[],shipping_item:[],
    choice_yes_no:[{name:'Yes',value:true},{name:'No',value:false}]})
    const videoref=useRef();
    const [detail,setDetail]=useState({brand:'No brand'})
    const {id}=useParams()
    const [buymore,setBuymore]=useState([])
    const [shipping,setShipping]=useState(null)
    const [data,setData]=useState()
    const [formData,setformData]=useState({name:'',description:'',height:'',length:'',weight:'',price:'',inventory:'',sku_classify:'',width:''})
    const [previewimage, setPreviewimage] = useState({zoom:0.5,rotate:0,scaleX:1,scaleY:1});
    const [filechoice,setFilechoice]=useState()
    const [cropper, setCropper] = useState()
    const nagative=useNavigate();
    const cropperRef = useRef(null);
    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
    useEffect(()=>{
        if(filechoice!=null){
        cropperRef.current.cropper.rotate(previewimage.rotate)
        cropperRef.current.cropper.scaleX(previewimage.scaleX)
        cropperRef.current.cropper.scaleY(previewimage.scaleY)
        }
    },[previewimage])
    
    useEffect(()=>{
        if(loading){
        setformData(form)
        setShipping(shipping_shop)
        setData(data_item)
        const classify1=data_item.list_color.length>0?data_item.list_color[0].name:''
        const classify2=data_item.list_size.length>0?data_item.list_size[0].name:''
        setBuymore(list_buymore)
        setState({...state,variations:list_variation,list_media:listmedia,shipping_item:shipping_item,classify1:classify1,classify2:classify2,list_color:data_item.list_color,list_size:data_item.list_size})
    }
    },[loading,form,list_variation,data_item,listmedia,shipping_item,list_buymore])

    const setclick=(e)=>{
        let inputfile=e.currentTarget.querySelector('input')
        if(inputfile!=null){
        inputfile.click()
        }
    }
    const {list_media}=state
    const filepreview=(i,media,name,value,filetype)=>{
        return(
            <div key={media.id} className="image-manager__item cover-item">
                <div className="popover-wrap">
                    <div className="image-manager__content">
                        <div onClick={(e)=>setclick(e)} className={`${!media.file?'image-manager__upload':''}`}>
                            {media.file?
                                <> 
                                <img className="image-manager__image" src={media.file_preview||media.file} />
                                {media.filetype=='video'?<div className='video-duration'>00:{('0'+Math.round(media.duration)).slice(-2)}</div>:''}
                                <div className="image-manager__tools">
                                    {!media.file_preview?
                                    <span onClick={()=>previewitem(media,name,value)} className="image-manager__icon image-manager__icon--crop">
                                        <i className="icon" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M29.9 26.2h-2.8V7.9l3.2-3.2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.1 3.1H7.7V4c0-.6-.4-1-1-1s-1 .4-1 1v2.4H2.9c-.6 0-1 .4-1 1s.4 1 1 1h2.8v18.8c0 .6.4 1 1 1h18.4v2.4c0 .6.4 1 1 1s1-.4 1-1v-2.4h2.8c.6 0 1-.4 1-1s-.4-1-1-1zM23.8 8.4L7.7 24.5V8.4h16.1zM8.9 26.2L25.1 9.9v16.3H8.9z"></path></svg>
                                        </i>
                                    </span>:
                                    <span onClick={()=>setState({...state,preview_video:true})} data-v-5cdae8e8="" className="action-tools-icon">
                                        <i data-v-5cdae8e8="" className="icon">
                                            <svg viewBox="0 0 1024 1024"><path d="M512 844c-51.5 0-102.7-7.7-152.2-22.8-47.9-14.6-94.2-36.3-137.7-64.4C137.3 702.1 63.6 622.9 9.2 527.9L.1 512l9.1-15.9c54.4-95 128-174.2 212.9-228.9 43.5-28.1 89.8-49.7 137.7-64.4C409.3 187.7 460.5 180 512 180s102.7 7.7 152.2 22.8c47.9 14.6 94.2 36.3 137.7 64.4 84.9 54.8 158.5 133.9 212.9 228.9l9.1 15.9-9.1 15.9c-54.4 95-128 174.2-212.9 228.9-43.5 28.1-89.8 49.7-137.7 64.4C614.7 836.3 563.5 844 512 844zM74.2 512c48.2 79.1 111.1 144.9 182.6 191.1 38.5 24.9 79.5 44 121.7 57 43.4 13.3 88.3 20 133.5 20s90.1-6.7 133.5-20c42.2-12.9 83.2-32.1 121.7-57 71.5-46.2 134.4-112 182.6-191.1-48.2-79.1-111.1-144.9-182.6-191.1-38.5-24.9-79.5-44-121.7-57-43.4-13.3-88.3-20-133.5-20s-90.1 6.7-133.5 20c-42.2 12.9-83.2 32.1-121.7 57-71.5 46.2-134.4 112-182.6 191.1zM512 704c-105.9 0-192-86.1-192-192s86.1-192 192-192 192 86.1 192 192-86.1 192-192 192zm0-320c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z"></path></svg>
                                        </i>
                                    </span>}
                                    <span className="decollator"></span> 
                                    <span onClick={()=>(removemedia(media,name,value))} className="image-manager__icon image-manager__icon--delete">
                                        <i className="icon" >
                                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fillRule="nonzero"><path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path><path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></path></g></svg>
                                        </i>
                                    </span>
                                </div>
                            </>:
                            <div className="upload-wrapper upload-dragger">
                                <input onChange={(e)=>previewFile(e,name,value,filetype,media)} type="file"  accept={media.filetype=='video'?'video/mp4':'image/*'} multiple className="image-video" />
                                <div className="cricle">+</div>
                            </div>}
                            
                        </div>
                    </div>
                </div>
                {name=='list_media' && (<p className="explain-text">{name=='list_color'?media.value:media.filetype=='video'?'Video':i==0?'Image cover':`Image${i}`}</p>)}
            </div>
        )
    }
    
    const setallvariation=()=>{
        const variations=state.variations.map(variation=>{
            return({...variation,price:formData.price?formData.price:variation.price,inventory:formData.inventory?formData.inventory:variation.inventory,sku_classify:formData.sku_classify?formData.sku_classify:variation.sku_classify 
            })
        })
        setState({...state,variations:variations})
    }
    
    const previewitem=(media,name,value)=>{
        setFilechoice(media)
        setState({...state,preview:true})
    }

    const removemedia=(media,name,value)=>{
        const list_medias=name=='list_color'?value.map(item=>{
            if(item.id==media.id){
                return({...item,file:null,file_preview:null})
            }
            return({...item})
        }):value.filter(item=>item.id!=media.id)
    
        setState({...state,[name]:list_medias})
    }

    const setcrooper=(name,value)=>{
        let form=new FormData()
        form.append('id',filechoice.id)
        form.append('file',dataURLtoFile(cropper.getCroppedCanvas().toDataURL("image/png"),`${generateString(14)}.png`))
        
        axios.post(updateimageURL,form,headers)
        .then(res => {
            const list_medias=value.map(file=>{
            if(file.id==filechoice.id){
                return({...file,file:res.data.file,file_choice:dataURLtoFile(cropper.getCroppedCanvas().toDataURL("image/png"),`${generateString(14)}.png`)})
            }
            return({...file})
            })
            
            setState({...state,preview:false,[name]:list_medias})
        })
        .catch(error => console.error('Unable to get items.', error));
    }

    const  previewFile=(e,name,value,filetype,media)=>{
        [].forEach.call(e.target.files, function(file) {
            let form =new FormData()
            let time=0
            form.append('file',file)
            let duration=0
            if(file.type.match('video.*')){
                time=600
                var url = (window.URL || window.webkitURL).createObjectURL(file);
                var video = document.createElement('video');
                var timeupdate = function() {
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                    video.pause();
                }
                };
                video.addEventListener('loadeddata', e =>{
                    e.stopImmediatePropagation()
                    e.preventDefault()
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                }
                });
                let snapImage = function() {
                duration=video.duration
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                let image = canvas.toDataURL("image/png");
                let file_preview = dataURLtoFile(image,`${generateString(14)}.png`);
                let success = image.length > 100000;
                if (success){
                    form.append('file_preview',file_preview)
                    form.append('duration',duration)
                    URL.revokeObjectURL(url);
                    }
                    return success
                }
                
                video.addEventListener('timeupdate', timeupdate);
                video.preload = 'metadata';
                video.src = url;
                // Load video in Safari / IE11
                video.muted = true;
                video.playsInline = true;
                video.play();
            }
            setTimeout(function() {
            axios.post(updateimageURL,form,headers)
            .then(res => {
                const list_medias=media?value.map(item=>{
                    if(item.id==media.id){
                    return({filetype,...item,...res.data,id:media.id,file_choice:file})
                    }
                    return({...item})
                }):[...value,{...res.data,filetype}]
                setState({...state,[name]:list_medias})  
                
            })
            .catch(error => console.error('Unable to get items.', error));
            },time)
        })
    }
    

    const addcolor=()=>{
        const itemchoice={id:small_id,value:'',file:null,file_preview:null,duration:0,filetype:'image',error:false}
        const list_color=[...state.list_color,itemchoice]
        const addvariation=state.list_size.length>0?state.list_size.reduce((arr,obj)=>{
            return [...arr,{variation_id:obj.id+small_id,...obj,size_value:obj.value,size_id:obj.id,...itemchoice,color_value:itemchoice.value,color_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        },[]):[{variation_id:small_id,...itemchoice,color_value:itemchoice.value,color_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        const datavariations=[...state.variations,...addvariation]
        setState({...state,variations:datavariations,list_color:list_color})
    }

    const removecolor=(colorchoice)=>{
        const list_color=state.list_color.filter(color=>color.id!=colorchoice.id)
        const variations=state.variations.filter(variation=>variation.color_id!=colorchoice.id)
        setState({...state,variations:variations,list_color:list_color})
    }
    
    const setvaluecolor=(e,colorchoice)=>{
        const error=state.list_color.find(item=>item.value.trim()==e.target.value.trim())
        const list_color=state.list_color.map((color,index)=>{
            if(colorchoice.id==color.id){
                if(state.list_color.some(item=>item.value==e.target.value.trim())){
                    return({...color,value:e.target.value,error:true})
                }
                return({...color,value:e.target.value,error:false})
            }
            else{
                if(error==undefined){
                    return({...color,error:false})
                }
                    return({...color})
                }
        })
        
        const variations=state.variations.map(item=>{
            if(colorchoice.id==item.color_id){
                return({...item,color_value:e.target.value})
            }
            return({...item})
        })
        setState({...state,variations:variations,list_color:list_color})
        
    }

    const setvariation=(e,name,itemchoice)=>{
        const variations=state.variations.map(item=>{
            if(item.variation_id==itemchoice.variation_id){ 
                return({...item,[name]:e.target.value})    
            }
            return({...item})
        })
        setState({...state,variations:variations})
    }

    const setvaluesize=(e,sizechoice)=>{
        const error=state.list_size.find(item=>item.value.trim()==e.target.value.trim())
        const list_size=state.list_size.map(size=>{
            if(sizechoice.id==size.id){
                if(state.list_size.some(item=>item.value==e.target.value.trim())){
                    return({...size,value:e.target.value,error:true})
                }
                return({...size,value:e.target.value,error:false})
            }
            else{
            if(error==undefined){
                return({...size,error:false})
            }
                return({...size})
            }
        })
      
        const variations=state.variations.map((variation,index)=>{
                if(variation.size_id==sizechoice.id){
                    return({...variation,size_value:e.target.value})
                }
                return({...variation})
            })
        setState({...state,variations:variations,list_size:list_size})
    }

    const addsize=()=>{
        const itemchoice={value:'',id:small_id}
        const list_size=[...state.list_size,itemchoice]
        const addvariation=state.list_color.reduce((arr,obj)=>{
            return [...arr,{variation_id:obj.id+small_id,...obj,color_value:obj.value,color_id:obj.id,...itemchoice,size_value:itemchoice.value,size_id:itemchoice.id,sku_classify:'',price:null,inventory:0}]
        },[])
        const datavariations=state.list_size.length>0?[...state.variations,...addvariation]:state.variations.map(item=>{
            return({...item,size_value:'',size_id:small_id})
        })
        setState({...state,variations:datavariations,list_size:list_size})
    }

    console.log(state.variations)
    const setremove=()=>{
        if(state.list_size.length>0){
            const variations=state.variations.reduce((arr,obj)=>{
                const color_id=obj['color_id']
                if(arr.every(item=>item.color_id!=color_id)){
                    return [...arr,{...obj,size_id:null,size_value:''}]
                }
                return arr
            },[])
            setState({...state,list_size:[],variations:variations})
        }
        else{
            setState({...state,list_color:[],variations:[]}) 
        }
    }

    const removesize=(sizechoice)=>{
        const list_size=state.list_size.filter((size,i)=>size.id!=sizechoice.id)
       
        const variations=state.variations.filter(item=>item.size_id!=sizechoice.id)
        
        setState({...state,variations:variations,list_size:list_size})
    }

    const setbuymore=(e,itemchoice,name)=>{
        const list_buymores=buymore.map((item,index)=>{
            if(item.id==itemchoice.id){
                return({...item,[name]:e.target.value})
            }
            return({...item})
        })
        setBuymore(list_buymores)
    }

    const addbuymore=()=>{
        const buymoreadd={id:small_id,from_quantity:buymore.length>0?buymore[buymore.length-1].to_quantity+1:buymore.length+1,to_quantity:'',price:''}
        setBuymore([...buymore,buymoreadd])
    }

    const removebymore=(itemchoice)=>{
        const list_buymores=buymore.filter(item=>item.id!=itemchoice.id)
        setBuymore(list_buymores)
    }
    
    const setshipping=(key)=>{
        const shipping_item=state.shipping_item.map(item=>{
            if(item.method==key){
                return({...item,enable:!item.enable})
            }
            return({...item})
        })
        setState({...state,shipping_item:shipping_item})
    }

    const setvideoplay=()=>{
        setState({...state,play:false})
        if (videoref.current.paused) {
            videoref.current.play(); 
            setState({...state,play:true})
        }  
    }
    const [choice,setChoice]=useState('basic')
    
    const variationinfo=(item)=>{
        return(
            <Variation>
                <div data-v-a3311712="" className="product-edit-form-item">
                    <div className="product-edit-form-item-content">
                        <div className="input-content">
                            <div className="dot">
                                ₫
                            </div> 
                            <input onChange={(e)=>setvariation(e,'price',item)} value={isNaN(item.price)?'':item.price} type="text" placeholder="Nhập vào" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                        </div>
                        {isNaN(item.price)&& item.price!=null || item.price<1000 && item.price!=null?<div data-v-a3311712="" className="product-edit-form-item-error">{isNaN(item.price)?'Không được để trống ô':'giá lớn hơn 1000'}</div> :''}
                    </div>
                </div>      
                <div data-v-a3311712="" className="product-edit-form-item">
                    <div data-v-a3311712="" className="product-edit-form-item-content">
                        <div className="input-content"> 
                            <input onChange={(e)=>setvariation(e,'inventory',item)} value={isNaN(item.inventory)?'':item.inventory} type="text" placeholder="Nhập vào" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                        </div>
                        {isNaN(item.inventory) && item.inventory!=null?<div data-v-a3311712="" className="product-edit-form-item-error">Không được để trống ô</div> :''}
                    </div>
                </div>
                <div data-v-a3311712="" data-v-43ff970a="" data-v-3cc60ed8="" className="product-edit-form-item"   data-v-4d4bd544="">
                    <div data-v-a3311712="" className="product-edit-form-item-content">
                        <div data-v-024543a4="" className="textarea__edit">
                            <textarea onChange={(e)=>setvariation(e,'sku_classify',item)} value={item.sku_classify} type="textarea" placeholder="Nhập vào" resize="none" rows="2" minrows="1" maxlength="20" restrictiontype="input" className="input__inner input__inner--normal    item-center" style={{resize: 'none', minHeight: '22px', height: '22px', transition: 'all 200ms ease 0s'}}></textarea>
                        </div>  
                    </div>
                </div>
            </Variation>  
        )
    }
    
    const setdelivery=(name,e)=>{
        if(!isNaN(e.target.value) && parseInt(e.target.value)<=40000){
        setformData({...formData,[name]:e.target.value})
        }
        else{
            setformData({...formData,[name]:null})
        }
    }

    

    const price=useMemo(()=>{
        const price_valid=state.variations.every(item=>item.price)
        if(state.variations.length>0 && price_valid){
          return state.variations.reduce((total,obj)=>{
            return (total+obj.price)/state.variations.length
          },0)
        }
      },[state.variations])

    const price_equal=state.variations.every((item,index,arr)=>item.price && arr.length>0 && item.price==arr[0].price)
    const valid_buymore=buymore.every(item=>item.price && price>item.price && item.from_quantity>1)
    const listitems=useMemo(()=>{return buymore.reduce((arr,obj)=>{
        const item=[obj['from_quantity'],obj['to_quantity']]
            return [...arr,...item]
        },[])
    },[buymore])

    const isAscending=listitems.filter((item,i)=>item>=listitems[i+1]).length==0
    const valid_sale=state.variations.every(item=>item.price && item.inventory)
    const valid_media=state.list_media.length>0
    const valid_delivery=state.shipping_item.find(item=>item.enable)

    const shippings=state.shipping_item.filter(item=>item.enable).map(item=>item.method)
    const submit= async ()=>{
        let form=new FormData()
        const colors_update=state.list_color.filter(item=>!isNaN(item.id))
        const colors_create=state.list_color.filter(item=>isNaN(item.id))
        if(state.list_color.length>0){
            form.append('color_name',state.classify1)
            colors_create.map(color=>{
                form.append('value',color.value)
                form.append('image',color.file_choice)
            })
            colors_update.map(color=>{
                form.append('color_id',color.id)
                form.append('value_update',color.value)
                form.append('image_update',color.file_choice)
            })
        }
        if(state.list_size.length>0){
            form.append('size_name',state.classify2)
            
        }
        form.append('sizes',JSON.stringify(state.list_size))
        const res=await axios.post(createvariationURL,form,headers)
        
        const files=list_media.map(item=>item.id)
        const buymorediscounts_remain=buymore.filter(item=>!isNaN(item.id)).map(item=>item.id)
        const variations=state.variations.length>0?state.variations.map(variation=>{
            return({...variation,color_id:res.data.colors.find(color=>color.value==variation.color_value)?res.data.colors.find(color=>color.value==variation.color_value).id:null,size_id:res.data.sizes.find(size=>size.value==variation.size_value)?res.data.sizes.find(size=>size.value==variation.size_value).id:null})
        }):[{color_id:null,size_id:null,price:formData,sku_classify:formData.sku_classify,inventory:formData.inventory}]
        const variations_remain=variations.filter(item=>!isNaN(item.variation_id)).map(item=>item.variation_id)
        const formdata={action:'update',variations_remain:variations_remain,buymorediscounts_remain:buymorediscounts_remain,
        variations:variations,files:files,buymorediscounts:buymore,category_id:category_choice.id,method:shippings,...detail,...formData}
        const url=id?detailproductURL+id:newproductURL      
        const res1 =await axios.post(url,JSON.stringify(formdata),headers)
        
        nagative('/vendor/marketing')
       
    }

    const inputvideoref=useRef()
    const inputimageref=useRef()

    const addvideo=()=>{
        inputvideoref.current.click()
    }

    const addimage=()=>{
        inputimageref.current.click()
    }

    const variations_display=state.variations
    const inforef=useRef()
    const detailref=useRef()
    const deliveryref=useRef()
    const saleref=useRef()
    const moreref=useRef()
    const listitem=useMemo(()=>{
        return [{name:'Thông tin cơ bản',value:'basic',ref:inforef},
        {name:'Thông tin chi tiết',value:'detail',ref:detailref},
        {name:'Thông tin bán hàng',value:'sale',ref:saleref},
        {name:'Vận chuyển',value:'delivery',ref:deliveryref},
        {name:'Thông tin khác',value:'more',ref:moreref},
    ]
    })
    
    return(
            <div className="product-edit">
                {data?
                <div className="product-edit__container">
                    <div className="product-info product-edit__main">
                        <section ref={inforef} className="product-edit__section" id="info-basic">
                            <h2 className="title">Basic information</h2>
                            <div className="image_upload item_start">
                                <div data-v-bf2303c8="" className="edit-label edit-title">
                                    <span data-v-bf2303c8="">Hình ảnh sản phẩm</span>
                                </div>
                                <div className="edit-main image-manager">
                                    <div className="flex-container">
                                        {list_media.map((media,i)=>{
                                            if(media.filetype=='image'){
                                                return(
                                                    filepreview(i,media,'list_media',list_media,'image')
                                                )
                                            }
                                        })}
                                        {listmedia.filter(media=>media.filetype=='image').length<9?
                                        <div onClick={addimage} data-v-c6ad3890="" class="image-manager__itembox">
                                            <div data-v-c6ad3890="" class="image-manager__content">
                                                <div data-v-c6ad3890="" class="image-manager__upload">
                                                    <div data-v-935b62e2="" data-v-c6ad3890="" class="file-upload" accept="image/*">
                                                        <div data-v-935b62e2="" class="upload" aspect="1">
                                                            <div class="upload-wrapper upload-dragger">
                                                                <input ref={inputimageref} onChange={(e)=>previewFile(e,'list_media',list_media,'image')} type="file" name="file" accept="image/*" multiple="multiple" aspect="1" class="upload__input"/> 
                                                                <div data-v-c6ad3890="" class="image-manager__upload__content">
                                                                    <div data-v-c6ad3890="" class="image-manager__upload__content__icon">
                                                                        <i data-v-c6ad3890="" class="icon">
                                                                            <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 0A1.5 1.5 0 0 1 20 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 0 1 .958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 0 1 .96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0 0 14.053 18H2a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 2 0h16.5z"></path><path d="M6.5 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM18.5 14.25a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5H20v2.25a.75.75 0 0 1-1.5 0V18h-2.25a.75.75 0 0 1 0-1.5h2.25v-2.25z"></path></svg>
                                                                        </i>
                                                                    </div> 
                                                                    <div data-v-c6ad3890="" class="image-manager__upload__content__text">Thêm hình ảnh({9-list_media.filter(media=>media.filetype=='image').length}/9)</div>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>:''}
                                    </div>
                                    <div data-v-15e71864="" data-v-e5240212="" className="image-cropper-modal" close-inside="">
                                        <div className="modal__mask" style={{zIndex: 1000014, display: `${state.preview?'':'none'}`}}>
                                            <div className="modal__container">
                                                <div className="modal__box" style={{display: `${state.preview?'':'none'}`}}>
                                                    <div className="modal__content modal__content--normal">
                                                        <div className="modal__header">
                                                            <div data-v-15e71864="" className="image-cropper-header">Chỉnh sửa hình ảnh sản phẩm</div>
                                                        </div> 
                                                        <div className="modal__body over-height" style={{position: 'relative'}}>
                                                            {filechoice!=null?
                                                            <div data-v-15e71864="" className="image-cropper-content">
                                                                <div data-v-15e71864="" className="panel-left">
                                                                    <Cropper
                                                                        data-v-15e71864
                                                                        className="image-container"
                                                                        ref={cropperRef}
                                                                        preview=".preview-image"
                                                                        src={filechoice.file}
                                                                        zoomTo={previewimage.zoom}
                                                                        initialAspectRatio={1}
                                                                        viewMode={1}
                                                                        minCropBoxHeight={10}
                                                                        minCropBoxWidth={10}
                                                                        background={false}
                                                                        responsive={true}
                                                                        autoCropArea={1}
                                                                        onInitialized={(instance) => {
                                                                            setCropper(instance);
                                                                        }}
                                                                    />
                                                                    
                                                                    <div data-v-15e71864="" className="actions-bar">
                                                                        <div data-v-15e71864="" className="actions-left">
                                                                            <div data-v-15e71864="" className="zoom">
                                                                                <div data-v-15e71864="" className="tooltip tooltip popover popover--dark">
                                                                                    <div className="popover__ref">
                                                                                        <div data-v-15e71864="" className={`icon ${previewimage.zoom<0.4?'disable':''}`}>
                                                                                            <i onClick={()=>setPreviewimage({...previewimage,zoom:previewimage.zoom*0.85})} data-v-15e71864="" className="icon-zoom icon">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2.307 13.448a7.878 7.878 0 1 1 11.525-.412l2.003 2.003a.563.563 0 1 1-.796.796l-2.003-2.003a7.878 7.878 0 0 1-10.729-.384zm10.675-1.15a6.753 6.753 0 1 0-.684.684l.366-.318.318-.366zM5.064 7.315h5.627a.563.563 0 0 1 0 1.125H5.064a.563.563 0 1 1 0-1.125z"></path></svg>
                                                                                            </i>
                                                                                        </div>
                                                                                    </div> 
                                                                                    <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                                            <div className="popover__content">Thu nhỏ</div>
                                                                                        </div>
                                                                                    </div> 
                                                                                    <div data-v-15e71864="" className="tooltip tooltip popover popover--dark">
                                                                                        <div className="popover__ref">
                                                                                            <div data-v-15e71864="" className={`icon ${previewimage.zoom>1.5?'disable':''}`}>
                                                                                                <i onClick={()=>setPreviewimage({...previewimage,zoom:previewimage.zoom*1.15})} data-v-15e71864="" className="icon-zoom icon">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2.307 13.448a7.878 7.878 0 1 1 11.525-.412l2.003 2.003a.563.563 0 1 1-.796.796l-2.003-2.003a7.878 7.878 0 0 1-10.729-.384zm10.675-1.15a6.753 6.753 0 1 0-.684.684l.366-.318.318-.366zM7.315 7.315v-2.25a.563.563 0 0 1 1.125 0v2.25h2.251a.563.563 0 0 1 0 1.125h-2.25v2.251a.563.563 0 0 1-1.126 0v-2.25h-2.25a.563.563 0 1 1 0-1.126h2.25z"></path></svg>
                                                                                                </i>
                                                                                            </div>
                                                                                        </div> 
                                                                                        <div className="popper popover__popper popover__popper--dark tooltip__popper" style={{display: 'none', maxWidth: '280px'}}>
                                                                                            <div className="popover__content">Phóng to</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> 
                                                                                <div data-v-15e71864="" className="tooltip tooltip popover popover--dark">
                                                                                    <div className="popover__ref">
                                                                                        <div data-v-15e71864="" className="icon">
                                                                                            <i onClick={()=>setPreviewimage({...previewimage,rotate:90})} data-v-15e71864="" className="icon-others icon">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 17"><path fillRule="nonzero" d="M5 7h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5zm3.127-5.52l-.715-.652a.5.5 0 0 1 .674-.739l1.666 1.52a.5.5 0 0 1-.015.752l-1.666 1.4a.5.5 0 1 1-.644-.765l.616-.517c-3.988-.047-6.21 1.48-6.828 4.618a.5.5 0 0 1-.981-.194C.957 4.231 3.643 2.411 8.127 2.48z"></path></svg>
                                                                                            </i>
                                                                                        </div>
                                                                                    </div> 
                                                                                </div> 
                                                                                <div data-v-15e71864="" className="tooltip tooltip popover popover--dark">
                                                                                    <div className="popover__ref">
                                                                                    <div data-v-15e71864="" className="icon">
                                                                                        <i onClick={()=>setPreviewimage({...previewimage,scaleX:-previewimage.scaleX})} data-v-15e71864="" className="icon-others icon">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14"><path d="M9.379.758l6.476 12.953a.2.2 0 0 1-.179.289H9V.847a.2.2 0 0 1 .379-.09zm-2.758 0A.2.2 0 0 1 7 .848V14H.324a.2.2 0 0 1-.18-.29L6.622.759zM6 4.236L1.618 13H6V4.236z" fillRule="evenodd"></path></svg>
                                                                                        </i>
                                                                                    </div>
                                                                                </div> 
                                                                            </div> 
                                                                            <div data-v-15e71864="" className="tooltip tooltip popover popover--dark">
                                                                                <div className="popover__ref">
                                                                                    <div data-v-15e71864="" className="icon">
                                                                                        <i onClick={()=>setPreviewimage({...previewimage,scaleY:-previewimage.scaleY})} data-v-15e71864="" className="icon-others icon">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16"><path d="M13.242 9.379L.29 15.855A.2.2 0 0 1 0 15.676V9h13.153a.2.2 0 0 1 .09.379zm0-2.758a.2.2 0 0 1-.09.379H0V.324a.2.2 0 0 1 .29-.18l12.952 6.477zM9.764 6L1 1.618V6h8.764z" fillRule="evenodd"></path></svg>
                                                                                        </i>
                                                                                    </div>
                                                                                </div> 
                                                                            </div>
                                                                        </div> 
                                                                        <div data-v-15e71864="" className="actions-right">
                                                                            <button data-v-15e71864="" type="button" className="button button--small disabled" disabled="disabled">
                                                                                <span>Nhập Lại</span>
                                                                            </button>
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                                <div data-v-15e71864="" className="panel-right"> 
                                                                    <div data-v-15e71864=""  className="label label-preview ">Xem trước</div> 
                                                                    <div data-v-15e71864="" className="preview-image-container">
                                                                        <div data-v-15e71864="" className="preview-image" style={{width: '120px', height: '120px',borderRadius: '4px',overflow: 'hidden'}}>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>:''}
                                                            
                                                        </div>
                                                        <div className="resize-triggers">
                                                            <div className="expand-trigger">
                                                                <div style={{width: '593px', height: '381px'}}></div>
                                                            </div>
                                                            <div className="contract-trigger"></div>
                                                        </div>
                                                        <div className="modal__footer"> 
                                                            <div className="modal__footer-buttons">
                                                                <button onClick={()=>setState({...state,preview:false})} type="button" className="button button--normal">
                                                                    <span>Đóng</span>
                                                                </button> 
                                                                <button onClick={()=>setcrooper('list_media',state.list_media)} type="button" className="button button--primary button--normal">
                                                                    <span>Lưu</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    
                                                </div> 
                                                <i onClick={()=>setState({...state,preview:false})}  className="icon modal__close">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.85355339,1.98959236 L8.157,7.29314575 L13.4601551,1.98959236 C13.6337215,1.81602601 13.9031459,1.79674086 14.098014,1.93173691 L14.1672619,1.98959236 C14.362524,2.18485451 14.362524,2.501437 14.1672619,2.69669914 L14.1672619,2.69669914 L8.864,8.00014575 L14.1672619,13.3033009 C14.362524,13.498563 14.362524,13.8151455 14.1672619,14.0104076 C13.9719997,14.2056698 13.6554173,14.2056698 13.4601551,14.0104076 L8.157,8.70714575 L2.85355339,14.0104076 C2.67998704,14.183974 2.41056264,14.2032591 2.2156945,14.0682631 L2.14644661,14.0104076 C1.95118446,13.8151455 1.95118446,13.498563 2.14644661,13.3033009 L2.14644661,13.3033009 L7.45,8.00014575 L2.14644661,2.69669914 C1.95118446,2.501437 1.95118446,2.18485451 2.14644661,1.98959236 C2.34170876,1.79433021 2.65829124,1.79433021 2.85355339,1.98959236 Z"></path></svg>
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="image_upload item_start">
                                <div data-v-bf2303c8="" className="edit-label edit-title">
                                    <span data-v-bf2303c8="">Video sản phẩm</span>
                                </div>
                                <div className="video-manager-content">
                                    {list_media.map((media,i)=>{
                                        if(media.filetype=='video'){
                                            return(
                                                filepreview(i,media,'list_media',list_media,'video')
                                            )
                                        }
                                    })}
                                    {list_media.find(media=>media.filetype=='video')?'':
                                    <div onClick={addvideo} data-v-c6ad3890="" class="image-manager__itembox">
                                            <div data-v-c6ad3890="" class="image-manager__content">
                                                <div data-v-c6ad3890="" class="image-manager__upload">
                                                    <div data-v-935b62e2="" data-v-c6ad3890="" class="file-upload" accept="image/*">
                                                        <div data-v-935b62e2="" class="upload" aspect="1">
                                                            <div class="upload-wrapper upload-dragger">
                                                                <input onChange={(e)=>previewFile(e,'list_media',list_media,'video')} type="file" ref={inputvideoref} name="file" accept="video/mp4" simple="true" class="upload__input"/> 
                                                                <div data-v-c6ad3890="" class="image-manager__upload__content">
                                                                    <div data-v-c6ad3890="" class="image-manager__upload__content__icon">
                                                                    <i data-v-10884022="" class="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13 2a1 1 0 0 1 1 1v7.035a3.538 3.538 0 0 0-1 0V3H2v10h8.035a3.538 3.538 0 0 0 0 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h11z"></path><path d="M6 5.667c0-.481.549-.755.933-.467l3.111 2.333c.312.234.312.7 0 .934L6.934 10.8A.583.583 0 0 1 6 10.333V5.667zm7 5.833a.5.5 0 0 1 1 0V13h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V14h-1.5a.5.5 0 0 1 0-1H13v-1.5z"></path></svg>
                                                                    </i>
                                                                    </div>
                                                                </div> 
                                                                <span data-v-10884022="" class="upload-text">Thêm video</span>
                                                            
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className="remark">
                                        <p>1. Size: Up to 30Mb, resolution not exceeding 1280x1280px</p>                                           
                                        <p>2. Length: 10s-60s</p>                                               
                                        <p>3. Format: MP4 (doesn't support vp9)</p>                                            
                                        <p>4. Note: product may display while video is being processed. The video will automatically display after it has been processed successfully. </p>    
                                </div>
                                {state.preview_video?
                                <div data-v-6c83f375="" data-v-5cdae8e8="" className="video-preview">
                                    <div data-v-6c83f375="" className="video-preview-container">
                                        <div data-v-6c83f375="" className="video-container video-player">
                                            <div data-v-6c83f375="" className="preview">
                                                <video onEnded={()=>setState({...state,play:false})} ref={videoref} data-v-6c83f375="" controls preload="auto">
                                                    <source data-v-6c83f375="" src={list_media.find(file=>file.file_preview!=null).file} type="video/mp4"/>
                                                </video> 
                                                
                                            </div> 
                                            <span data-v-6c83f375="" className="process-time">00:00/00:{('0'+list_media.find(file=>file.file_preview!=null).duration).slice(-2)}</span> 
                                            <div data-v-6c83f375="" className="process-bg">
                                                <span data-v-6c83f375="" className="process-line" style={{width: '0px'}}>
                                                    <span data-v-6c83f375="" className="process-point"></span>
                                                </span>
                                            </div>
                                        </div> 
                                        <div data-v-6c83f375="" className="video-close">
                                            <i onClick={()=>setState({...state,preview_video:false})} data-v-6c83f375="" className="icon">
                                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M557.3 513l226.3-226.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 467.7 285.7 241.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 513 240.5 739.3c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L512 558.3l226.3 226.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L557.3 513z"></path></svg>
                                            </i>
                                        </div>
                                    </div>
                                </div>:''}                         
                            </div>
                            <div className="item_start mb-2">
                                <div data-v-658c8717="" className="edit-label edit-title">
                                    
                                    <span data-v-658c8717="">Name Product*</span>
                                   
                                </div>
                                <div className="edit-input edit-main">
                                    <div className="input__inner input__inner--large"> 
                                        <input type="text" className="form-select name" style={{width:'100%'}} name="name" minLength="10" maxLength="120" onChange={(e)=>setformData({...formData,name:e.target.value.trim()})} value={formData.name.trim()} id="nameproduct" placeholder="Name Product"  required/>
                                        <div className="input__suffix">
                                            <span className="input__suffix-split"></span>
                                            {formData.name.trim().length}/120
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item_start mb-2">
                                <div data-v-658c8717="" className="edit-label edit-title">
                                    <span data-v-658c8717="">*Categories</span>
                                </div>
                                <div onClick={()=>setshow(true)} className="edit-input edit-main">
                                    <div className="input__inner input__inner--large" style={{display:'flex'}}>
                                        <div className="item-center">
                                            {list_choice.filter(item=>item.id!=null).map((item,i)=> 
                                                <span data-v-188571b4="" data-v-5bb79eae="" className="cat-selected-wrapper">
                                                    <span data-v-188571b4="" data-v-5bb79eae="" className="cat-selected-item" style={{maxWidth: '250px'}}>{item.title}</span> 
                                                    <span data-v-188571b4="" style={{display:`${i==list_choice.filter(item=>item.id!=null).length-1?'none':''}`}} data-v-5bb79eae="" className="spacer-point">&gt;</span>
                                                </span>
                                            )}
                                       </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="item_start mb-2">
                                <div data-v-658c8717="" className="edit-label edit-title">
                                    
                                        <span data-v-658c8717="">*Description</span>
                                    
                                </div>
                                <div className="edit-input edit-main">
                                    <div className='product-edit-form-item-content'>
                                        <div className=""> 
                                            <textarea onChange={(e)=>setformData({...formData,description:e.target.value.trim()})} value={formData.description} type="textarea" rows="2" minrows="9" autosize="true" maxlength="Infinity"  max="Infinity" min="-Infinity" className="input__inner input__inner--normal    item-center" style={{ minHeight: '210px', height: '284px'}}></textarea>
                                        </div>
                                        <div data-v-4c2d181f="" data-v-a3311712="" className="text-area-label">
                                            <span data-v-4c2d181f="" data-v-a3311712="" className="text-area-label-pre">{formData.description.trim().length}</span>/3000
                                        </div>
                                    </div>
                                </div>
                                
                            </div>              
                            
                        </section>
                        
                        <section ref={detailref} className="product-edit__section" id="detail">                          
                            <h2 className="title">Detail information </h2>                   
                            <div className="product-specification">
                                <div data-v-194eb5f0="" className="sub-title">
                                    <span data-v-194eb5f0="" className="product-specification-complete">Hoàn thành: 0 / 13</span> 
                                    <span data-v-194eb5f0="" className="product-specification-fill-more-tip">Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm</span> 
                                    <div data-v-76a22575="" data-v-194eb5f0="" className="global-project-guide-text specification-attribute">
                                        <a href="https://banhang.shopee.vn/edu/category-guide/100047" target="_blank"> Xem hướng dẫn bổ sung thuộc tính.</a>
                                    </div>
                                </div>
                                <div className="attribute-select-list">
                                    <div className="attribute-select-list-column">
                                        <div className="attribute-select-item">
                                            <div className="grid edit-row">
                                                <div data-v-9a4c8da0="" className="edit-label edit-title">
                                                    
                                                        <div data-v-1af24323="" data-v-9a4c8da0="" className="mandatory">
                                                            <span data-v-1af24323="" className="mandatory-icon">*</span>
                                                        </div>Thương hiệu                                                       
                                                   
                                                </div>
                                                <div data-v-a3311712="" className="edit-input edit-text">
                                                    <div data-v-5bb79eae="" data-v-9a4c8da0="" className="popover-wrap attribute-text" data-v-a3311712="">
                                                        <div className="select" data-v-5bb79eae="">
                                                            <div className="dropdown select-popover" max-width="292">
                                                                <div tabIndex="0" className="selector item-space selector--large"> 
                                                                    <div className="selector__inner placeholder line-clamp--1"> Vui lòng chọn</div> 
                                                                    <div className="selector__suffix">  
                                                                        <i className="selector__suffix-icon icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                        </i>
                                                                    </div>
                                                                </div>  
                                                                <div className="popper popover adv-select-popover select-popover-content" style={{display: 'none'}}>
                                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}></ul>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="attribute-select-item">
                                            <div className="grid edit-row">
                                                <div data-v-9a4c8da0="" className="edit-label edit-title">
                                                   
                                                        <div data-v-1af24323="" data-v-9a4c8da0="" className="mandatory">
                                                            <span data-v-1af24323="" className="mandatory-icon">*</span>
                                                        </div>Thương hiệu                                                       
                                                    
                                                </div>
                                                <div data-v-a3311712="" className="edit-input edit-text">
                                                    <div data-v-5bb79eae="" data-v-9a4c8da0="" className="popover-wrap attribute-text" data-v-a3311712="">
                                                        <div className="select" data-v-5bb79eae="">
                                                            <div className="dropdown select-popover" max-width="292">
                                                                <div tabIndex="0" className="selector item-space selector--large"> 
                                                                    <div className="selector__inner placeholder line-clamp--1"> Vui lòng chọn</div> 
                                                                    <div className="selector__suffix">  
                                                                        <i className="selector__suffix-icon icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                        </i>
                                                                    </div>
                                                                </div>  
                                                                <div className="popper popover adv-select-popover select-popover-content" style={{display: 'none'}}>
                                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}>
                                                                        <div className="input select__filter">
                                                                            <div className="input__inner input__inner--normal    item-center">
                                                                                <div className="input__prefix">
                                                                                    <i className="input__prefix-icon icon">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.99383468,0.993751221 C10.3075432,0.993751221 12.9938347,3.68004272 12.9938347,6.99375122 C12.9938347,8.46891634 12.4614742,9.81974201 11.5783922,10.8645893 L14.8572322,14.1431825 C15.0524943,14.3384447 15.0524943,14.6550272 14.8572322,14.8502893 C14.6836658,15.0238557 14.4142414,15.0431408 14.2193733,14.9081448 L14.1501254,14.8502893 L10.8716694,11.5723862 C9.82585916,12.45901 8.47229467,12.9937512 6.99383468,12.9937512 C3.68012618,12.9937512 0.993834675,10.3074597 0.993834675,6.99375122 C0.993834675,3.68004272 3.68012618,0.993751221 6.99383468,0.993751221 Z M6.99383468,1.99375122 C4.23241093,1.99375122 1.99383468,4.23232747 1.99383468,6.99375122 C1.99383468,9.75517497 4.23241093,11.9937512 6.99383468,11.9937512 C9.75525842,11.9937512 11.9938347,9.75517497 11.9938347,6.99375122 C11.9938347,4.23232747 9.75525842,1.99375122 6.99383468,1.99375122 Z"></path></svg>
                                                                                    </i>
                                                                                </div> 
                                                                                <input type="text" placeholder="Nhập vào" clearable="true" resize="vertical" rows="2" minrows="2" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                <div className="input__suffix">
                                                                                    <i className="input__clear-btn icon">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M10.5924919,5.27303573 C10.4094355,5.1521972 10.1606887,5.17236516 9.99956233,5.33352414 L9.99956233,5.33352414 L8.00023568,7.33325477 L6.00047136,5.33349045 C5.81628967,5.14930876 5.51767215,5.14930876 5.33349045,5.33349045 L5.33349045,5.33349045 L5.27301564,5.40754038 C5.1522078,5.59059052 5.17239885,5.83931011 5.33355782,6.00040399 L5.33355782,6.00040399 L7.33372614,7.99976432 L5.33352414,9.99956232 L5.33352414,9.99956232 L5.27306194,10.0735738 C5.15220491,10.2566181 5.17234775,10.5053668 5.33349045,10.6665095 L5.33349045,10.6665095 L5.40750807,10.7269643 C5.5905645,10.8478028 5.83931125,10.8276348 6.00043768,10.6664759 L6.00043768,10.6664759 L8.00023568,8.66627386 L9.99959601,10.6664422 L9.99959601,10.6664422 L10.0736337,10.726932 C10.2566595,10.8477768 10.5053831,10.827636 10.6665095,10.6665095 C10.8506912,10.4823279 10.8506912,10.1837103 10.6665095,9.99952864 L10.6665095,9.99952864 L8.66674523,7.99976432 L10.6664759,6.00043767 L10.6664759,6.00043767 L10.7269381,5.92642616 C10.8477951,5.74338194 10.8276522,5.49463316 10.6665095,5.33349045 L10.6665095,5.33349045 Z"></path></svg>
                                                                                    </i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="select__menu select__menu_no_top_radius" style={{maxWidth: '290px', minWidth: '290px', maxHeight: '398px'}}>
                                                                            <div className="select__options">
                                                                                <div style={{maxHeight: '350px', overflowY: 'scroll'}}>
                                                                                    <div role="group" className="" style={{padding: '0px 0px 3500px'}}>
                                                                                        <div role="listitem" className="">
                                                                                            <div className="option">No brand</div> 
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="attribute-select-list-column">
                                        <div className="attribute-select-item">
                                            <div className="grid edit-row">
                                                <div data-v-9a4c8da0="" className="edit-label edit-title">
                                                    
                                                        <div data-v-1af24323="" data-v-9a4c8da0="" className="mandatory">
                                                            <span data-v-1af24323="" className="mandatory-icon">*</span>
                                                        </div>Thương hiệu                                                       
                                                    
                                                </div>
                                                <div data-v-a3311712="" className="edit-input edit-text">
                                                    <div data-v-5bb79eae="" data-v-9a4c8da0="" className="popover-wrap attribute-text" data-v-a3311712="">
                                                        <div className="select" data-v-5bb79eae="">
                                                            <div className="dropdown select-popover" max-width="292">
                                                                <div tabIndex="0" className="selector item-space selector--large"> 
                                                                    <div className="selector__inner placeholder line-clamp--1"> Vui lòng chọn</div> 
                                                                    <div className="selector__suffix">  
                                                                        <i className="selector__suffix-icon icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                        </i>
                                                                    </div>
                                                                </div>  
                                                                <div className="popper popover adv-select-popover select-popover-content" style={{display: 'none'}}>
                                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}></ul>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="attribute-select-item">
                                            <div className="grid edit-row">
                                                <div data-v-9a4c8da0="" className="edit-label edit-title">
                                                    
                                                        <div data-v-1af24323="" data-v-9a4c8da0="" className="mandatory">
                                                            <span data-v-1af24323="" className="mandatory-icon">*</span>
                                                        </div>Thương hiệu                                                       
                                                   
                                                </div>
                                                <div data-v-a3311712="" className="edit-input edit-text">
                                                    <div data-v-5bb79eae="" data-v-9a4c8da0="" className="popover-wrap attribute-text" data-v-a3311712="">
                                                        <div className="select" data-v-5bb79eae="">
                                                            <div className="dropdown select-popover" max-width="292">
                                                                <div tabIndex="0" className="selector item-space selector--large"> 
                                                                    <div className="selector__inner placeholder line-clamp--1"> Vui lòng chọn</div> 
                                                                    <div className="selector__suffix">  
                                                                        <i className="selector__suffix-icon icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                        </i>
                                                                    </div>
                                                                </div>  
                                                                <div className="popper popover adv-select-popover select-popover-content" style={{display: 'none'}}>
                                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}></ul>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="attribute-select-item">
                                            <div className="grid edit-row">
                                                <div data-v-9a4c8da0="" className="edit-label edit-title">
                                                    
                                                        <div data-v-1af24323="" data-v-9a4c8da0="" className="mandatory">
                                                            <span data-v-1af24323="" className="mandatory-icon">*</span>
                                                        </div>Thương hiệu                                                       
                                                    
                                                </div>
                                                <div data-v-a3311712="" className="edit-input edit-text">
                                                    <div data-v-5bb79eae="" data-v-9a4c8da0="" className="popover-wrap attribute-text" data-v-a3311712="">
                                                        <div className="select" data-v-5bb79eae="">
                                                            <div className="dropdown select-popover" max-width="292">
                                                                <div tabIndex="0" className="selector item-space selector--large"> 
                                                                    <div className="selector__inner placeholder line-clamp--1"> Vui lòng chọn</div> 
                                                                    <div className="selector__suffix">  
                                                                        <i className="selector__suffix-icon icon">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                                        </i>
                                                                    </div>
                                                                </div>  
                                                                <div className="popper popover adv-select-popover select-popover-content" style={{display: 'none'}}>
                                                                    <ul className="dropdown-menu" style={{maxWidth: '440px'}}></ul>
                                                                </div>
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </section>  
                        
                        <section ref={saleref} className="product-edit__section" id="variation">
                            <h2 className="title">Sales information </h2>
                            <div className="product-sales-info">
                                <div className={`${state.list_color.length==0?'no-variation':'product-ti-variation'}`}>
                                    {state.list_color.length==0?<>
                                    <div data-v-749e1f8b="" className="grid edit-row">
                                        <div data-v-749e1f8b="" className="edit-title edit-label">
                                            <span data-v-749e1f8b="">Phân loại hàng</span>
                                        </div> 
                                        <div data-v-749e1f8b="" className="edit-text">
                                            <div onClick={()=>addcolor()} data-v-5bb79eae="" data-v-749e1f8b="" className="popover-wrap">
                                                <button data-v-749e1f8b="" type="button" className="repeater-add button button--normal" data-v-5bb79eae="">
                                                    <span>
                                                        <i data-v-749e1f8b="" className="icon">
                                                            <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g data-name="Layer 1"><path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></path><path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></path></g></svg>
                                                        </i>Thêm nhóm phân loại
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-749e1f8b="" className="grid edit-row">
                                        <div data-v-749e1f8b="" className="edit-label edit-title">
                                            <div data-v-1af24323="" data-v-749e1f8b="" className="mandatory">
                                                <span data-v-1af24323="" className="mandatory-icon">*</span>
                                            </div> 
                                            <span data-v-749e1f8b="">Giá</span> 
                                        </div> 
                                        <div data-v-749e1f8b="" className="edit-input edit-text">
                                            <div data-v-a3311712="" data-v-749e1f8b="" className="product-edit-form-item">
                                                <div data-v-a3311712="" className="product-edit-form-item-content">
                                                    <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                                        <div data-v-3bee04c0="" className="input price-input product-edit-input" size="large" prefix-label="₫" is-round="true" data-v-5bb79eae="">
                                                            <div className="input__inner input__inner--large">
                                                                <div className="input__prefix">
                                                                    ₫<span className="input__prefix-split"></span>
                                                                </div> 
                                                                <input onChange={(e)=>setformData({...formData,price:e.target.value.replace(/[^\d]/g,'')})} type="text" placeholder="Nhập vào" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>   
                                        </div>
                                    </div>
                                    <div data-v-749e1f8b="" className="grid edit-row">
                                        <div data-v-749e1f8b="" className="edit-label edit-title">
                                            <div data-v-1af24323="" data-v-749e1f8b="" className="mandatory">
                                                <span data-v-1af24323="" className="mandatory-icon">*</span>
                                            </div> 
                                            <span data-v-749e1f8b="">Kho hàng</span> 
                                        </div> 
                                        <div data-v-749e1f8b="" className="edit-input edit-text">
                                            <div data-v-a3311712="" data-v-749e1f8b="" className="product-edit-form-item">
                                                <div data-v-a3311712="" className="product-edit-form-item-content">
                                                    <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                                        <div className="input product-edit-input" currency-decimal-point="." currency-precision="0" data-v-5bb79eae="">
                                                            <div className="input__inner input__inner--large"> 
                                                                <input onChange={(e)=>setformData({...formData,inventory:e.target.value.replace(/[^\d]/g,'')})} type="text" placeholder="Nhập vào" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div> 
                                    </div></>:
                                    <>
                                        <div data-v-749e1f8b="" className="options-panel-container">
                                            <div data-v-749e1f8b="" className="grid edit-row">
                                                <div data-v-3cc60ed8="" className="edit-label edit-title">Nhóm phân loại 1</div>
                                                <div data-v-749e1f8b="" className="variation-edit-wrapper">
                                                    <div data-v-a3311712="" data-v-749e1f8b="" className="options-panel">
                                                        <span onClick={()=>setremove()} data-v-44d9d323="" className="options-close-btn">
                                                            <i data-v-44d9d323="" className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28 6.1L25.9 4 16 13.9 6.1 4 4 6.1l9.9 9.9L4 25.9 6.1 28l9.9-9.9 9.9 9.9 2.1-2.1-9.9-9.9L28 6.1z"></path></svg>
                                                            </i>
                                                        </span>
                                                        <div data-v-44d9d323="" className="grid text-row">
                                                            <div data-v-44d9d323="" className="edit-label edit-title">Tên nhóm phân loại</div> 
                                                            <div data-v-44d9d323="" className="edit-text">
                                                                <div data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                    <div data-v-a3311712="" data-v-4c2d181f="" data-v-44d9d323="" className="product-edit-form-item" size="large" placeholder="Nhập tên Nhóm phân loại hàng, ví dụ: màu sắc, kích thước v.v" data-v-5bb79eae="">
                                                                        <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                            <div data-v-4c2d181f="" className="input" data-v-a3311712="">
                                                                                <div className="input__inner input__inner--large"> 
                                                                                    <input onChange={(e)=>setState({...state,classify1:e.target.value})} value={state.classify1} type="text" placeholder="Nhập tên Nhóm phân loại hàng, ví dụ: màu sắc, kích thước v.v" size="large" resize="none" rows="2" minrows="2" maxlength="Infinity" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                    <div className="input__suffix">
                                                                                        <span className="input__suffix-split"></span>{state.classify1.trim().length}/14
                                                                                    </div>
                                                                                </div>
                                                                            </div>   
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span data-v-44d9d323="" className="variation-option">Phân loại hàng</span>
                                                        <div data-v-44d9d323="">
                                                            {state.list_color.map((color,i)=>
                                                                <div data-v-44d9d323="" className="grid text-row">
                                                                    <div data-v-44d9d323="" className="edit-label edit-title"></div> 
                                                                    <div data-v-44d9d323="" className="edit-text">
                                                                        <div data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                            <div data-v-a3311712="" data-v-4c2d181f="" data-v-44d9d323="" className={`product-edit-form-item ${color.error?'error':''}`} size="large" placeholder="Nhập phân loại hàng, ví dụ: Trắng, Đỏ v.v" data-v-5bb79eae="">
                                                                                <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                                    <div data-v-4c2d181f="" className="input" data-v-a3311712="">
                                                                                        <div className="input__inner input__inner--large"> 
                                                                                            <input onChange={(e)=>setvaluecolor(e,color)} type="text" value={color.value} placeholder="Nhập phân loại hàng, ví dụ: Trắng, Đỏ v.v" size="large" resize="none" rows="2" minrows="2" maxlength="Infinity" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                            <div className="input__suffix">
                                                                                                <span className="input__suffix-split"></span>{color.value.trim().length}/20
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> 
                                                                                    {color.error?<div data-v-a3311712="" className="product-edit-form-item-error">Các phân loại hàng phải khác nhau</div> :''}
                                                                                </div>
                                                                            </div>
                                                                        </div> 
                                                                        <span data-v-44d9d323="" className="options-drag-btn handle">
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M950.6 489.4l-96-96c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v64H544V224h64c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-96-96c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-9.2 9.2-11.9 22.9-6.9 34.9S403.1 224 416 224h64v256H224v-64c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-96 96c-6 6-9.4 14.2-9.4 22.6 0 8.4 3.4 16.7 9.4 22.6l96 96c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6v-64h256v256h-64c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l96 96c6 6 14.2 9.4 22.6 9.4s16.7-3.4 22.6-9.4l96-96c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8h-64V544h256v64c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l96-96c6-6 9.4-14.2 9.4-22.6.1-8.5-3.3-16.8-9.3-22.7z"></path></svg>
                                                                            </i> 
                                                                        </span>
                                                                        {state.list_color.length>1?
                                                                        <span onClick={()=>removecolor(color)} data-v-44d9d323="" className="options-remove-btn">
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fillRule="nonzero"><path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path><path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></path></g></svg>
                                                                            </i>
                                                                        </span>:''}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div data-v-44d9d323="" className="grid text-row btn-container">
                                                            <div data-v-44d9d323="" className="edit-label edit-title"></div> 
                                                                <div data-v-44d9d323="" className="edit-text">
                                                                    <div onClick={()=>addcolor()} data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                    <button data-v-44d9d323="" type="button" className="repeater-add button--full-width btn-gray button button--normal" data-v-5bb79eae="">
                                                                        <span>
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g data-name="Layer 1"><path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></path><path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></path></g></svg>
                                                                            </i>Thêm phân loại hàng
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>   
                                                </div>
                                            </div>
                                            <div data-v-749e1f8b="" className="grid edit-row">
                                                <div data-v-3cc60ed8="" className="edit-label edit-title">Nhóm phân loại 2</div>
                                                <div data-v-3cc60ed8="" className={`${state.list_size.length==0?'main-container':'variation-edit-wrapper'}`}>
                                                    {state.list_size.length==0?
                                                    <div onClick={()=>addsize()} data-v-5bb79eae="" data-v-3cc60ed8="" className="popover-wrap">
                                                        <button data-v-3cc60ed8="" type="button" className="repeater-add button--full-width button button--normal" data-v-5bb79eae="">
                                                            <span>
                                                                <i data-v-3cc60ed8="" className="icon">
                                                                    <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g data-name="Layer 1"><path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></path><path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></path></g></svg>
                                                                </i>Thêm
                                                            </span>
                                                        </button>
                                                    </div>:
                                                    <div data-v-a3311712="" data-v-749e1f8b="" className="options-panel">
                                                        <span onClick={()=>setremove()} data-v-44d9d323="" className="options-close-btn">
                                                            <i data-v-44d9d323="" className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28 6.1L25.9 4 16 13.9 6.1 4 4 6.1l9.9 9.9L4 25.9 6.1 28l9.9-9.9 9.9 9.9 2.1-2.1-9.9-9.9L28 6.1z"></path></svg>
                                                            </i>
                                                        </span>
                                                        <div data-v-44d9d323="" className="grid text-row">
                                                            <div data-v-44d9d323="" className="edit-label edit-title">Tên nhóm phân loại</div> 
                                                            <div data-v-44d9d323="" className="edit-text">
                                                                <div data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                    <div data-v-a3311712="" data-v-4c2d181f="" data-v-44d9d323="" className="product-edit-form-item" size="large" placeholder="Nhập tên Nhóm phân loại hàng, ví dụ: màu sắc, kích thước v.v" data-v-5bb79eae="">
                                                                        <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                            <div data-v-4c2d181f="" className="input" data-v-a3311712="">
                                                                                <div className="input__inner input__inner--large"> 
                                                                                    <input onChange={(e)=>setState({...state,classify2:e.target.value})} value={state.classify2} type="text" placeholder="Nhập tên Nhóm phân loại hàng, ví dụ: màu sắc, kích thước v.v" size="large" resize="none" rows="2" minrows="2" maxlength="Infinity" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                    <div className="input__suffix">
                                                                                        <span className="input__suffix-split"></span>{state.classify2.trim().length}/14
                                                                                    </div>
                                                                                </div>
                                                                            </div>   
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span data-v-44d9d323="" className="variation-option">Phân loại hàng</span>
                                                        <div data-v-44d9d323="">
                                                            {state.list_size.map((size,i)=>
                                                                <div data-v-44d9d323="" className="grid text-row">
                                                                    <div data-v-44d9d323="" className="edit-label edit-title"></div> 
                                                                    <div data-v-44d9d323="" className="edit-text">
                                                                        <div data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                            <div data-v-a3311712="" data-v-4c2d181f="" data-v-44d9d323="" className={`product-edit-form-item ${size.error?'error':''}`} size="large" placeholder="Nhập phân loại hàng, ví dụ: Trắng, Đỏ v.v" data-v-5bb79eae="">
                                                                                <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                                    <div data-v-4c2d181f="" className="input" data-v-a3311712="">
                                                                                        <div className="input__inner input__inner--large"> 
                                                                                            <input onChange={(e)=>setvaluesize(e,size)} type="text" value={size.value} placeholder="Nhập phân loại hàng, ví dụ: Trắng, Đỏ v.v" size="large" resize="none" rows="2" minrows="2" maxlength="Infinity" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                                            <div className="input__suffix">
                                                                                                <span className="input__suffix-split"></span>{size.value.trim().length}/20
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {size.error?<div data-v-a3311712="" className="product-edit-form-item-error">Các phân loại hàng phải khác nhau</div> :''}
                                                                                </div>
                                                                            </div>
                                                                        </div> 
                                                                        <span data-v-44d9d323="" className="options-drag-btn handle">
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M950.6 489.4l-96-96c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6v64H544V224h64c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-96-96c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-9.2 9.2-11.9 22.9-6.9 34.9S403.1 224 416 224h64v256H224v-64c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-96 96c-6 6-9.4 14.2-9.4 22.6 0 8.4 3.4 16.7 9.4 22.6l96 96c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6v-64h256v256h-64c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l96 96c6 6 14.2 9.4 22.6 9.4s16.7-3.4 22.6-9.4l96-96c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8h-64V544h256v64c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l96-96c6-6 9.4-14.2 9.4-22.6.1-8.5-3.3-16.8-9.3-22.7z"></path></svg>
                                                                            </i> 
                                                                        </span>
                                                                        {state.list_size.length>1?
                                                                        <span onClick={()=>removesize(size)} data-v-44d9d323="" className="options-remove-btn">
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fillRule="nonzero"><path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path><path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></path></g></svg>
                                                                            </i>
                                                                        </span>:''}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div data-v-44d9d323="" className="grid text-row btn-container">
                                                            <div data-v-44d9d323="" className="edit-label edit-title"></div> 
                                                            <div data-v-44d9d323="" className="edit-text">
                                                                <div onClick={()=>addsize()} data-v-5bb79eae="" data-v-44d9d323="" className="popover-wrap">
                                                                    <button data-v-44d9d323="" type="button" className="repeater-add button--full-width btn-gray button button--normal" data-v-5bb79eae="">
                                                                        <span>
                                                                            <i data-v-44d9d323="" className="icon">
                                                                                <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g data-name="Layer 1"><path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></path><path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></path></g></svg>
                                                                            </i>Thêm phân loại hàng
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                    }
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="info-panel">
                                            <div data-v-3cc60ed8="" className="grid edit-row">
                                                <div data-v-3cc60ed8="" className="edit-label edit-title">Mẹo thiết lập phân loại hàng</div> 
                                                <div data-v-3cc60ed8="" className="edit-main batch-container">
                                                    <form data-v-3cc60ed8="" autocomplete="off" className="main-container inline-flex form--label-right">
                                                        <div data-v-e35cec2e="" data-v-3cc60ed8="" className="batch-price form-item form-item--normal form-item-top-error">
                                                            <label for="price" className="form-item__label empty"> </label> 
                                                            <div className="form-item__control">
                                                                <div className="form-item__content">
                                                                    <div data-v-3bee04c0="" data-v-3cc60ed8="" className="input price-input" size="large" placeholder="Giá" prefix-label="₫">
                                                                        <div className="input__inner input__inner--large">
                                                                            <div className="input__prefix">
                                                                                ₫<span className="input__prefix-split"></span>
                                                                            </div> 
                                                                            <input onChange={e=>setformData({...formData,price:e.target.value.replace(/[^\d]/g,'')})} value={formData.price} type="text" placeholder="Giá" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                        </div>
                                                                    </div>
                                                                </div>  
                                                            </div>
                                                        </div>  
                                                        <div data-v-e35cec2e="" data-v-3cc60ed8="" className="batch-inner-item form-item form-item--normal form-item-top-error">
                                                            <label for="stock" className="form-item__label empty"> </label> 
                                                            <div className="form-item__control">
                                                                <div className="form-item__content">
                                                                    <div data-v-3cc60ed8="" className="input">
                                                                        <div className="input__inner input__inner--large"> 
                                                                            <input onChange={e=>setformData({...formData,inventory:e.target.value.replace(/[^\d]/g,'')})} value={formData.inventory} type="text" placeholder="Kho hàng" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                        </div>
                                                                    </div>
                                                                </div>  
                                                            </div>
                                                        </div> 
                                                        <div data-v-e35cec2e="" data-v-3cc60ed8="" className="batch-inner-item batch-sku form-item form-item--normal form-item-top-error">
                                                            <label for="sku" className="form-item__label empty"> </label> 
                                                            <div className="form-item__control">
                                                                <div className="form-item__content">
                                                                    <div data-v-3cc60ed8="" className="input">
                                                                        <div className="input__inner input__inner--large"> 
                                                                            <input onChange={e=>setformData({...formData,sku_classify:`${e.target.value.trim()!=''?e.target.value.trim():''}`})} value={formData.sku_classify.trim()} type="text" placeholder="SKU phân loại" size="large" resize="vertical" rows="2" minrows="2" maxlength="100" restrictiontype="input" max="Infinity" min="-Infinity" className="input__input"/> 
                                                                        </div>
                                                                    </div>
                                                                </div>  
                                                            </div>
                                                        </div> 
                                                    </form> 
                                                    <button disabled={formData.price|| formData.inventory || formData.sku_classify.trim()!=''?false:true} onClick={()=>setallvariation()} data-v-3cc60ed8="" type="button"  className={`button btn-orange ${formData.price|| formData.inventory || formData.sku_classify.trim()!=''?'':'disable'}`}>
                                                        <span>Áp dụng cho tất cả phân loại</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div data-v-3cc60ed8="" className="grid edit-row">
                                                <div data-v-3cc60ed8="" className="edit-label edit-title">Danh sách phân loại hàng</div> 
                                                <div data-v-3cc60ed8="" className="edit-main">
                                                    <div  className="variation-model-table">
                                                        <ContentLeft>
                                                            <div data-v-4d4bd544="" className="varation-model-table-header">
                                                                <div data-v-4d4bd544="" className="flex">
                                                                    <div data-v-4d4bd544="" className="table-cell table-header" style={{minHeight: '40px',minWidth:'100px'}}>
                                                                        <div data-v-e8a0577a="" data-v-4d4bd544="" className="popover-cell-content">{state.classify1.trim()!=''?state.classify1.trim():'Tên'}</div>
                                                                    </div> 
                                                                    {state.list_size.length>0?
                                                                    <div data-v-4d4bd544="" className="table-cell table-header" style={{minHeight: '40px',minWidth:'100px'}}>
                                                                        <div data-v-e8a0577a="" data-v-4d4bd544="" className="popover-cell-content">{state.classify2.trim()!=''?state.classify2.trim():'Tên'}</div>
                                                                    </div>:''}
                                                                </div>
                                                            </div> 
                                                            <Bodytable>
                                                                {state.list_color.map((item,i)=>
                                                                <div key={item.id} data-v-4d4bd544="" className={`flex`}>
                                                                    
                                                                    <div className="first-variation-cell" style={{width:'100px'}}>
                                                                        {item.value.trim()!=''?item.value.trim():'Loại'}
                                                                        {filepreview(i,item,'list_color',state.list_color,'image')}
                                                                    </div>
                                                                    {state.list_size.length>0?
                                                                    <Variationcontent>
                                                                        {state.list_size.map(variation=>
                                                                            <Secondclassify data-v-4d4bd544="" className="variation-cell" >{variation.value.trim()!=''?variation.value.trim():'Loại'}</Secondclassify>
                                                                        )}
                                                                    </Variationcontent>:''}
                                                                    
                                                                    
                                                                </div>
                                                                )}
                                                            </Bodytable>
                                                        </ContentLeft>
                                                        <ContentRight>
                                                            
                                                            <div data-v-4d4bd544="" className="variation-model-table-header">
                                                                <div data-v-4d4bd544=""  className="flex data-group">
                                                                    <div data-v-4d4bd544="" className="table-cell table-header price-column" style={{minHeight: '40px'}}>
                                                                        <div data-v-e8a0577a="" data-v-4d4bd544="" className="popover-cell-content">Giá</div>
                                                                    </div>
                                                                
                                                                    <div data-v-4d4bd544="" className="table-cell table-header stock-column" style={{minHeight: '40px'}}>
                                                                        <div data-v-e8a0577a="" data-v-4d4bd544="" className="popover-cell-content">Kho hàng</div>
                                                                    </div>   
                                                                    <div data-v-4d4bd544="" className="table-cell table-header sku-column" style={{minHeight: '40px'}}>
                                                                        <div data-v-e8a0577a="" data-v-4d4bd544="" className="popover-cell-content">SKU phân loại</div>
                                                                    </div> 
                                                                </div>   
                                                            </div>
                                                                            
                                                            <Bodytable>
                                                                {state.list_color.map((color,i)=>
                                                                <Flexcol key={color.id}>
                                                                    {state.variations.filter(variation=>variation.color_id==color.id).map(variation=>
                                                                        variationinfo(variation)
                                                                    )}
                                                                </Flexcol>
                                                                
                                                                )}
                                                            </Bodytable>
                                                        </ContentRight> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                                </div>
                                {price_equal && (
                                <div className="grid edit-row">
                                    <div data-v-fafe34b4="" className="edit-label edit-title">
                                        <span data-v-fafe34b4="">Buy more discount</span>
                                    </div>
                                    <div className={`${buymore.length>0?'edit-main':'wholesale-container'}`}>
                                        <div className={`product-wholesale-list ${buymore.length>0?'edit-container':''}`}>
                                            {buymore.length>0?
                                            <div data-v-513dcd61="" className="wholesale-header">
                                                <div data-v-513dcd61="" className="name">&nbsp;</div> 
                                                <div data-v-513dcd61="" className="title">Từ (sản phẩm)</div> 
                                                <div data-v-513dcd61="" className="title">Đến (sản phẩm)</div> 
                                                <div data-v-513dcd61="" className="title">Đơn Giá</div> 
                                            </div>:''}
                                            <div data-v-c3ab6ec8="" data-v-513dcd61="" className="repeater-container">
                                                <div data-v-c3ab6ec8="" className="repeater-wrapper">
                                                    {buymore.map((item,i)=>
                                                    <div data-v-c3ab6ec8="" key={item.id} className="repeater">
                                                        <div data-v-c3ab6ec8="" className="repeater-item">
                                                            <div data-v-513dcd61="" data-v-c3ab6ec8="" className="wholesale-item-count">{i+1}.</div>
                                                            <div data-v-513dcd61="" data-v-c3ab6ec8="" className="wholesale-item-name">Khoảng giá {i+1}</div> 
                                                            <div data-v-3918fde2="" data-v-513dcd61="" className="wholesale-input" data-v-c3ab6ec8="">
                                                                <div data-v-3918fde2="" className="wholesale-input-item">
                                                                    <div data-v-a3311712="" data-v-3918fde2="" className="product-edit-form-item">
                                                                        <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                            <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                                                                <div className="input product-edit-input" currency-decimal-point="." currency-precision="0" data-v-5bb79eae="">
                                                                                    <div className={`input__inner ${i>0?'disable':''} input__inner--large`}> 
                                                                                        <input onChange={(e)=>setbuymore(e,item,'product_from')} disabled={i>0?true:false} type="text" value={item.product_from} placeholder="Từ (sản phẩm)" size="large" resize="vertical" rows="2" minrows="2" maxlength="6" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <div data-v-3918fde2="" className="wholesale-input-item">
                                                                    <div data-v-a3311712="" data-v-3918fde2="" className="product-edit-form-item">
                                                                        <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                            <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                                                                <div className="input product-edit-input" currency-decimal-point="." currency-precision="0" data-v-5bb79eae="">
                                                                                    <div className="input__inner input__inner--large"> 
                                                                                        <input onChange={(e)=>setbuymore(e,item,'product_to')} type="text" value={item.product_to} placeholder="Đến (sản phẩm)" size="large" resize="vertical" rows="2" minrows="2" maxlength="6" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                                <div data-v-3918fde2="" className="wholesale-input-item">
                                                                    <div data-v-a3311712="" data-v-3918fde2="" className="product-edit-form-item">
                                                                        <div data-v-a3311712="" className="product-edit-form-item-content">
                                                                            <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                                                                <div data-v-3bee04c0="" className="input price-input product-edit-input" placeholder="Đơn Giá" size="large" prefix-label="₫" is-round="true" data-v-5bb79eae="">
                                                                                    <div className="input__inner input__inner--large">
                                                                                        <div className="input__prefix">
                                                                                            ₫<span className="input__prefix-split"></span>
                                                                                        </div> 
                                                                                        <input onChange={(e)=>setbuymore(e,item,'price')} type="text" value={item.price} placeholder="Đơn Giá" size="large" resize="vertical" rows="2" minrows="2" restrictiontype="value" max="Infinity" min="-Infinity" isround="true" className="input__input"/> 
                                                                                    </div>
                                                                                </div>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                </div> 
                                                            </div> 
                                                            <div onClick={()=>removebymore(item)} data-v-c3ab6ec8="" className="repeater-remove">
                                                                <i data-v-c3ab6ec8="" className="icon">
                                                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fillRule="nonzero"><path d="M14.516 3.016h-4v-1a.998.998 0 0 0-.703-.955.99.99 0 0 0-.297-.045h-3a.998.998 0 0 0-.955.703.99.99 0 0 0-.045.297v1h-4a.5.5 0 1 0 0 1h1v10a.998.998 0 0 0 .703.955.99.99 0 0 0 .297.045h9a.998.998 0 0 0 .955-.703.99.99 0 0 0 .045-.297v-10h1a.5.5 0 1 0 0-1zm-8-1h3v1h-3v-1zm6 12h-9v-10h9v10z"></path><path d="M5.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5zM8.016 12.016a.5.5 0 0 0 .5-.5v-5a.5.5 0 1 0-1 0v5a.5.5 0 0 0 .5.5zM10.516 12.016a.5.5 0 0 0 .5-.5v-4a.5.5 0 1 0-1 0v4a.5.5 0 0 0 .5.5z"></path></g></svg>
                                                                </i> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button onClick={()=>addbuymore()} data-v-513dcd61="" type="button" className={`button button--normal repeater-add ${buymore.length>0?'wholesale-button':''}`}>
                                                <span>
                                                    <i data-v-513dcd61="" className="icon">
                                                        <svg data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><g data-name="Layer 1"><path d="M512 1024A512.2 512.2 0 0 1 312.7 40.2a512.12 512.12 0 0 1 398.6 943.5A507.07 507.07 0 0 1 512 1024zm0-960a447.88 447.88 0 0 0-316.8 764.8A448 448 0 1 0 686.4 99.2 444.4 444.4 0 0 0 512 64z"></path><path d="M768 480H544V256a32 32 0 0 0-64 0v224H256a32 32 0 0 0 0 64h224v224a32 32 0 0 0 64 0V544h224a32 32 0 0 0 0-64z"></path></g></svg>
                                                    </i>
                                                    Thêm khoảng giá
                                                </span>
                                            </button>
                                            {buymore.length>0?
                                            <div data-v-513dcd61="" className="alert error-message alert--error alert--small">
                                                <div className="alert-content">
                                                    <div className="alert-title">Khoảng giá 2: Max order cannot be less than min order.</div>
                                                </div>
                                            </div>:''}
                                            <div data-v-513dcd61="" className={`warning ${buymore.length>0?'hasWholesale':''}`}>
                                                <span data-v-513dcd61="">Mua nhiều giảm giá sẽ bị ẩn khi sản phẩm đang tham gia Mua Kèm Deal Sốc hay Combo Khuyến Mãi</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>)}
                               
                                <div data-v-05c78f31="" data-v-fafe34b4="" className="product-size-chart">
                                    <div data-v-05c78f31="" className="grid edit-row">
                                        <div data-v-05c78f31="" className="edit-label edit-title">
                                            <div data-v-05c78f31="">Bảng quy đổi kích cỡ</div>
                                        </div> 
                                        <div data-v-05c78f31="" className="size-chart-content">
                                            <div data-v-05c78f31="" className="edit-input">
                                                <div data-v-48246a68="" data-v-05c78f31="" className="file-upload" accept="image/*">
                                                    <div data-v-48246a68="" className="upload" simple="true">
                                                        <div className="upload-wrapper upload-dragger">
                                                            <input type="file" name="file" accept="image/*" simple="true" className="upload__input"/> 
                                                            <div data-v-05c78f31="" className="size-chart-upload">
                                                                <i data-v-05c78f31="" className="icon">
                                                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.387 5.807a.387.387 0 1 0-.774 0v5.806H5.806a.387.387 0 1 0 0 .774h5.807v5.807a.387.387 0 1 0 .774 0v-5.807h5.807a.387.387 0 1 0 0-.774h-5.807V5.807z"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-.774c6.2 0 11.226-5.026 11.226-11.226C23.226 5.8 18.2.774 12 .774 5.8.774.774 5.8.774 12 .774 18.2 5.8 23.226 12 23.226z"></path></svg>
                                                                </i>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div> 
                                            </div> 
                                            <div data-v-05c78f31="" className="example">Xem ví dụ ở đây</div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </section>
                
                        <section ref={deliveryref} className="product-edit__section" id="delivery">
                            <h2 className="title">Delivery</h2>
                            <div className="edit-row d-flex">
                                <div data-v-05c78f31="" className="edit-label edit-title">
                                    <div data-v-05c78f31="">Weigth</div>
                                </div>
                                <div className="edit-input edit-text-mini">
                                    <div className="product-edit-form-item-content">
                                        <div className="input__inner input__inner--large"> 
                                            <input onChange={(e)=>setdelivery('weight',e)} type="text" className="form-select weigth" value={formData.weight?formData.weight:''} name="weigth" placeholder="Enter"  required/>
                                            <div className="input__suffix">
                                                <span className="input__suffix-split"></span>
                                                gr
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="edit-row d-flex">
                                <div data-v-5c2e84bf="" className="edit-label edit-title">Kích thước đóng gói(Phí vận chuyển thực tế sẽ thay đổi nếu bạn nhập sai kích thước)</div>
                                <div className="edit-input edit-text-mini">
                                    <div className="d-flex">
                                        <div className='product-dimension-edit-item product-edit-form-item'>
                                            <div className="product-edit-form-item-content">
                                                <div className="input__inner input__inner--large">
                                                        <input onChange={(e)=>setdelivery('width',e)} type="text" className="form-select" value={formData.width!=null?formData.width:''} name=" width" placeholder="R" required/>
                                                        <div className="input__suffix">
                                                            <span className="input__suffix-split"></span>
                                                            cm
                                                        </div>
                                                    </div> 
                                            </div> 
                                        </div> 
                                        <div className='product-dimension-edit-item product-edit-form-item'>
                                            <div className="product-edit-form-item-content">
                                                <div className="input__inner input__inner--large">
                                                    <input onChange={(e)=>setdelivery('length',e)} type="text" className="form-select " value={formData.length!=null?formData.length:''}  name="length" placeholder="D"  required/>
                                                    <div className="input__suffix">
                                                        <span className="input__suffix-split"></span>
                                                        cm
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='product-dimension-edit-item product-edit-form-item'>
                                            <div className="product-edit-form-item-content">
                                                <div className="input__inner input__inner--large">
                                                    <input onChange={(e)=>setdelivery('height',e)} type="text" className="form-select" value={formData.height!=null?formData.height:''}  name="height" placeholder="C" required/>
                                                    <div className="input__suffix">
                                                        <span className="input__suffix-split"></span>
                                                        cm
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {shipping!==null?
                            <div className="edit-row d-flex">
                                <div data-v-5c2e84bf="" className="edit-label edit-title">Phí vận chuyển</div>
                                <div className="edit-input edit-logistic-container"> 
                                    <div className="logistics-section logistics-section--enabled" >
                                        {Object.keys(shipping).map(key=>
                                        <div className="logistics-item logistics-item-ui-t3">{/*add logistics-item  transform: svg rotate(90deg)*/}
                                            <div className="optional-item d-flex">
                                                <div  className="expend-button">
                                                    <i className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.18933983,8 L5.21966991,11.9696699 C4.9267767,12.2625631 4.9267767,12.7374369 5.21966991,13.0303301 C5.51256313,13.3232233 5.98743687,13.3232233 6.28033009,13.0303301 L10.7803301,8.53033009 C11.0732233,8.23743687 11.0732233,7.76256313 10.7803301,7.46966991 L6.28033009,2.96966991 C5.98743687,2.6767767 5.51256313,2.6767767 5.21966991,2.96966991 C4.9267767,3.26256313 4.9267767,3.73743687 5.21966991,4.03033009 L9.18933983,8 Z"></path></svg>
                                                    </i>
                                                </div>
                                                <div className="item-center col--grow">
                                                    <div className="col logistics-item-name text-overflow">{key}</div>
                                                    <div data-v-5e61e860="" className="col ml-1_2 logistics-item-limit"></div>
                                                    <div className="logistics-item-label">
                                                        Anhdai VẬN CHUYỂN
                                                    </div>
                                                </div>
                                                <div className="d-flex ">
                                                <div data-v-5e61e860="" className="inline-list-item">
                                                    {formData.weight==null?
                                                    <span data-v-5e61e860="" className="error-message">Đơn vị vận chuyển không được hỗ trợ.</span>:
                                                    <>
                                                    <div data-v-4f5fa871="" data-v-5e61e860="" className="price">₫{formatter.format(price_ship[key].find(item=>item.weight_from<=formData.weight && item.weight_to>formData.weight).price)}</div> 
                                                    <div data-v-5e61e860="" className="editable-field__edit">
                                                        <i data-v-5e61e860="" className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899"><path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z"></path></svg>
                                                        </i>
                                                    </div>
                                                    </>}
                                                    <div data-v-5e61e860="" className="modals">
                                                        <div className="modal__mask" style={{display: 'none', zIndex: 1000004}}>
                                                            <div className="modal__container">
                                                                <div className="modal__box" style={{display: 'none'}}>
                                                                    <div className="modal__content modal__content--large">
                                                                        <form data-v-5e61e860="" autocomplete="off" className="form editable-field__form form--label-right">
                                                                            <h4 data-v-5e61e860="">Đơn vị vận chuyển: Nhanh</h4> 
                                                                            <div data-v-5e61e860="" className="grid row">
                                                                                <div data-v-5e61e860="" className="shipping-fee-edit-wrapper">
                                                                                    <div data-v-4f5fa871="" data-v-5e61e860="" className="price popover-shipping-fee">
    
                                                                                    </div> 
                                                                                    <div data-v-5e61e860="" className="popover-shipping-fee__desc">Phí vận chuyển tạm tính (dựa trên khối lượng sản phẩm là 2600g, kích thước đóng gói 22cm * 3cm * 22cm)</div>
                                                                                </div>
                                                                            </div>  
                                                                            <div data-v-5e61e860="" className="row setting-panel-item-actions">
                                                                                <button data-v-5e61e860="" type="button" className="button button--normal">
                                                                                    <span>Hủy</span></button> 
                                                                                    <div data-v-5e61e860="" className="popover popover--light">
                                                                                        <div className="popover__ref">
                                                                                            <button data-v-5e61e860="" type="button" className="button button--primary button--normal"><span>
                                                                                                Áp dụng
                                                                                                </span>
                                                                                            </button>
                                                                                        </div> 
                                                                                        <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                                                                                            <div className="popover__content">Không thể chỉnh sửa phương thức vận chuyển sau khi thiết lập chương trình Mua Kèm Deal Sốc cho sản phẩm này.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>    
                                                                        </div> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`switch_box ${formData.weight==null?'disable':''}`}>
                                                        <input onChange={()=>setshipping(key)} type="checkbox" disabled={formData.weight==null?true:false} name="check"  checked={state.shipping_item.some(item=>item.enable && item.method==key)?true:false} className="switch_1"/>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div data-v-5e61e860="" style={{display:`${state.show_shipping?'none':''}`}}>
                                                {shipping[key].map(item=>
                                                <div data-v-5e61e860="" className="actual-channel">
                                                    <span data-v-5e61e860="">{item.unit}
                                                        <span data-v-5e61e860="" className="logistics-item-limit">(Tối đa {item.allowable_volume}g)</span>
                                                    </span> 
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                    <div data-v-66851e8c="" className="warning">
                                            <i data-v-66851e8c="" className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M8,2 C4.6862915,2 2,4.6862915 2,8 C2,11.3137085 4.6862915,14 8,14 C11.3137085,14 14,11.3137085 14,8 C14,4.6862915 11.3137085,2 8,2 Z M7.909509,10.7 C8.32372256,10.7 8.659509,11.0357864 8.659509,11.45 C8.659509,11.8642136 8.32372256,12.2 7.909509,12.2 C7.49529544,12.2 7.159509,11.8642136 7.159509,11.45 C7.159509,11.0357864 7.49529544,10.7 7.909509,10.7 Z M7.90950939,4 C8.26688998,4 8.56224306,4.26557136 8.60898676,4.61013222 L8.6151077,4.72728377 L8.6151077,4.72728377 L8.35138233,9.08409646 C8.33722122,9.31775489 8.14359656,9.5 7.90950939,9.5 C7.67542223,9.5 7.48179757,9.31775489 7.46763645,9.08409646 L7.20488069,4.74862637 C7.18129549,4.35947068 7.47764893,4.02487809 7.86680462,4.0012929 L7.90950939,4 L7.90950939,4 Z"></path></svg>
                                            </i>
                                            Cài đặt đơn vị vận chuyển ở đây chỉ áp dụng cho sản phẩm này.
                                    </div>
                                </div>
                            </div>:''}
                        </section>
                
                        <section ref={moreref} className="product-edit__section" id="other_info">
                            <h2 className="title">Other information</h2>
                            <div className="edit-row d-flex">
                                <div data-v-a6899462="" className="edit-label edit-title">
                                    <span data-v-a6899462="">Hàng Đặt Trước</span>
                                </div>
                                <div className="item-col">
                                    <div className="d-flex pb-1">
                                        {state.choice_yes_no.map(item=>
                                            <div key={item.value} onClick={()=>setState({...state,order_before:item.value})} className=" custom-radio">
                                                <label className="check_input">{item.name}
                                                    <input type="radio" name="pre_order" checked={item.value==state.order_before?true:false}  className="custom-input"/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        )}
                                        
                                    </div>
                                    <div>I will send the goods in 2 days (excluding holidays, New Year and days when the shipping unit is not working)</div>
                                </div>
                            </div>
                            <div className="edit-row d-flex">
                                <div data-v-708e34e0="" className="edit-label edit-title">
                                    <span data-v-708e34e0="">Status</span>
                                </div>
                                <div className='edit-text-mini'>
                                    <div data-v-5bb79eae="" data-v-708e34e0="" className="popover-wrap">
                                        <div data-v-708e34e0="" className="select" data-v-5bb79eae="">
                                            <div tabIndex="0" className="selector item-space selector--large"> 
                                                <div className="selector__inner line-clamp--1">Mới</div> 
                                                <div className="selector__suffix"> 
                                                    <i className="selector__suffix-icon icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8,9.18933983 L4.03033009,5.21966991 C3.73743687,4.9267767 3.26256313,4.9267767 2.96966991,5.21966991 C2.6767767,5.51256313 2.6767767,5.98743687 2.96966991,6.28033009 L7.46966991,10.7803301 C7.76256313,11.0732233 8.23743687,11.0732233 8.53033009,10.7803301 L13.0303301,6.28033009 C13.3232233,5.98743687 13.3232233,5.51256313 13.0303301,5.21966991 C12.7374369,4.9267767 12.2625631,4.9267767 11.9696699,5.21966991 L8,9.18933983 Z"></path></svg>
                                                    </i>
                                                </div>
                                            </div> 
                                            <div className="popper" style={{position: 'absolute', zIndex: 1, willChange: 'top, left', transformOrigin: 'left top', top: '3840px', left: '206px', display: 'none'}} x-placement="bottom-start"> 
                                                <div className="select__menu" style={{maxWidth: '440px', maxHeight: '218px', minWidth: '440px'}}>
                                                    <div className="scrollbar">
                                                        <div className="scrollbar__wrapper">
                                                            <div className="scrollbar__bar vertical">
                                                                <div className="scrollbar__thumb" style={{top: '0px', height: '0px'}}></div>
                                                            </div>  
                                                            <div className="scrollbar__content" style={{position: 'relative'}}>
                                                                <div className="select__options">
                                                                    <div data-v-708e34e0="" className="option selected">Mới</div>
                                                                    <div data-v-708e34e0="" className="option">Đã sử dụng</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div className="edit-row d-flex">
                                <div className="edit-label edit-title">
                                    <span>SKU sản phẩm</span>
                                </div>
                                <div data-v-a3311712="" data-v-3918fde2="" className="product-edit-form-item">
                                    <div data-v-a3311712="" className="product-edit-form-item-content">
                                        <div data-v-5bb79eae="" className="popover-wrap" data-v-a3311712="">
                                            <div className="input__inner input__inner--large"> 
                                                <input type="text" className="form-select sku_product" value={formData.sku_product} name="sku_product" placeholder="Enter" required/>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </section> 
                    </div>
                    
                    <div className="container">
                        <div data-v-72ea37fa="" data-v-192fa078="" className="container-left"></div>
                        <div className="container-right btn-group">
                            <button className="btn-m btn-light" type="button">Cancel</button>
                            <button onClick={submit} disabled={valid_sale&&valid_delivery&&valid_media&&formData.name&&category_choice && formData.weight?false:true} className="btn-m btn-light mx-1" type="button">Save and hiden</button>
                            <button onClick={submit} disabled={valid_sale&&valid_delivery&&valid_media&&formData.name&&category_choice && formData.weight?false:true} className="btn-m btn-orange" type="button">Save and display</button> 
                        </div>
                    </div>  
                    <div className="product-edit__side">
                        <div className="side-wrapper">
                            <ul className="side-nav-list">
                                {listitem.map((item,i)=>
                                    <li key={i} onClick={()=>{
                                        const viewheight=Math.max(document.documentElement.clientHeight,window.innerHeight||0)
                                        setChoice(item.value)
                                        window.scroll({
                                            top:item.ref.current.offsetTop-viewheight/2,
                                            behavior:'smooth'
                                        })
                                        }}  data-v-c06739f6="" class="item">
                                        <div data-v-c06739f6="" class="icon-box">
                                            {item.value!=choice?
                                            <svg data-v-c06739f6="" width="16" height="16" style={{padding: '1px', boxSizing: 'content-box'}}><circle cx="8" cy="8" r="7" fill="#fff" stroke="#d8d8d8" stroke-width="2"></circle> <path d="M 7.999999999999999 1 A 7 7 0 0 1 7.999999999999999 1" fill="none" stroke="#ee4d2d" stroke-width="2"></path></svg>
                                            :<i data-v-c06739f6="" class="icon-success icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M11.1464466,5.92870864 L7.097234,9.97792125 L4.85355339,7.73424065 C4.65829124,7.5389785 4.34170876,7.5389785 4.14644661,7.73424065 C3.95118446,7.92950279 3.95118446,8.24608528 4.14644661,8.44134743 L6.7436806,11.0385814 C6.93894275,11.2338436 7.25552524,11.2338436 7.45078739,11.0385814 L11.8535534,6.63581542 C12.0488155,6.44055327 12.0488155,6.12397078 11.8535534,5.92870864 C11.6582912,5.73344649 11.3417088,5.73344649 11.1464466,5.92870864 Z"></path></svg></i>
                                            }</div> 
                                        <a data-v-c06739f6="" href="javascript:;">{item.name}</a>
                                    </li>
                                    
                                )}
                                
                                
                            </ul>
                        </div> 
                        <div className="education-card-wrapper product-education-card"></div>
                    </div>
                </div>:''}
            </div>
        )
    }
export default ProductDetail
