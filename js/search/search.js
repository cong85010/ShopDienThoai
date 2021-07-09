$(document).ready(function () {
    let href = window.location.href
    let url = new URL(href) //http.asdasd.comg?name=abc
    let search =( url.searchParams.get('search') || '').trim()
    let  dataProductsBrand = []
    $('.title_list--products span').text(search)
    $.getJSON("/js/data.json").done(() => {
        dataSearch = dataProducts.filter((item) => item.title.toLowerCase().includes(search))
        loadDataProduct(dataSearch)
            console.log(dataSearch)
        if(dataSearch.length === 0) {
            loadNothing()
        }
    })     
    const loadNothing = () => {
        $('.products').html(
            `<h3 class='text-danger' style="margin: 150px 0">Có lẽ bạn nhập sai tên sản phẩm hoặc chúng tôi chưa có sản phẩm bạn cần quan tâm</h3>`
        )
    }
});
