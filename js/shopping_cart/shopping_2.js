$(document).ready(function () {
    priceVOUCHER = localStorage.getItem('voucher')
    let arrSetUnique = []
    carts.map(item => {
        if(!compare(arrSetUnique, item.id, item.price)) {
            arrSetUnique.push(item)
        }
    })

    let elements = () => 
         arrSetUnique.map(item => 
            `
                <div>
                    <h4>${item.title}</h4>
                    <p class="text-muted">Dung lượng: ${item.memory}</p>
                    <p class="text-muted">Giá: ${convertMoney(item.price)}</p>
                    <p class="text-muted">Số lượng: ${getCountItem(carts, item.id, item.price)}</p>
                    <h5 class="text-muted">${convertMoney(item.price*getCountItem(carts, item.id, item.price))}</h5>
                </div>
            `).join('')
    
  $(".sum_payment").empty().append(
    `
        <h3  class="sum_payment--title">Đơn hàng</h3>
            <div class="sum__payment--detail">
                ${elements()}
                <hr>
                <p>Giảm giá</p>
                <h4 class = "text-end">${convertMoney(Number(priceVOUCHER))}</h4>
                <p>Tổng</p>
                <h3 class = "text-end">${convertMoney(sumNotVoucher()-priceVOUCHER)}</h3>
                <div class="howpayment">
                    <label>
                        <input type="radio" name="pay" checked="checked">Chuyển khoản ngân hàng</label>
                        <p>Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.</p>
                        <p>Vietinbank: 1929429924924 - P T C</p>    
                    <label>
                        <input type="radio" name="pay">Trả tiền mặt khi nhận hàng</label>
                </div>
            </div>
        <a onclick="checkDuLieu()" class="btn btn-danger">Thanh toán ngay</a>
        <a href="/html/shopping__cart/shopping_cart_3.html" class="btn btn-danger btn-sm">Bỏ qua nếu test</a>
        `
  );
  getRandom = () => {
      return 'A194' + Math.ceil(Math.random()*100)
  }
  $('.detail').append(
      `
      <div class="sum__payment--detail">
            <p>Mã đơn: ${getRandom()}</p>
            <div class="detail_list">
                ${elements()}
            </div>
            <hr>
            <p>Giảm giá</p>
                <h4>${convertMoney(Number(priceVOUCHER))}</h4>
            <h4>Tổng</h4>
            <h3>${convertMoney(sumNotVoucher()-priceVOUCHER)}</h3>
            <h2 class="text-danger">Đã thanh toán</h2>
            <a href="/index.html" class="btn btn-default "><b class="cart_end text-success">Tiếp tục giao dịch khác</b></a>
         </div>
      `
  );
  $('.cart_end').click( () => { 
        carts = [] 
        localStorage.setItem('listCart', JSON.stringify(carts))
        localStorage.setItem('voucher',0)
  });
  $("input[name='pay']").change(() => { 
    console.log($("input[name='pay']:checked").val())

    });
});
