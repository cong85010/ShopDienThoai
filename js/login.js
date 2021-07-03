let showEye = false
let email = false
/* localStorage.getItem('account')| */
document.getElementById('email').onkeyup = () => {
    let patMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let resMail = patMail.test(document.getElementById('email').value.trim())
    if(resMail) {
        trueRegex('email')
        email = true
    }
    else {
        falseRegex('email')
        email = false
    }
    if(!email) {
        $('.error').text('Vui lòng nhập đúng email')
    } else {
        $('.error').text('')
    }
}
function falseRegex(id) {
    document.getElementById(id).style.borderBottom =  '5px solid red'
}
function trueRegex(id) {
    document.getElementById(id).style.borderBottom =  '5px solid green'
}
$(document).ready(function () {
    $('.btn-submit').click(function () {
        if(!email) {
            $('.error').text('Vui lòng nhập đúng email')
            return;
        }
        let Valemail = $('#email').val()
        let Valpass = $('#password').val()
        let intACC = account.findIndex((acc) => acc[0] === Valemail && acc[1] === Valpass)
        if(intACC !== -1) {
            alert('Đăng nhập thành công')
            localStorage.setItem('taiKhoang', true)
            window.location.href = './index.html'
        } else {
            $('.errorTK').text('Sai tài khoản hoặc mật khẩu')
        }
    })
    
    $('.text-Email-name').focus(
        () => {
            $('.before-email span').addClass('spanEmail')
        }
    ).blur(
        () => {
            if($('#email').val().trim().length === 0) {
                $('.before-email span').removeClass('spanEmail')
            }
        }
    )

    $('.text-password-name').focus(
        () => {
            $('.before-password span').addClass('spanPassword')
        }
    ).blur(
        () => {
            if($('#password').val().trim().length === 0) {
                $('.before-password span').removeClass('spanPassword')
            }
        }
    )
    $('.showPass').click(() => {
        showEye = !showEye
        if(showEye) {
            $('.text-password-name').attr('type', 'text')
            $('.showPass').html('<i class="fa fa-eye-slash" aria-hidden="true"></i> ẩn')
        } else {
            $('.text-password-name').attr('type', 'password')
            $('.showPass').html('<i class="fa fa-eye" aria-hidden="true"></i> hiện')
        }
    })
});
