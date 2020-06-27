$(document).ready(function () {
  //Config upload image
  $('.input-images').imageUploader();
  // add more color
  $('#add-more-color').click(function () {
    $('.wrap-add-color').last().append(`
  <div class="wrap-add-color">
    <div class="form-group row showcase_row_area">
        <div class="col-md-2 showcase_text_area"><label for="color">Color</label></div>
        <div class="col-md-2 showcase_content_area"><input class="color form-control" type="text" value=""
                name="colors"></div>
        <div class="col-md-2 showcase_text_area"><label for="size">Size</label></div>
        <div class="col-md-2 showcase_content_area"><input class="size form-control" type="text" value="" name="sizes">
        </div>
        <div class="col-md-2 showcase_text_area"><label for="quantity">Quantity</label></div>
        <div class="col-md-2 showcase_content_area"><input class="quantity form-control" type="number" value=""
                name="quantity"></div>
    </div>
  </div>
  `);
  });
  //Config carousel
  let owl = $('.owl-carousel');
  owl.owlCarousel({
    loop: false,
    margin: 10,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  //Delete image
  owl.find('.owl-item').each(function (index, element) {
    $(element).click(function () {
      owl.trigger('remove.owl.carousel', [index]);
      owl.trigger('refresh.owl.carousel');
      $.post(
        '/admin/delete-product-image',
        {
          productId: $('#btn-add-product').val(),
          linkImage: $(element).find('img').attr('data-image'),
        },
        function (statusDelete) {
          if (!statusDelete == true) {
            onsole.log('Some thing went wrong');
          }
        }
      );
    });
  });
});
