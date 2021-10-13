if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove');
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('item-quantity-detail');
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    updateCartTotal();
    initCartFromStorage();
    var addToCartButtons = document.getElementsByClassName('shop-btn');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }

    var closeButton = document.getElementsByClassName('close-cart')[0];
    closeButton.addEventListener('click', closeCart);

    var openButton = document.getElementsByClassName('cart')[0];
    openButton.addEventListener('click', openCart);

    var closeEmptyButton = document.getElementsByClassName('close-empty')[0];
    closeEmptyButton.addEventListener('click', closeEmptyPop);

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
    var cartRows = popUp.getElementsByClassName('cart-item').length;
    if(cartRows == 0) {
        popEmpty.style.display = 'block';
    } else {
        popUp.style.display = 'block';
    }
}

function closeCart(event) {
    var closeClicked = event.target;
    closeClicked.parentElement.style.display = 'none';
    
}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove(); 
    updateCartTotal();
}


function checkCart(event) {
    document.getElementsByClassName('cart-pop')[0].style.display = 'block';
}
function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        return;
    }
    var cartProducts = input.parentElement.parentElement;
    var cartProductDiscounts = cartProducts.getElementsByClassName('item-discount')[0];
    var cartProductNames = cartProducts.getElementsByClassName('item-detail-name')[0];
    var cartProductPrices = cartProducts.getElementsByClassName('item-detail-price')[0];
    var cartProductQuantity = cartProducts.getElementsByClassName('item-quantity-detail')[0];
    var name = cartProductNames.innerText;

    var shopProductNames = document.getElementsByClassName('product-detail-name');
    var shopProductPrices = document.getElementsByClassName('product-price');
    var price = 0;
    for(var x = 0; x < shopProductNames.length; x++) {
        console.log(shopProductNames[x].innerText);
        if(name == shopProductNames[x].innerText) {
            price = shopProductPrices[x].innerHTML;
            price = price.replace('$', '');
            price = parseFloat(price.replace('<span>*</span>', ''));
        }
    }
    
    var total = (price * cartProductQuantity.value) - cartProductQuantity.value;
    var discount = 1.00 * cartProductQuantity.value;
    cartProductPrices.innerText = '$ ' + total;
    cartProductDiscounts.innerText = 'Discount: $' + discount + '.00';
    updateCartTotal();
}

function addToCartStorage(event) {
    const $item = $(event.target).closest('.product-name');
    const name = $item.find('.product-detail-name').text();
    const price = parseFloat($item.find('.product-price').text().replace('$', ''));
    const count = 1;
    const id = $item.attr('id');
    console.log(name);
    const newItem = {
        price: price,
        name: name,
        count: count,
        id: id
    }
    
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify({}));
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[id]) {
        cart[id].count += newItem.count;
    } else {
        cart[id] = newItem;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return newItem;
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement.parentElement;
    var name = shopItem.getElementsByClassName('product-detail-name')[0].innerText;
    var price = shopItem.getElementsByClassName('product-price')[0].innerHTML
    var id = shopItem.getElementsByClassName('product-name')[0].id;
    price = price.replace('$', '');
    price = parseFloat(price.replace('<span>*</span>', ''));
    addItemToCart(name, price, id);
    updateCartTotal();
}

function generateCartItem(newItem) {
    generateCartItemAction(newItem);
    updateCartTotal();
}

function initCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    if (cart) {
        const $cart = $('#my-cart');
        for (let key in cart) {
            const item = cart[key];
            const html = `<li id="` + "cart-" + item.id + `">
            <div class="item-name">
                <a class="item-detail-name" href="#">Le Hoang Linh</a>
                <p class="item-discount">Discount: $1.00</p>
            </div>

            <div class="item-quantity">
                <input class="item-quantity-detail" name="quantity_1" type="text" pattern="[0-9]*" value="1" required id="item-quantity-${item.id}">
            </div>

            <div class="item-remove">
                <button type="button" class="btn-remove">x</button>
            </div>

            <div class="item-price">
                <p class="item-detail-price">$1</p>
            </div>
          </li>`;
            const $html = $(html);
            $html.find('.item-quantity-detail').val(item.count);
            $html.find('.item-detail-price').text(item.price);
            $html.find('.item-detail-name').text(item.name);
            $cart.append($html);
            const price = item.count * item.price;
            total += price;
        }
    }
}

function addItemToCart(name, price, id) {
    var cartRow = document.createElement('li');
    cartRow.setAttribute("id", id);
    cartRow.classList.add('cart-item')
    
    var cartItems = document.getElementsByClassName('cart-all-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('item-detail-name');
    var cartItemDiscounts = cartItems.getElementsByClassName('item-discount');
    var cartItemQuantity = cartItems.getElementsByClassName('item-quantity-detail');
    var cartItemPrices = cartItems.getElementsByClassName('item-detail-price');
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == name) {
            var quantity = parseInt(cartItemQuantity[i].value);
            quantity += 1;
            price *= quantity;
            price -= quantity;
            cartItemDiscounts[i].innerHTML = "Discount: $" + quantity + ".00";
            cartItemPrices[i].innerHTML = '$ ' + price;
            cartItemQuantity[i].value = quantity;
            updateCartTotal();
            return;
        }
    }

    var cartRowContents = `
    <div class="item-name">
        <a class="item-detail-name" href="#">${name}</a>
        <p class="item-discount">Discount: $1.00</p>
    </div>

    <div class="item-quantity">
        <input class="item-quantity-detail" name="quantity_1" type="text" pattern="[0-9]*" value="1" required>
    </div>

    <div class="item-remove">
        <button type="button" class="btn-remove">x</button>
    </div>

    <div class="item-price">
        <p class="item-detail-price">$${price - 1}</p>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('item-quantity-detail')[0].addEventListener('change', quantityChanged);
}


function generateCartItemAction(newItem) {
    var cartRow = document.createElement('li');
    cartRow.setAttribute("id", "cart-" + newItem.id);
    cartRow.classList.add('cart-item')
    
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
        <input class="item-quantity-detail" name="quantity_1" type="text" pattern="[0-9]*" value="1" required id="item-quantity-${newItem.id}">
    </div>

    <div class="item-remove">
        <button type="button" class="btn-remove">x</button>
    </div>

    <div class="item-price">
        <p class="item-detail-price">$${newItem.price - 1}</p>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('item-quantity-detail')[0].addEventListener('change', quantityChanged);
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-all-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-item');
    var total = 0;

    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        let priceItem = cartRow.getElementsByClassName('item-detail-price')[0];
        var quantityItem = cartRow.getElementsByClassName('item-quantity-detail')[0];
        let price = parseFloat(priceItem.innerHTML.replace('$', ''));
        let quantity = quantityItem.value;
        total = total + price;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-cart')[0].innerHTML = 'Subtotal: $' + total + ' USD';
}