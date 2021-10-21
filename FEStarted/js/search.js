/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function () {
    initSearch();
    
});



function initSearch() {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    const searchText = searchParams.get('search');
    connectAjax('http://localhost:3000/products?title_like=' + searchText);
}

function generateData(data) {
    const $searchContainer = $('#search-container');
    let template = "";
    $.get('/components/homeproducts.html', a => {
        template = a;
        
        for(let i of data) {
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
            $searchContainer.append($temp);
        }
        $('.search-number').find('h2').find('span').text(data.length);
    })
}

function connectAjax(url) {
    $.ajax({
        url: url,
        type : 'GET',
        async : true,
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success : function(data) {
            generateData(data)
        },
        error : function() {}
    })
}


