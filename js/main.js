let carts = JSON.parse(localStorage.getItem('listCart'))||[];
let taiKhoang = JSON.parse(localStorage.getItem('taiKhoang'))||false;
let account = JSON.parse(localStorage.getItem('listAcc'))||[];
let dataBrands = []
let dataClassify = { vn: ["Cao cấp", "Tầm trung", "Cơ bản"], en: ["high", "medium", "low"] }
let dataSlides = []
let dataProducts = []
let dataPopulation = []
let openMenuBool = true
let openMenuLv2 = true
let openMenuLv2_ = true
const MAX_products_page = 16

function handleMobileNav() {
    //handle Responsive Mobile 
    $('.openMenu').click(() => {
        if (openMenuBool) {
            $('.menu__Mobile').css({ 'left': '0%', 'visibility': 'visible' })
        } else {
            $('.menu__Mobile').css({ 'left': '-100%', 'visibility': 'hidden' })
        }
        openMenuBool = !openMenuBool
    })
    $('.menu__Mobile--brand').click(() => {
        if (openMenuLv2_) {
            $('.nav__level2--brand').addClass('nav_level2_mobile')
            $('.nav__level2--classify').removeClass('nav_level2_mobile')
            openMenuLv2 = true
        }
        else
            $('.nav__level2--brand').removeClass('nav_level2_mobile')
        openMenuLv2_ = !openMenuLv2_
    })
    $('.menu__Mobile--classify').click(() => {
        if (openMenuLv2) {
            $('.nav__level2--classify').addClass('nav_level2_mobile')
            $('.nav__level2--brand').removeClass('nav_level2_mobile')
            openMenuLv2_ = true
        }
        else
            $('.nav__level2--classify').removeClass('nav_level2_mobile')
        openMenuLv2 = !openMenuLv2
    })
}

function scrollTopPhone() {
    $('.scrollTop').click(() => {
        $('html, body').scrollTop(0);
    });
}


//Render data
$(document).ready(function () {

    $(window).scroll(() => {
        let posScroll = $('html, body').scrollTop();
        if (posScroll > 700) {
            $('.scrollTop').css({ 'visibility': 'visible' })
        } else {
            $('.scrollTop').css({ 'visibility': 'hidden' })
        }
        scrollTopPhone()
    })

    //get data from dataProducts
    $.getJSON("/js/data.json").done((data) => {
        dataBrands = [...data.dataBrands]
        dataSlides = [...data.dataSlides]
        dataProducts = [...data.dataProducts]
        dataPopulation = [dataProducts[0], dataProducts[2], dataProducts[3], dataProducts[5]]
        loadHeader()
        loadFooter()
        renderSlide()
        renderPopulation()
        rederPavination(dataProducts)
        loadDataProduct(dataProducts)
    })

    function loadHeader() {
        $('#header').load('/html/header/header.html', () => {
            renderBrands()
            renderNavClassify()
            handleMobileNav()
            if(taiKhoang) {
                $('#dangnhapTK').text('Tài khoản')
                $('#dangnhapTK span').text('Tài khoản')
            }
                //search 
            $('#btn-search').click(() => {
                handleSerch()
            })
            $('#search').on('keypress',function(e) {
                if(e.which == 13) {
                    handleSerch()
                }
            });
        })
    }
    const handleSerch = () => {
        let valueSearch = $('#search').val().toLowerCase()
        window.location.href = `/html/search/search.html?search=${valueSearch}`
    }
    function loadFooter() {
        $('#footer').load('/html/footer/footer.html')
    }
    function renderBrands() {
        dataBrands.map(name => {
            $('.nav__level2--brand').append(
                `
                <li class="nav__item">
                    <a href="/html/list--product/list_products.html?name=${name}">${name}</a>
                </li>
                `
            )
        })
    }
    function renderNavClassify() {
        dataClassify.vn.map(item => {
            $('.nav__level2--classify').append(
                `
                    <li class="nav__item">
                        <a href="/html/classify-product/classify_product.html?classify=${convertEN(item)}">${item}</a>
                    </li>
                `
            )

        })
    }
    function renderSlide() {
        dataSlides.map(item => {
            $('.carousel-inner').append(
                `
                <div class="item mySlide">
                    <div class="mySlide__sub">
                        <div class="mySlide__caption">
                            <h1>${item.title}</h1>
                            <span>${item.more.join(' - ')}</span> 
                            <p>${item.memory.join(' - ')}</p>
                            <p><a 
                            class="btn btn-lg btn-primary" 
                            href="/html/product/product.html?id=${item.id}"
                            role="button">Mua Ngay</a></p>
                        </div>
                        <div class="mySlide__img">
                            <img src=${item.img} alt="">
                        </div>
                    </div>
                </div>
                
                `
            )
        })
        $('.mySlide:first-Child').addClass('active')
    }
    function renderPopulation() {
        dataPopulation.map(item => {
            $('.menu__select--population').append(
                `
                <li ><a href="/html/product/product.html?id=${item.id}">${item.title}</a></li>
                `
            )
        })
    }
});

