import ShopAwardInfo from "../../hocs/ShopAwardInfo"
import { newflashsaleURL,newAwardshopURL } from "../../urls"

const NewShopAward=()=>{
    return (
        <ShopAwardInfo
        url_shop_award={newAwardshopURL}
        loading_content={true}
        />
    )
}
export default NewShopAward