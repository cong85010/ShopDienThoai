const VOUCHER = "provip";
let priceVOUCHER = 0;
function handleVoucher() {
    let voucher = document.getElementById('voucher').value
    if(voucher.trim().length == 0) {
        alert('Vui lòng nhập mã - (Voucher: "provip")')
    } else {
        if(voucher !== VOUCHER) {
            alert('Mã giảm giá không đúng')
        } else {
            alert('Áp dụng mã thành công')
            priceVOUCHER = 1000000;
        }
    }
    localStorage.setItem('voucher',priceVOUCHER)
    renderCart()
}


function compare(arr, key, price) {
    //not finded
    return arr.find(item => item.id === key && item.price === price)
}
function getCountItem(arr, item, price) {
    return arr.filter(x => x.id === item && x.price === price).length
}
function deleteItem(id, price) {
    let indexRM = carts.findIndex((item) => item.id == id && item.price == price)
    if(indexRM == -1) return
    if(indexRM === 0) {
        if(getCountItem(carts, id, price) === 1) {
            if(confirm('Bạn chắc chắn muốn bỏ sản phẩm này')) {
                carts = []
            }
        } else {
            carts.splice(1, 1)
        }
    }
    else {
        if(getCountItem(carts, id, price) === 1) {
            if(confirm('Bạn chắc chắn muốn bỏ sản phẩm này')) {
                carts.splice(indexRM, 1)
            }
        } else  {
            carts.splice(indexRM, 1)
        }
    }
    localStorage.setItem('listCart', JSON.stringify(carts))
    renderCart()
}
function addItem(id, price) {
    let itemAdd = carts.find((item) => item.id == id && item.price == price)
    carts.push(itemAdd)
    localStorage.setItem('listCart', JSON.stringify(carts))
    renderCart()
}
function removeAll(id, price) {
    if(confirm('Bạn chắc chắn muốn bỏ sản phẩm này')) {
        carts = carts.filter(item => item.id !== id && item.price === price)
        localStorage.setItem('listCart', JSON.stringify(carts))
        renderCart()
    }
}
renderCart()
function renderCart() {
    $('.payment__tableBody').empty()
    $('.sum_payment').empty()
    let arrSetUnique = []
    carts.map(item => {
        if(!compare(arrSetUnique, item.id, item.price)) {
            arrSetUnique.push(item)
        }
    })
    if(arrSetUnique[0] == undefined) {
        $('.payment__tableBody').text("Chưa có sản phẩm")
        $('.sum_payment').text("Chưa có sản phẩm")
        return
    }
    arrSetUnique.forEach(item => {
        let count = getCountItem(carts, item.id, item.price)
        $('.payment__tableBody').append(
            `
            <tr>
                <td><a onclick="removeAll('${item.id},${item.price}'); return false" href="#"><i class="fa fa-times" aria-hidden="true"></i></a></td>
                <td><img height="100" width="100"
                        src=${item.img}
                        alt="">
                </td>
                <td>
                    <h4>${item.title}</h4>
                    <p>
                        Dung lượng: ${item.memory}<br>
                        Tình trạng: Mới<br>
                        Màu sắc: Trắng
                    </p>
                </td>
                <td class="nav__pc"><h5>${convertMoney(item.price)}</h5></td>
                <td class="nav__pc">
                    <div class="payment__tableBody--count">
                        <i onclick="deleteItem('${item.id}',${item.price})" class="fa fa-minus count_minus" aria-hidden="true"></i>
                        <span>${count}</span>
                        <i onclick="addItem('${item.id}',${item.price})" class="fa fa-plus count_plus" aria-hidden="true"></i>
                    </div>
                </td>
                <td><h5>${convertMoney(item.price*count)}</h5></td>
            </tr>
            `
        );
    })
    $('.sum_payment').append(
        `<h3 class="sum_payment--title">Tổng giỏ hàng</h3>
            <div class="sum__payment--detail">
                <p>Tạm tính</p>
                <h4>${convertMoney(sumNotVoucher())}</h4>
                <p>Giảm giá</p>
                <h4>${convertMoney(priceVOUCHER)}</h4>
                <hr>
                <p>Tổng</p>
                <h3>${convertMoney(sumNotVoucher()-priceVOUCHER)}</h3>
            </div>
        <a href="/html/shopping__cart/shopping_cart_2.html" class="btn btn-danger">Thanh toán ngay</a>
    `)
}
function sumNotVoucher() {
    let sum = 0
    carts.map((item) => sum += Number(item.price))
    return sum
}


