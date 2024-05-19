
const logoutButton = document.querySelector('.logoutBtn');
logoutButton.addEventListener('click', function () {
  if (accessToken) {
    deleteCookie('accessToken');
    localStorage.removeItem('userInfoDisplayed');
    window.location.href = '/sign_in.html';
  } else {
    window.location.href = '/sign_in.html';
  }
});
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}