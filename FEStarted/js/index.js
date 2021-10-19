$(document).ready(function() {
    initPage();
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
                <p class="item-discount">Discount: $` + item.count + `.00</p>
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
    const $startPro = $('#start-pro');
    const $singlePro = $('#single-product-detail');
    $.get('/components/header.html', data => {$start.append(data)})
    $.get('/components/footer.html', data => {$end.append(data)})
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
        $temp.find('.product1').append('<a href="single.html?id=' + i.id + '&type=' + i.from + '" onclick=getId(event)><img src="' + i.pic + '" alt="" class="img-res"></a>');
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

function search(event) {
    const searchText = $('.searchPro-lg').val();
    const searchTextMobile = $('#search-pop-md').find('searchPro').val();
    $('.search-lg').find('a').attr('href', 'search.html?search=' + searchText);
    $('#search-pop-md').find('form').attr('action', 'search.html?search=' + searchTextMobile);
}


