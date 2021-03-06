/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(function () {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    
    getDataFromAjax('http://localhost:3000/products?id=' + id).done(function (response) {
        const item = response[0];
        generateSingle(item)
    })
});

function getDataFromAjax(url) {
    return $.ajax({
		url : url,
		type : 'GET',
		async : true,
		contentType: "application/json; charset=utf-8",
		dataType: 'JSON',
		success : function(data) {
		},
        error : function() {}
	});
}

function generateSingle(item) {
    $('.single-detail-product').text(item.title)
    $('.payment').attr('id', item.id)
    $('.single-product-price').text(item["discount-price"])
    $('.product-undiscount').text(item["undiscount-price"])
    $('#productImage').attr('src', item.pic);
}

// generateSingle(item.title, item.id, item["discount-price"], item["undiscount-price"], item.pic)