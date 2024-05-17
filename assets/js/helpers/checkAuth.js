
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}
const accessToken = getCookie('accessToken');
if (!accessToken) {
  window.location.href = '/sign_in.html';
}