//sort products
$('.list__sort--item').click((event) => {
    if (event.target.id === "priceHight") {
        $(event.target).attr('id', 'priceLow')
        $(event.target).text('Giá thấp')
        sortByPrice(dataProducts, 'up')
    } else
        if (event.target.id === "priceLow") {
            $(event.target).attr('id', "priceHight")
            $(event.target).text('Giá cao')
            sortByPrice(dataProducts, 'down')
        } else
            if (event.target.id === "priceMoney") {
                renderProduct(dataProducts)
            } else
                if (event.target.id === "priceGift") {
                    sortByGift(dataProducts)
                }
});
//high - medium - low == phan loai
function convertEN(string) {
    return dataClassify.en[dataClassify.vn.indexOf(string)]
}
//cao cap - tam trung - co ban ==
function convertVN(string) {
    return dataClassify.vn[dataClassify.en.indexOf(string)]
}

function convertMoney(money) {
    return money.toLocaleString('vi', { style: 'currency', currency: 'vnd' });
}
function sortByPrice(dataPr, tt) {
    let arrData = [...dataPr]
    if (tt === 'up')
        arrData.sort((a, b) => b.price.low.New - a.price.low.New)
    else
        arrData.sort((a, b) => a.price.low.New - b.price.low.New)
    renderProduct(arrData)
}
function sortByGift(dataPr) {
    let arrData = [...dataPr]
    arrData = arrData.sort((a, b) => {
        return (b.price.low.Old - b.price.low.New) - (a.price.low.Old - a.price.low.New)
    })
    renderProduct(arrData)
}
function renderProduct(products) {
    let productsSub = [...products]
    productsSub.length = 16
    $('.products').empty() //xoa tat ca thang con trong thang cha
    if (productsSub.length === 0) {
        $('.products').append('<h4>Hết sản phẩm...</h4>')
        return
    }
    productsSub.map((item) => {
        $('.products').append(
            ` <div id= ${item.id} class="product__item none__tedec col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div class = "product__item2">
                    <a href="/html/product/product.html?id=${item.id}">
                        <div class="product__item--img">
                            <img clas="img-responsive" src=${item.img} alt="">
                        </div>
                        <div class="product__item--infor">
                            <h4>${item.title}</h4>
                            <div class="product__item--memory">
                                ${(item.memory.map(mmr => `<b class="btn btn-default btn-sm">${mmr}</b>`)).join(' ')}
                            </div>
                            <div class="product__item--priceOld">
                            ${convertMoney(item.price.low.Old)}
                            </div>
                            <div class="product__item--price">
                                ${convertMoney(item.price.low.New)}
                            </div>
                        </div>
                    </a>
                </div>
            </div>  
            `
        )
    })
}
function loadDataProduct(dataProducts) {
    let href = window.location.href
    let url = new URL(href)
    let page = (url.searchParams.get('page')|1 )* MAX_products_page 
    let start = page - MAX_products_page
    let dataLoad = [...dataProducts].splice(start, MAX_products_page)
    renderProduct(dataLoad)
}
function rederPavination(dataProducts) {
    let countPage = Math.ceil(dataProducts.length / 16)
    let href = window.location.href
    let url = new URL(href)
    let page = Number(url.searchParams.get('page')||1)
    $('.pagination').append(`<li class="page-item ${page-1||'disabled'}">
                                <a class="page-link" href="${url.pathname}?page=${page-1||1}"  aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                                </a>
                            </li>`);
    for (let i = 1; i <= countPage; i++) {
        $('.pagination').append(`<li class="page-item ${i == page?'active':''}"><a class="page-link" href="${url.pathname}?page=${i}">${i}</a></li>`)
    }
    $('.pagination').append(`<li class="page-item ${page+1<=countPage||'disabled'}">
                                <a class="page-link" href="${url.pathname}?page=${page+1>countPage?countPage:page+1}" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                                </a>
                            </li>`);
}