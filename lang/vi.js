const transErrors = {
  server_error: 'Có lỗi ở phía server',
  image_type: 'Kiểu file không hợp lệ',
  image_size: 'Kích thước tối đa là 1MB',
  add_product: 'Thêm sản phẩm thất bại, Có lỗi phía server',
  add_category: 'Thêm category thất bại, Có lỗi phía server',
  add_category_exitst: 'Category đã tồn tại',
  add__sub_category_exitst: 'Sub category đã tồn tại',
  login_failed: 'Sai tài khoản hoặc mật khẩu',
  account_not_active: 'Tài khoản chưa được kích hoạt',
};
const transSuccess = {
  add_product: 'Thêm sản phẩm thành công',
  add_category: 'Thêm category thành công',
};
const transValidation = {
  category_incorrect: 'Name category is incorrect',
  sub_category_incorrect: 'Name subcategory is incorrect',
  username_invalid: 'sai username',
  email_invalid: 'sai email',
  password_invalid: 'sai password',
  password_confirmation_inccorect: 'password_confirmation_inccorect',
};
module.exports = {
  transErrors,
  transSuccess,
  transValidation,
};
