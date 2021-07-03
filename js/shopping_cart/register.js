let showEye = false

let email = false
let pass = false
let ho = false
let ten = false
$(document).ready(function () {
    $('.btn-submit').click(function () {
        if(email && pass && ho && ten) {
            alert('Đăng ký thành công')
            arrTK = [$('#email').val(), $('.password').val()]
            account.push(arrTK)
            localStorage.setItem('listAcc', JSON.stringify(account))
            window.location.href = './login.html'
        } else {
            alert('Vui lòng nhập đúng thông tin')
        }
    })
    $('.email-focus').focus(
        () => {
            $('.name-email span').addClass('spanEmail')
        }
    ).blur(
        () => {
            if($('#email').val().trim().length === 0) {
                $('.name-email span').removeClass('spanEmail')
            }
        }
    )


    $('.password').focus(
        () => {
            $('.name-pass span').addClass('spanPassword')
        }
    ).blur(
        () => {
            if($('#pasword').val().trim().length === 0) {
                $('.name-pass span').removeClass('spanPassword')
            }
        }
    )
    $('.showPass').click(() => {
        showEye = !showEye
        if(showEye) {
            $('.password').attr('type', 'text')
            $('.showPass').html('<i class="fa fa-eye-slash" aria-hidden="true"></i> ẩn')
        } else {
            $('.password').attr('type', 'password')
            $('.showPass').html('<i class="fa fa-eye" aria-hidden="true"></i> hiện')
        }
    })
    $('#name').focus(
        () => {
            $('.name-Name span').addClass('spanName')
        }
    ).blur(
        () => {
            if($('#name').val().trim().length === 0) {
                $('.name-Name span').removeClass('spanName')
            }
        }
    )

    $('#lastName').focus(
        () => {
            $('.name-firstName span').addClass('spanFirstName')
        }
    ).blur(
        () => {
            if($('#lastName').val().trim().length === 0) {
                $('.name-firstName span').removeClass('spanFirstName')
            }
        }
    )
});
document.getElementById('name').onkeyup = () => {
    let patName = new RegExp(`^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\ +[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)*)$`)
    let resName = patName.test(document.getElementById('name').value.trim())
    if(resName) {
        trueRegex('name')
        ten = true
    }
    else {
        falseRegex('name')
        ten = false
    }
}
document.getElementById('lastName').onkeyup = () => {
    let patName = new RegExp(`^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+(\ +[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)*)$`)
    let resName = patName.test(document.getElementById('lastName').value.trim())
    if(resName) {
        trueRegex('lastName')
        ho = true
    }
    else {
        falseRegex('lastName')
        ho = false
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
document.getElementById('pasword').onkeyup = () => {
    let passWord = /^(?=.*[a-zA-Z])(?=.*[0-9])(\w).{5,}$/;
    let resPass = passWord.test(document.getElementById('pasword').value.trim())
    if(resPass) {
        trueRegex('pasword')
        pass = true
    }
    else {
        falseRegex('pasword')
        pass = false
    }
}



function falseRegex(id) {
    document.getElementById(id).style.borderBottom =  '5px solid red'
}
function trueRegex(id) {
    document.getElementById(id).style.borderBottom =  '5px solid green'
}