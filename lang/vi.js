const transErrors = {
  server_error: 'Something went wrong',
  image_type: 'File type is not valid',
  image_size: 'Maximum file size is 1MB',
  add_product: 'Cannot add product now, Something went wrong',
  add_category: 'Cannot add category now, Something went wrong',
  add_category_exitst: 'Category is exists',
  add__sub_category_exitst: 'Sub category is exists',
  login_failed: 'Wrong username or password',
  account_not_active: 'Account is not active',
  editProduct: 'Edit product not success',
  delete_product_image: 'Cannot delete image now',
  delete_product: 'Cannot delete product now',
  order: 'Some thing went wrong',
  token_undefinded: 'Token is not exists',
};
const transSuccess = {
  userCreated: (userEmail) => {
    return `Account ${userEmail} was created. Please check your email to active account`;
  },
  add_product: 'Add product success',
  add_category: 'Add category success',
  editProduct: 'Edit product success',
  account_actived: 'Account actived, you can login now',
};
const transValidation = {
  category_incorrect: 'Name category is incorrect',
  sub_category_incorrect: 'Name subcategory is incorrect',
  username_invalid: 'Your username is invalid',
  email_invalid: 'Your email is invalid',
  password_invalid:
    'Your password is invalid, you have to enter at least 4 character',
  password_confirmation_inccorect: 'Your password confirm is incorrect',
  add_product_name: 'Product name must have at least 4 character',
  add_product_price: 'Price must be number',
  add_product_color: 'You have to fill to color',
  add_product_size: 'You have to fill to size',
  add_product_quantity: 'You have to fill to quantity',
  add_product_images: 'You have to add at least 1 image',
};
const transMail = {
  subject: 'Cozastore: Xác nhận kích hoạt tài khoản.',
  template: (linkVerify) => {
    return `
    <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên Cozastore </h2>
    <h3>Vui lòng click vào liên kết dưới để xác nhận kích hoạt tài khoản</h3>
    <a href=${linkVerify} target="_blank">Xác nhận</a>
    `;
  },
  send_failed: 'Some thing went wrong went send email email',
};
module.exports = {
  transErrors,
  transSuccess,
  transValidation,
  transMail,
};
