let arrNews = [
    {
       img: "/img/slide/GalaxyS7.png",
       title: ' Sau thành công của Galaxy S20 FE, Samsung có thể sớm chính thức ra mắt Galaxy Tab S7 FE (Fan Edition)'
    },
    {
       img: "/img/slide/Samungg.jpg",
       title: ' Galaxy M62 lên kệ với cấu hình khủng, giá chỉ 9,99 triệu đồng'
    },
    {
       img: "/img/slide/xiaomi.jpg",
       title: ' Xiaomi giới thiệu bộ đôi smartphone giá rẻ Redmi Note 10 5G'
    },
    {
       img: "/img/slide/Pixel5.jpg",
       title: 'Không lặp lại sai lầm với Pixel 5, Google sẽ khiến ai cũng muốn Pixel 6 '
    },
    {
       img: "/img/slide/hieuxuat.jpg",
       title: ' Hiệu suất smartphone Android sẵn sàng đánh bại iPhone?'
    },
    {
       img: "/img/slide/Xiaomi11.jpg",
       title: ' Xiaomi Mi 11 Ultra đỉnh nhất trình làng, Mifan tự hào'
    },
]

$(document).ready(function () {
    let index = 0
    setInterval(() => {
        let arr = arr3sp(index)
        index = ++index == arrNews.length?0:index
        renderSlideNews(arr)
    }, 2000);
    renderNewsNew()
});

const arr3sp = (index) => {
    let arr3SP = arrNews.slice(index, index + 3)

    if(index + 2 == arrNews.length) {
        arr3SP = arrNews.slice(index, index + 2)
        arr3SP.push(arrNews[0])
    }
    if(index + 1 == arrNews.length) {
        arr3SP = arrNews.slice(index, index + 1)
        arr3SP.push(arrNews[0])
        arr3SP.push(arrNews[1])
    }
    return arr3SP
}
const renderSlideNews = (arr) => {
    $('.slideNews').empty()
    arr.map((item) => {
        $('.slideNews').append(
            `
            <div class="slideItem">
                <img src="${item.img}" alt="" class="img-responsive">
                <div class="slideItem--title">
                   ${item.title}
                </div>
            </div>
            
            `
        )
    })
}

let arrNewsNew = [
    {
        img: '/img/news/Nokia.png',
        title: 'Smartphone thương hiệu Nokia hút khách trở lại',
        author: 'Tran Dan',
        time: '2 phút trước',
        desciption: 'Dữ liệu thị trường mới nhất chỉ ra rằng HMD Global cuối cùng cũng thúc đẩy doanh số smartphone Nokia...'
    },
    {
        img: '/img/news/Samsung.jpg',
        title: 'Samsung đăng video quảng cáo "dìm" iPhone 12 Pro Max',
        author: 'Mai Ngọc',
        time: '1 ngày trước',
        desciption: 'Với phương châm  (tạm dịch: Nâng cấp mới không nên là những thứ đã lỗi thời), Samsung đưa Galaxy S21 Ultra lên bàn cân so sánh với iPhone 12 Pro Max trong mảng camera...'
    },
    {
        img: '/img/news/OppoFindX33.png',
        title: 'Đánh giá chi tiết Find X3 Pro 5G: Hiệu năng mạnh mẽ, màn hình “chất”',
        author: 'Hoàng Anh',
        time: '5 ngày trước',
        desciption: 'Oppo Find X3 Pro là chiếc smartphone đầu tiên sở hữu màn hình 1 tỷ màu (10bit) với kích cỡ lớn – 6,7 inch, đi kèm tốc độ làm mới 120 Hz. Đây là công nghệ tích hợp mà nhiều smartphone cao cấp chưa có được...'
    },
    {
        img: '/img/news/Iphone_oppo.png',
        title: 'Đánh bật Samsung, Apple xưng vương về lượng smartphone OLED',
        author: 'Thanh Tùng',
        time: '1 tuần trước',
        desciption: 'Samsung hiện đang là ông vua về việc triển khai màn hình OLED trên smartphone của mình, điều thú vị là nhà cung cấp tấm nền OLED chính cho Apple lại là... Samsung Display - một công ty con của Samsung Mobile đang nằm dưới sự bảo trợ của Samsung Group...'
    },
    {
        img: '/img/news/doanhthu.jpg',
        title: '10 điện thoại có doanh thu cao nhất thế giới',
        author: 'Hoàngg Hà',
        time: '2 tuần trước',
        desciption: 'Apple chiếm 6 vị trí cho các dòng iPhone, Samsung góp mặt với 3 sản phẩm thuộc dòng Galaxy S21, thứ hạng còn lại dành cho một sản phẩm của Huawei...'
    },
    {
        img: '/img/news/OppoX5.jpg',
        title: 'Mở hộp OPPO Find X3 Pro 5G chính hãng: Giá 26.9 triệu, có camera hiển vi, Snap 888, tặng quà 6 triệu tại CellphoneS',
        author: 'Hải Anh',
        time: '2 tuần trước',
        desciption: 'OPPO Find X3 Pro là chiếc smartphone cao cấp nhất được OPPO giới thiệu tại thị trường Việt Nam trong năm nay, kế nhiệm cho dòng Find X2 đã cực kỳ thành công trước đó...'
    },
]

renderNewsNew = () => {
    arrNewsNew.map(item => {
        $('.newsNew-item').append(
            `
                <div class ='mt-50 row'>
                    <div class="panel-img newsNew--item-img col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <img width="100%" src=${item.img} alt="">
                    </div>
                    <div class="text-muted newsNew--item-text col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <h3>${item.title}</h3>
                        <p><small>Bởi ${item.author}, ${item.time} </small><i class="fa fa-clock-o" aria-hidden="true"></i></p>
                        <p>${item.desciption}</p>
                    </div>
                    
                </div>
            `
        )
    })
}