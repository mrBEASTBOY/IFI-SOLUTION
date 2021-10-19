/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function () {
    $.when (initArray()).then(initSearch());
    
});

const k = [];


function initArray() {
    connectAjax('http://localhost:3000/products')
    connectAjax('http://localhost:3000/food-products')
    connectAjax('http://localhost:3000/veget-fruit')
    connectAjax('http://localhost:3000/beverage')
}

function initSearch() {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    const searchText = searchParams.get('search');
    const $searchContainer = $('#search-container');
    var count = 0;
    for(let i = 0; i < k.length; i++) {
        for(let j = 0; j < k.length; j++) {
            if(k[i][j].title.toLowerCase().includes(searchText.toLowerCase())) {
                count += 1;
                $.get('/components/homeproducts.html', a => {
                    var template = a;
                    generateSearchItem(template, k[i][j], $searchContainer); 
                })
            }
        }
    }
    $('.search-number').find('h2').find('span').text(count);
}
function generateSearchItem(template, i, $searchContainer) {
    $temp = $(template);
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
    $searchContainer.append($temp);
}

function connectAjax(url) {
    $.ajax({
        url: url,
        type : 'GET',
        async : false,
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success : function(data) {
            addProduct(data)
        },
        error : function() {}
    })
}

function addProduct(data) {
    k.push(data);
}
