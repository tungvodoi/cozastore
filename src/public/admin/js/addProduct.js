//config tag color and size
// $('.color').tagsinput({
//   trimValue: true,
//   confirmKeys: [13, 44],
// });
// $('.size').tagsinput({
//   trimValue: true,
//   confirmKeys: [13, 44],
// });
// $('.bootstrap-tagsinput input').on('keypress', function (e) {
//   if (e.keyCode == 13) {
//     e.keyCode = 188;
//     e.preventDefault();
//   }
// });
//config image upload
$('.input-images').imageUploader();

// category

$('#add-product-category').keyup(function () {
  $('.autocomplete').empty();
  $.post(
    'get-category-and-sub',
    { keyword: $('#add-product-category').val() },
    function (data) {
      // console.log(data);
      let categoryTemplate = ``;
      data.forEach((child) => {
        categoryTemplate += `<li>${child.category} > <span class="sub">${child.subCategory}</span></li>`;
      });
      $('.autocomplete').append(categoryTemplate);
      $('.autocomplete li').click(function () {
        $('#add-product-category').val($(this).find('.sub').text())
        $('.autocomplete').empty();
      });
    }
  );
});
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
