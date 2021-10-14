$(document).ready(function() {
    initPage();
    initCartFromStorage()

})

function initCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const $cart = $('#my-cart');
        for (let key in cart) {
            const item = cart[key];
            const html = `<li id="` + "cart-" + item.id + `" class="cart-item">
            <div class="item-name">
                <a class="item-detail-name" href="#">Le Hoang Linh</a>
                <p class="item-discount">Discount: $1.00</p>
            </div>

            <div class="item-quantity">
                <input class="item-quantity-detail" name="quantity_1" type="text" pattern="[0-9]*" value="1" onChange=quantityChanged(event) required id="item-quantity-${item.id}">
            </div>

            <div class="item-remove" onclick=deleteItem(event)>
                <button type="button" class="btn-remove">x</button>
            </div>

            <div class="item-price">
                <p class="item-detail-price">$1</p>
            </div>
          </li>`;
            const $html = $(html);
            $html.find('.item-quantity-detail').val(item.count);
            $html.find('.item-detail-price').text("$" + ((item.price - 1) * item.count));
            $html.find('.item-detail-name').text(item.name);
            $cart.append($html);
        }
    }
}

function initPage() {
    const $start = $('#start');
    const $end = $('#end');
    $.get('/components/header.html', data => {$start.append(data)})
    $.get('/components/footer.html', data => {$end.append(data)})
}

