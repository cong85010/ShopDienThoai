$(document).ready(function () {
    let href = window.location.href
    let url = new URL(href) //http.asdasd.comg?name=abc
    let param = url.searchParams.get('name').toLowerCase()
    let  dataProductsBrand = []
    $.getJSON("/js/data.json").done((data) => {
        dataProductsBrand = data.dataProducts.filter(item => 
            item.title.toLowerCase().includes(param))
        loadDataProduct(dataProductsBrand)
    })     
    $('.list__sort').mouseover(() =>  dataProducts = [...dataProductsBrand])
    $('.title_list--products span').text(param)
});
