let href = window.location.href
let url = new URL(href) //http.asdasd.comg?classify=abc
let param = url.searchParams.get('classify')
let PRICE_CAOCAP = 16000000
let PRICE_TRUNG = 10000000
$(document).ready(function () {
    let  dataProductsClassify = []
    $('.title_list--products span').text(convertVN(param))
    $.getJSON("/js/data.json").done((data) => {
        dataProductsClassify = [...data.dataProducts]
        if(param === "high") {
            dataProductsClassify = dataProductsClassify.filter(item => item.price.low.New >= PRICE_CAOCAP)
        }
        else if(param === "medium") {
            dataProductsClassify = dataProductsClassify.filter(item => item.price.low.New >= PRICE_TRUNG && item.price.low.New < PRICE_CAOCAP)
        }
        else {
            dataProductsClassify = dataProductsClassify.filter(item => item.price.low.New < PRICE_TRUNG)
        }
           dataProducts = [...dataProductsClassify]
           renderProduct(dataProducts)
    })     
    
});