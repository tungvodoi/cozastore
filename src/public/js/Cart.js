// add to cart
$('.js-addcart-detail').click(function (e) {
  let productId = e.target.attributes['data-id'].value;
  let quantity = parseInt($('.num-product').val());
  let size = $('.js-select2.select-size').val();
  let color = $('.js-select2.select-color').val();
  let name = $('.js-name-detail').text();
  $.ajax({
    type: 'POST',
    url: '/add-to-cart',
    data: { productId, quantity, size, color, name },
    success: function (product) {
      // If product not exists in cart
      if (product.exists) {
        $('.header-cart-item').each((index, element) => {
          if (
            product.productExists.subProductId ===
            element.attributes['data-subId'].value
          ) {
            let currentProduct = $(element).find(
              '.header-cart-item-info-quantity'
            );
            currentProduct.text(product.productExists.newQuantity);
          }
        });
      } else {
        $('.header-cart-wrapitem').append(`
        <li class="header-cart-item flex-w flex-t m-b-12" data-id="${product.productId}" data-subId="${product.subProductId}">
          <div class="header-cart-item-img">
              <img src="/images/products/${product.images[0]}"
                  alt="IMG" />
          </div>
          <div class="header-cart-item-txt p-t-8">
              <a class="header-cart-item-name m-b-18 hov-cl1 trans-04" href="#">${product.productName}</a>
              <span class="header-cart-item-info">
                  <span class="header-cart-item-info-quantity">${product.quantity}</span>
                  x
                  <span class="header-cart-item-info-price">${product.price}</span>
              </span>
              <span class="header-cart-item-info">
                  <span class="header-cart-item-info-size">${product.size}</span>
              </span>
              <span class="header-cart-item-info">
                  <span class="header-cart-item-info-color">${product.color}</span>
              </span>
          </div>
        </li>
        `);
      }
      // reset element to click remove cart
      $('.header-cart-item-img').click(removeFromCart);
      // the number product in cart
      resetNumberCart();
      //Total
      $('.header-cart-total span').text(calulateTotals());
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(textStatus);
    },
  });
});

// remove from cart
function removeFromCart(e) {
  let subProductId = $(e.target).parent().attr('data-subId');
  $.ajax({
    type: 'POST',
    url: '/remove-from-cart',
    data: { subProductId },
    success: function (status) {
      if (status) {
        $(e.target).parent().remove();
        $('.header-cart-total span').text(0);
        resetNumberCart();
        $('.header-cart-total span').text(calulateTotals());
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log('some error');
    },
  });
}
// Remove from Cart
$('.header-cart-item-img').click(removeFromCart);
function resetNumberCart() {
  $('.js-show-cart').attr(
    'data-notify',
    $('.header-cart-wrapitem').children().length
  );
}

function calulateTotals() {
  let total = 0;
  $('.header-cart-item').each((index, element) => {
    let quantity = $(element).find('.header-cart-item-info-quantity').text();
    let price = $(element)
      .find('.header-cart-item-info-price')
      .text()
      .split(',')
      .join('');
    total += parseInt(quantity) * parseInt(price);
  });
  return Number(total.toFixed(1)).toLocaleString();
}
