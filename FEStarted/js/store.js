function addToSingleCart(event) {
    const newItem = addSingleToCartStorage(event);
    generateCartItem(newItem);
    checkCart();
}

function addSingleToCartStorage(event) {
    const $item = $(event.target).closest('.payment');
    const name = $item.find('.product-detail-name').text();
    const price = parseFloat($item.find('.product-price').text().replace('$', ''));
    const count = 1;
    const id = $item.attr('id');

    const newItem = {
        price: price,
        name: name,
        count: count,
        id: id
    }
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[id]) {
        cart[id].count = parseInt(cart[id].count) + 1;
    } else {
        cart[id] = newItem;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return newItem;
}


function addToCart(event) {
    const newItem = addToCartStorage(event);
    generateCartItem(newItem);
    checkCart()
}

function closeEmptyPop(event) {
    var closeEmptyClicked = event.target;
    closeEmptyClicked.parentElement.style.display = 'none';
}

function openCart(event) {
    var openClicked = event.target;
    var openContainer = openClicked.parentElement;
    var popEmpty = openContainer.getElementsByClassName('empty-cart')[0];
    var popUp = openContainer.getElementsByClassName('cart-pop')[0];
    var cartRows = popUp.getElementsByClassName('cart-item');
    if(cartRows.length == 0) {
        popEmpty.style.display = 'block';
    } else {
        popUp.style.display = 'block';
        updateCartTotal();
    }
}

function closeCart(event) {
    var closeClicked = event.target;
    closeClicked.parentElement.style.display = 'none';
    
}
function deleteCheckItem(event) {
    const $item = $(event.target).closest('.checkout-product-info');
    const id = $item.attr('id').replace("check-", "");
    var serviceCharge = parseFloat($('.service-charge').text().replace("$", ""));
    serviceCharge -= 5;
    const cart = JSON.parse(localStorage.getItem('cart'));
    const $cartId = $('#cart-' + id);
    const $cartItem = $($cartId).closest('.cart-item');
    const $basketId = $('#basket-' + id);
    const $basketItem = $($basketId).closest('.basket-item-detail');
    delete cart[id]
    $('.service-charge').text(serviceCharge);
    $basketItem.remove();
    $cartItem.remove();
    $item.remove();
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartTotal();
}
function deleteItem(event) {
    var serviceCharge = parseFloat($('.service-charge').text().replace("$", ""));
    serviceCharge -= 5;
    const $item = $(event.target).closest('.cart-item');
    const id = $item.attr('id').replace("cart-", "");
    const $checkId = $('#check-' + id);
    const $checkItem = $($checkId).closest('.checkout-product-info');
    const $basketId = $('#basket-' + id);
    const $basketItem = $($basketId).closest('.basket-item-detail');
    const cart = JSON.parse(localStorage.getItem('cart'));
    delete cart[id]
    $('.service-charge').text(serviceCharge);
    $checkItem.remove();
    $item.remove();
    $basketItem.remove();

    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartTotal();
}

function checkCart(event) {
    document.getElementsByClassName('cart-pop')[0].style.display = 'block';
}

