// Kiểm tra xem có cookie chứa token hay không
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// Lấy giá trị của cookie 'accessToken'
const accessToken = getCookie('accessToken');

// Nếu không có token, chuyển hướng người dùng đến trang đăng nhập
if (!accessToken) {
  window.location.href = '/sign_in.html';
}