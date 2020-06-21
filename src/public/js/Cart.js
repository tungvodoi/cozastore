// add to cart
$('.js-addcart-detail').click(function (e) {
  let productId = e.target.attributes['data-id'].value;
  let quantity = parseInt($('.num-product').val());
  $.post('/add-to-cart', { productId, quantity }, function (product) {
    // If product not exists in cart
    if (!productExitsInCart(productId)) {
      $('.header-cart-wrapitem').append(`
      <li class="header-cart-item flex-w flex-t m-b-12" data-id="${productId}">
        <div class="header-cart-item-img">
          <img src="/images/products/${product.images[0]}" alt="IMG">
        </div>
        <div class="header-cart-item-txt p-t-8">
            <a class="header-cart-item-name m-b-18 hov-cl1 trans-04" href="#">${product.productName}</a>
            <span class="header-cart-item-info">
              <span class="header-cart-item-info-quantity">${quantity}</span>
              x 
              <span class="header-cart-item-info-price">${product.price}</span>
              </span>
        </div>
      </li>
      `);
    }
    // reset element remove cart
    $('.header-cart-item-img').click(removeFromCart);
    // the number product in cart
    resetNumberCart();
    //Total
    $('.header-cart-total span').text(calulateTotals());
  });
});
let productExitsInCart = (productId) => {
  let found = false;
  $('.header-cart-item').each((index, element) => {
    if (productId === element.attributes['data-id'].value) {
      let quantity = parseInt($('.num-product').val());
      let currentProduct = $(element).find('.header-cart-item-info-quantity');
      let currentQuantity = parseInt(currentProduct.text());
      currentProduct.text(currentQuantity + quantity);
      found = true;
    }
  });
  return found;
};
// remove from cart
function removeFromCart(e) {
  let productId = $(e.target).parent().attr('data-id');
  $.post('/remove-from-cart', { productId }, function (status) {
    if (status) {
      $(e.target).parent().remove();
      $('.header-cart-total span').text(0);
      resetNumberCart();
      $('.header-cart-total span').text(calulateTotals());
    }
  });
}
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
    let price = $(element).find('.header-cart-item-info-price').text();
    total += parseInt(quantity) * parseInt(price);
  });
  return total;
}
