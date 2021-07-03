//value
let priceNew = 0
let priceOld = 0
let memmorySelected = ''

$(document).ready(function () {
    let posNav = $('.container__top').offset().top
    let posPhone = $('.product__intro-fixed').offset().top
    $(window).scroll(() => {
        let position = $('html, body').scrollTop();
        if (position >= posNav) {
            $('.product--detail').css({ 'padding-top': posNav + 'px' });
            $('.container__top').addClass("container__top--fixed");
        } else {
            $('.product--detail').css({ 'padding-top': 0 + 'px' });
            $('.container__top').removeClass("container__top--fixed");
        }
        if (position >= posPhone) {
            $('.product__intro-fixed').addClass('product__intro-fixed_scroll')
        }
        else {
            $('.product__intro-fixed').removeClass('product__intro-fixed_scroll')
        }
        if (position > 2500) {
            $('.product__intro-fixed').css({ 'opacity': 0, 'transition': '0.3s' })
        } else {
            $('.product__intro-fixed').css({ 'opacity': 1 })
        }

    })
});

//handle 

$(document).ready(function () {

    $.getJSON("/js/data.json").done(() => {
        renderProduct()
    })

    let url_string = window.location.href; // www.test.com?id=123
    let url = new URL(url_string);
    let paramValue = url.searchParams.get("id");

    function renderProduct() {

        //Get dt bang voi param truyen vao
        let item = dataProducts.filter(x => x.id == paramValue)[0]
        $('.container__intro--title').text(item.title)
        //load 3 memory
        $('.container__intro--memory').html(item.memory.map((mmr, index) => {
            return `<button id= "mmr_${index}" class="btn-memory btn btn-default btn-sm">${mmr}</button>`
        }))
        //Gan gia tri dau tien memory
        $('.container__intro--memory .btn-memory:first-child').addClass('activeBtn')
        //get Gia dau tien
        $('.product__item--priceOld').text(convertMoney(item.price.low.Old))
        $('.product__item--priceNew').text(convertMoney(item.price.low.New))
        $('.product__intro--img img').attr('src', `${item.img}`)
        $('.product__infor--title').text(item.title)
        $('.product__infor--option select').html(item.memory.map((mmr, index) => { return `<option value="mmr_${index}">${mmr}</option>` }))
        priceNew = item.price.low.New
        memmorySelected = item.memory[0]
        handleBtnMMR(item)
        handleBtnMMR2(item)
    }

    function handleBtnMMR(item) {
        $('.btn-memory').click(function (e) {
            let memmory = e.target.id
            setPrice(memmory, item)
            $('.btn-memory').removeClass('activeBtn')
            $(this).addClass('activeBtn')
        });
    }
    function handleBtnMMR2(item) {
        $('.mySelectMMR').change(function () {
            let memmory = $('.mySelectMMR').val()
            setPrice(memmory, item)
            $('.btn-memory').removeClass('activeBtn')
        });
    }
    function setPrice(MMRID, item) {
        if (MMRID === 'mmr_0') {
            memmorySelected  = item.memory[0]
            priceOld = item.price.low.Old
            priceNew = item.price.low.New
        } else
            if (MMRID === 'mmr_1') {
                memmorySelected  = item.memory[1]
                priceOld = item.price.medium.Old
                priceNew = item.price.medium.New
            } else
                if (MMRID === 'mmr_2') {
                    memmorySelected  = item.memory[2]
                    priceOld = item.price.high.Old
                    priceNew = item.price.high.New
                }
        $('.product__item--priceOld').text(convertMoney(priceOld))
        $('.product__item--priceNew').text(convertMoney(priceNew))
    }
    
});
function getMemomy() {
    return memmorySelected
}
function getPrice() {
    return priceNew
}
function convertMoney(money) {
    return money.toLocaleString('vi', { style: 'currency', currency: 'vnd' });
}
function addCart() {
    let url_string = window.location.href; // www.test.com?id=123
    let url = new URL(url_string);
    let idProduct = url.searchParams.get("id");
    let item = dataProducts.filter(x => x.id == idProduct)[0]
    if(item) {
        item.price = getPrice()
        item.memory = getMemomy()
        carts.push(item)
        localStorage.setItem('listCart', JSON.stringify(carts))
    }
}