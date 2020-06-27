$(document).ready(function () {
  $('.num-product-js').change(function (e) {
    e.stopPropagation();
    let quantity = $(this).val();
    let price = $(this).parents('.column-2').prev('.price').attr('data-value');
    let total = $(this).parents('.column-2').next('.price');
    $(total).text(
      Number((parseInt(quantity) * parseInt(price)).toFixed(1)).toLocaleString()
    );
    $(total).attr('data-value', parseInt(quantity) * parseInt(price));
    // Subb total
    let subTotal = 0;
    $('.table_row .column-5').each(function (index, element) {
      subTotal += parseInt($(element).attr('data-value'));
    });
    $('.subtotal').text(Number(subTotal.toFixed(1)).toLocaleString());
    $('.price-total').text(Number(subTotal.toFixed(1)).toLocaleString());

    //Update cart
  });
  $('.shopping-cart-plus').each(function (index, element) {
    $(element).click(calculatePrice);
  });
  $('.shopping-cart-minus').each(function (index, element) {
    $(element).click(calculatePrice);
  });
  function calculatePrice(e) {
    e.stopPropagation();
    let quantity = $(this).siblings('.num-product-js').val();
    let price = $(this).parents('.column-2').prev('.price').attr('data-value');
    let total = $(this).parents('.column-2').next('.price');
    $(total).text(
      Number((parseInt(quantity) * parseInt(price)).toFixed(1)).toLocaleString()
    );
    $(total).attr('data-value', parseInt(quantity) * parseInt(price));
    // Subb total
    let subTotal = 0;
    $('.table_row .column-5').each(function (index, element) {
      subTotal += parseInt($(element).attr('data-value'));
    });
    $('.subtotal').text(Number(subTotal.toFixed(1)).toLocaleString());
    $('.price-total').text(Number(subTotal.toFixed(1)).toLocaleString());

    //Update cart
    let currentSubId = $(this).parents('.table_row').attr('data-subid');
    $('.header-cart-item').each(function (index, element) {
      if ($(element).attr('data-subid') == currentSubId) {
        $(element).find('.header-cart-item-info-quantity').text(quantity);
      }
    });
  }

  function removeFromCart2(e) {
    let subProductId = $(e.target).parents('.table_row').attr('data-subId');
    $.ajax({
      type: 'POST',
      url: '/remove-from-cart',
      data: { subProductId },
      success: function (status) {
        if (status) {
          $(e.target).parents('.table_row').remove();
          // $('.header-cart-total span').text(0);
          resetNumberCart();
          // $('.header-cart-total span').text(calulateTotals());
          calculatePrice();
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('some error');
      },
    });
  }
  //remove from cart
  // $('.how-itemcart1').click(removeFromCart2);
  function resetNumberCart() {
    $('.js-show-cart').attr(
      'data-notify',
      $('.header-cart-wrapitem').children().length
    );
  }
});