function quantityChanged(event) {
    var input = event.target.value;
    if(isNaN(input) || input <= 0) {
        return;
    }
    const $item = $(event.target).closest('.cart-item');

    const id = $item.attr('id').replace("cart-", "");
    const cart = JSON.parse(localStorage.getItem('cart'));
    const $checkId = $('#check-' + id);
    const $checkItem = $($checkId).closest('.checkout-product-info');
    const $basketId = $('#basket-' + id);
    const $basketItem = $($basketId).closest('.basket-item-detail');
    for(let x in cart) {
        if(id == cart[x].id) {
            cart[x].count = input;
            $basketItem.find('.basket-item-price').text("$" + ((cart[x].count * cart[x].price) - cart[x].count));
            $item.find(".item-detail-price").text("$" + ((input * cart[x].price) - input));
            $item.find(".item-discount").text("Discount: $" + input + ".00");
            $checkItem.find('.checkout-value').find('span').text(input);
            $checkItem.find(".checkout-price").text("$" + ((input * cart[x].price) - input));
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartTotal();

}

function checkPlus(event) {
    const $item = $(event.target).closest('.checkout-product-info');
    const id = $item.attr('id').replace("check-", "");
    const $cartId = $('#cart-' + id);
    const $cartItem = $($cartId).closest('.cart-item');
    const $basketId = $('#basket-' + id);
    const $basketItem = $($basketId).closest('.basket-item-detail');
    const cart = JSON.parse(localStorage.getItem('cart'));
    for(let x in cart) {
        if(id == cart[x].id) {
            cart[x].count = parseInt(cart[x].count) + 1;
            $basketItem.find('.basket-item-price').text("$" + ((cart[x].count * cart[x].price) - cart[x].count));
            $cartItem.find('.item-quantity').find('input').val(cart[x].count);
            $cartItem.find('.item-detail-price').text("$" + ((cart[x].count * cart[x].price) - cart[x].count))
            $item.find('.checkout-value').find('span').text(cart[x].count);
            $item.find(".checkout-price").text("$" + ((cart[x].count * cart[x].price) - cart[x].count));
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
}

function checkMinus(event) {
    const $item = $(event.target).closest('.checkout-product-info');
    const id = $item.attr('id').replace("check-", "");
    const $cartId = $('#cart-' + id);
    const $cartItem = $($cartId).closest('.cart-item');
    const $basketId = $('#basket-' + id);
    const $basketItem = $($basketId).closest('.basket-item-detail');
    const cart = JSON.parse(localStorage.getItem('cart'));
    for(let x in cart) {
        if(id == cart[x].id) {
            const currVal = $item.find('.checkout-value').find('span').text();
            if(currVal == '1') {
                return;
            }
            cart[x].count -= 1;
            $basketItem.find('.basket-item-price').text("$" + ((cart[x].count * cart[x].price) - cart[x].count));
            $cartItem.find('.item-quantity').find('input').val(cart[x].count);
            $cartItem.find('.item-detail-price').text("$" + ((cart[x].count * cart[x].price) - cart[x].count))
            $item.find('.checkout-value').find('span').text(cart[x].count);
            $item.find(".checkout-price").text("$" + ((cart[x].count * cart[x].price) - cart[x].count));
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
}

function addToCartStorage(event) {
    const $item = $(event.target).closest('.product-name');
    const name = $item.find('.product-detail-name').text();
    const price = parseFloat($item.find('.product-price').text().replace('$', ''));
    const count = 1;
    const id = $item.attr('id');
    const srcPic = $item.closest('figure').find('img').attr('src')
    
    const newItem = {
        price: price,
        name: name,
        count: count,
        id: id,
        pic: srcPic
    }
    
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[id]) {
        cart[id].count = parseInt(cart[id].count) + 1;
    } else {
        cart[id] = newItem;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return newItem;
}

function generateCartItem(newItem) {
    generateCartItemAction(newItem);
    updateCartTotal();
}

function generateCartRow(newItem) {

}
function generateCartItemAction(newItem) {
    var cartRow = document.createElement('li');
    cartRow.setAttribute("id", "cart-" + newItem.id);
    cartRow.classList.add('cart-item');
    
    var cartItems = document.getElementsByClassName('cart-all-items')[0];
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[newItem.id] && document.getElementById("cart-" + newItem.id)) {
        let currentItem = document.getElementById("cart-" + newItem.id);
        let cartItemQuantity = document.getElementById('item-quantity-' + newItem.id);
        let cartItemPrice = currentItem.getElementsByClassName('item-detail-price')[0];
        let cartItemDiscount = currentItem.getElementsByClassName('item-discount')[0];
        let quantity = parseInt(cartItemQuantity.value);
        quantity += 1;
        newItem.price *= quantity;
        newItem.price -= quantity;
        cartItemDiscount.innerHTML = "Discount: $" + quantity + ".00";
        cartItemPrice.innerHTML = '$ ' + newItem.price;
        cartItemQuantity.value = quantity;
        updateCartTotal();
        return;
    }

    var cartRowContents = `
    <div class="item-name">
        <a class="item-detail-name" href="#">${newItem.name}</a>
        <p class="item-discount">Discount: $1.00</p>
    </div>

    <div class="item-quantity">
        <input class="item-quantity-detail" name="quantity_1" type="text" pattern="[0-9]*" value="1" onChange=quantityChanged(event) required id="item-quantity-${newItem.id}">
    </div>

    <div class="item-remove">
        <button type="button" class="btn-remove" onclick=deleteItem(event)>x</button>
    </div>

    <div class="item-price">
        <p class="item-detail-price">$${newItem.price - 1}</p>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('item-quantity-detail')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    let services = 0;
    for(let x in cart) {
        total += (cart[x].price * cart[x].count) - cart[x].count;
        services += 5;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-cart')[0].innerHTML = 'Subtotal: $' + total + ' USD';
    $('.total-basket-result').text('$' + (total + services));
}

