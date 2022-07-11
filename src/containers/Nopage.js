

const NoPage = () => {
    return (
        <div id="main">
           
            
            <div className="error404">
                <div className="error-img">
                    <img src="https://res.cloudinary.com/dupep1afe/image/upload/v1650096754/404_fdmbq7.png" alt="404"/>
                </div>
                <div className="error-content">
                    <h3>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</h3>
                    <div className="list-contact">
                        <div className="itemct">
                            <p>Trở về trang chủ<br/>anhdai</p>
                            <a href="/" className="link link--yellow">
                                <i className="iconerror-tgdd"></i>
                            </a>
                        </div>
                        <div className="itemct">
                            <p>Gọi hỗ trợ miễn phí<br/>(7h30 - 22h)</p>
                            <a href="tel:18001060" className="link link--yellow link-tel">1800 1060</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default NoPage