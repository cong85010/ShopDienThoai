//regex
//hoten
let rename = false
let phone = false
let address = false
let email = false

let diachi = () => {
    if($('#select_xa').val() != '') {
       return true;
    }
    return false
}

function checkDuLieu() {
    if(rename && phone && address && email && diachi()) {
        window.location.href = '/html/shopping__cart/shopping_cart_3.html'

    } else {
        alert('Vui lòng điền thông tin theo theo cầu')
    }
}
function falseRegex(id) {
    document.getElementById(id).style.boxShadow =  '0 0 5px 2px red'
}
function trueRegex(id) {
    document.getElementById(id).style.boxShadow =  '0 0 5px 2px green'
}

document.getElementById('name').onkeyup = () => {
    let patName = new RegExp(`^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\ +[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)*)$`)
    let resName = patName.test(document.getElementById('name').value.trim())
    if(resName) {
        trueRegex('name')
        rename = true
    }
    else {
        falseRegex('name')
        rename = false
    }
}


document.getElementById('phone').onkeyup = () => {
    let patPhone = /^(0[3-9][0-9]{8})$/
    let resPhone = patPhone.test(document.getElementById('phone').value.trim())
    if(resPhone){
        trueRegex('phone')
        phone = true;
    }
    else {
        falseRegex('phone')
        phone = false;
    }
}

document.getElementById('address').onkeyup = () => {
    let patAddr= new RegExp(`^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9/]+(\ +[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9]+)*)`)
    let resAddr = patAddr.test(document.getElementById('address').value.trim())
    if(resAddr) {
        trueRegex('address')
        address = true
    }
    else {
        falseRegex('address')
        address = false
    }
}

document.getElementById('email').onkeyup = () => {
    let patMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let resMail = patMail.test(document.getElementById('email').value.trim())
    if(resMail) {
        trueRegex('email')
        email = true
    }
    else {
        falseRegex('email')
        email = false
    }
}
let dataAddress = []

$(document).ready(function () {
    $.getJSON("/js/shopping_cart/data_address.json").done((data) => {
        dataAddress = data.diaChi
        const tinh = new Set()
        tinh.add('Thành phố - Tỉnh')
        dataAddress.map((item) => {
            tinh.add(item.tinhTP)
        })
        readerDiaChi(tinh, '#select_tinh')
    })
    $('#select_tinh').change(() => {
        let tinh = $('#select_tinh').val()
        let datahuyen = [...dataAddress.filter((item) => tinh === item.tinhTP)]
        
        const huyen = new Set()
        huyen.add('Quận - Huyện')
        datahuyen.map(item => {
            huyen.add(item.quanHuyen)
        })

        $('#select_huyen').empty() //xoa tat ca thang con trong thang cha
        $('#select_xa').empty()
        $('#select_xa').append(
            `<option value="">Phường - Xã</option>`
        )
        readerDiaChi(huyen, '#select_huyen')
    })
    $('#select_huyen').change(() => {
        let tinh = $('#select_tinh').val()
        let huyen = $('#select_huyen').val()
        let dataXa = [...dataAddress.filter((item) => tinh === item.tinhTP & huyen === item.quanHuyen)]
        const xa = new Set()
        xa.add('Phường - Xã')

        dataXa.map(item => {
            xa.add(item.phuongXa)
        })
        $('#select_xa').empty() //xoa tat ca thang con trong thang cha
        readerDiaChi(xa, '#select_xa')
    })
});

function readerDiaChi(diachi, string){
    diachi.forEach((name) => {
        $(string).append(
            `<option value="${name}">${name}</option>`
        )
    })
}

