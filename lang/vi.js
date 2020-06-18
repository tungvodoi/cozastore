const transErrors = {
  server_error: 'Có lỗi ở phía server',
  image_type: 'Kiểu file không hợp lệ',
  image_size: 'Kích thước tối đa là 1MB',
  add_product: 'Thêm sản phẩm thất bại, Có lỗi phía server',
  add_category: 'Thêm category thất bại, Có lỗi phía server',
  add_category_exitst: 'Category đã tồn tại',
  add__sub_category_exitst: 'Sub category đã tồn tại',
};
const transSuccess = {
  add_product: 'Thêm sản phẩm thành công',
  add_category: 'Thêm category thành công',
};
const transValidation = {
  category_incorrect: 'Name category is incorrect',
  sub_category_incorrect: 'Name subcategory is incorrect',
};
module.exports = {
  transErrors,
  transSuccess,
  transValidation,
};
