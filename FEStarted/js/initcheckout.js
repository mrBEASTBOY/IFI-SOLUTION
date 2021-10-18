$(document).ready(function() {
    initPage();
})

function initCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const $cart = $('#my-cart');
        const $checkOut = $('#myCheckOut');
        const $basketOut = $('#basket-list-item');
        const $totalBasketOut = $('#total-basket-pay');
        const $checkContain = $('#checkout-contain');
        var i = 1;
        var total = 0;
        var services = 0;
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

            const basket = `<li class="basket-item-detail" id="` + "basket-" + item.id + `">
            <p class="basket-item-name">Product1</p>
            <p class="basket-item-price">$15.00</p>
            </li>`;

            const check = `<tr class="checkout-product-info" id="` + "check-" + item.id + `">
            <td class="number-check"></td>
            <td class="checkout-image"></td>
            <td class="checkout-quantity">
                <div class="change-quantity change-quantity-minus" onclick=checkMinus(event)></div>
                <div class="checkout-value">
                    <span></span>
                </div>
                <div class="change-quantity change-quantity-plus" onclick=checkPlus(event)></div>
            </td>
            <td class="checkout-name"></td>
            <td class="checkout-price"></td>
            <td><button class="checkout-remove" type="button" class="remove-btn-check" onclick=deleteCheckItem(event)>x</button></td>
            </tr>`;
            const $basket = $(basket);
            const $check = $(check);
            const $html = $(html);
            $html.find('.item-quantity-detail').val(item.count);
            $html.find('.item-detail-price').text("$" + ((item.price - 1) * item.count));
            $html.find('.item-detail-name').text(item.name);
            $cart.append($html);

            $check.find('.checkout-image').append(`<img src="` + item.pic + `" alt="" style="max-width: 100%;">`);
            $check.find('.checkout-price').text("$" + ((item.price - 1) * item.count));
            $check.find('.checkout-value').find('span').text(item.count);
            $check.find('.checkout-name').text(item.name);
            $check.find('.number-check').text(i);
            $checkOut.append($check);


            $basket.find('.basket-item-name').text(item.name);
            $basket.find('.basket-item-price').text("$" + ((item.price - 1) * item.count));
            $basketOut.append($basket);
            i++;
            total += ((item.price - 1) * item.count);
            services += 5;
        }
        total += services;
        $totalBasketOut.append(`<p class="total-title">
        Total
    </p>
    <p class="total-basket-result"> 
        $` + total + `
    </p>`)
        $basketOut.append(`<li class="basket-item-detail">
        <p class="basket-item-name">Total Service Charges</p>
        <p class="basket-item-price service-charge">$`+ services + `.00</p>
        </li>`)
        $checkContain.find('.type-topic').append(`<p class="topic">YOUR SHOPPING CART CONTAINS: ` + (i - 1) + ` PRODUCTS</p>`)
    }
}

function initPage() {
    const $start = $('#start');
    const $end = $('#end');
    const $startPro = $('#start-pro');
    const $singlePro = $('#single-product-detail');
    $.get('/components/header.html', data => {$start.append(data)})
    $.get('/components/footer.html', data => {$end.append(data)})
    $.get('/components/singleproduct.html', data => {$singlePro.append(data)})
    $.get('/components/header-product.html', data => {$startPro.append(data); initCartFromStorage();});
    $.ajax({
        url: 'http://localhost:3000/products',
        type : 'GET',
		async : true,
		contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		success : function(data) {
            generateProduct(data)
		},
        error : function() {}
    })
    $.ajax({
        url: 'http://localhost:3000/food-products',
        type: 'GET',
        async: true,
        contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		success : function(data) {
            generateFoodProduct(data)
		},
        error : function() {}
    })

    $.ajax({
        url: 'http://localhost:3000/veget-fruit',
        type: 'GET',
        async: true,
        contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
        success : function(data) {
            generateVegetProduct(data)
		},
        error : function() {}
    })

    $.ajax({
        url: 'http://localhost:3000/beverage',
        type: 'GET',
        async: true,
        contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
        success : function(data) {
            generateBeverProduct(data)
		},
        error : function() {}
    })
}

function generateProduct(data) {
    const $listProduct = $('#home-product');
    let template = "";
    $.get('/components/homeproducts.html', a => {
        template = a;
        generateCommon(template, data, $listProduct); 
    })
}


function generateFoodProduct(data) {
    const $listProduct = $('#food');
    let template = "";
    $.get('/components/homeproducts.html', a => {
        template = a;
        generateCommon(template, data, $listProduct); 
    })
}

function generateVegetProduct(data) {
    const $listProduct = $('#veget-fruit');
    let template = "";
    $.get('/components/homeproducts.html', a => {
        template = a;
        generateCommon(template, data, $listProduct); 
    })
}

function generateBeverProduct(data) {
    const $listProduct = $('#beverage');
    let template = "";
    $.get('/components/homeproducts.html', a => {
        template = a;
        generateCommon(template, data, $listProduct);  
    })
}


function generateCommon(template, data, $listProduct) {
    for (let i of data) {
        let $temp = $(template);
        $temp.find('.product-name').attr("id", i.id);
        $temp.find('.product-detail-name').text(i.title);
        $temp.find('.product-price').text(i["discount-price"]);
        $temp.find('.product-undiscount').text(i["undiscount-price"]);
        $temp.find('.product1').append('<a href="single.html" onclick=getId(event)><img src="' + i.pic + '" alt="" class="img-res"></a>');
        if(i.types == "tag") {
            $temp.find('.tag-decided').addClass('tag');
            $temp.find('.tag-decided').append('<img src="https://demo.w3layouts.com/demos_new/template_demo/20-07-2017/grocery_store-demo_Free/725976873/web/images/tag.png" alt="tag" class="img-res">')
        } else if(i.types == "offer") {
            $temp.find('.tag-decided').addClass('tag-offer');
            $temp.find('.offer').addClass('offer-left');
            $temp.find('.tag-decided').append('<img src="https://demo.w3layouts.com/demos_new/template_demo/20-07-2017/grocery_store-demo_Free/725976873/web/images/offer.png" alt="tag" class="img-res">')
        }
        $listProduct.append($temp); 
    }
}

function initCheckOutFromStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const $checkOut = $('#myCheckOut');
        for (let key in cart) {
            const item = cart[key];
            const html = `<tr class="checkout-product-info">
                <td></td>
                <td class="checkout-image"><img src="" alt="" style="max-width: 100%;"></td>
                <td>
                    <div class="change-quantity change-quantity-minus"></div>
                    <div class="checkout-value">
                        <span></span>
                    </div>
                    <div class="change-quantity change-quantity-plus"></div>
                </td>
                <td class="checkout-name"></td>
                <td class="checkout-price"></td>
                <td><button class="checkout-remove" type="button" class="remove-btn-check">x</button></td>
            </tr>`;
            const $html = $(html);
            $html.find('.checkout-image').attr('src', item.pic);
            $html.find('.checkout-price').text("$" + ((item.price - 1) * item.count));
            $html.find('.checkout-value').find('span').text(item.count);
            $html.find('.checkout-name').text(item.name);
            $checkOut.append($html);
        }
    }
}