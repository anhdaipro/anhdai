import { useNavigate } from "react-router"
import { headers } from "../../actions/auth"
import axios from "axios"
export const BtnDelete=(props)=>{
    const {url,data,itemchoice,setdata}=props
    const setdelete= async ()=>{
        const form={action:'delete'}
        const res = await axios.post(url,JSON.stringify(form),headers())
        const dataupdate=data.filter(item=>item.id!==itemchoice.id)
        setdata(dataupdate)
    }
    return(
        <div className="action-list-item">
            <div className="popover popover--light">
                <div className="popover__ref">
                    <button onClick={setdelete} type="button" className="button button--link button--normal">
                        <span>Xóa</span>
                    </button>
                </div> 
                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                    <div className="popover__content"></div>
                </div>
            </div>
        </div>
    )
}
export const BtnInfo=(props)=>{
    const {url}=props
    const navigate=useNavigate()
    const showdetail=()=>{
        navigate(url)
    }
    return(
        <div className="action-list-item">
            <div className="popover popover--light">
                <div className="popover__ref">
                    <button onClick={showdetail} type="button" className="button button--link button--normal">
                        <span>Chi tiết</span>
                    </button>
                </div> 
                <div className="popper popover__popper popover__popper--light with-arrow" style={{display: 'none', maxWidth: '320px'}}>
                    <div className="popover__content"></div>
                </div>
            </div>
        </div>
    )
}