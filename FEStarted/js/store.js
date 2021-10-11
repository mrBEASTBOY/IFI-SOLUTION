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
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove(); 
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-all-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-item');
    var total = 0;

    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceItem = cartRow.getElementsByClassName('item-detail-price')[0];
        var quantityItem = cartRow.getElementsByClassName('item-quantity-detail')[0];
        var price = parseFloat(priceItem.innerHTML.replace('$', ''));
        var quantity = quantityItem.value;
        total = total + (price * quantity);
    }

    document.getElementsByClassName('total-cart')[0].innerHTML = 'Subtotal: $' + total + ' USD';
}