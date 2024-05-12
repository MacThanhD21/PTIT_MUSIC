import { getCookie, setCookie, deleteAllCookies, deleteCookie } from "./helpers/cookies.js";

const $ = document.querySelector.bind(document);

const updateUserInfo = () => {
  const user = JSON.parse(getCookie("user"));
  if (user) {
    const userAvatar = $("#imgUser");
    const userName = $(".container__username span");
    console.log(userAvatar, userName);

    userAvatar.src = user.profilePictureUrl;
    userName.textContent = user.username;
  }
};

updateUserInfo();