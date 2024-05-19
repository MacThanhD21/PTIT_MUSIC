import { getCookie, setCookie } from "./helpers/cookies.js";

const $ = document.querySelector.bind(document);

const signInForm = $("#Sign__in");
const registerLink = $(".register-link a");
const backBtn = $(".back-btn");
const usernameInput = $("#username-sign-in");
const passwordInput = $("#password-sign-in");
const passwordIconLock = document.querySelector(".fa-lock");
const passwordIconUnlock = document.querySelector(".fa-unlock");
const iconPassword = document.querySelector(".icon-password");

try {
  iconPassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordIconLock.style.display = "none";
      passwordIconUnlock.style.display = "block";
    } else {
      passwordInput.type = "password";
      passwordIconLock.style.display = "block";
      passwordIconUnlock.style.display = "none";
    }
  });
  backBtn.addEventListener("click", function () {
    // Redirect to the login page
    signUpForm.classList.remove("active");
    signInForm.classList.add("reactive");
    signInForm.classList.remove("active");
  });

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    signInForm.classList.remove("reactive");
    signInForm.classList.toggle("active");
    signUpForm.classList.toggle("active");
  });

  // Hàm đăng nhập
  const login = async (user, password) => {
    try {
      const response = await fetch(
        "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/validateauth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, password }),
        }
      );

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Unable to login");
    }
  };
  // Lắng nghe sự kiện submit của form đăng nhập
  signInForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    const user = usernameInput.value;
    const password = passwordInput.value;

    try {
      const response = await login(user, password);
      // console.log(response);
      if (response && response.result._id) {
        setCookie("user", JSON.stringify(response.result), 1);
        // Lưu token vào cookie
        setCookie("accessToken", response.result._id, 1); // Thời gian sống của cookie là 1 ngày

        localStorage.setItem("userInfoDisplayed", "true")

        // Chuyển hướng người dùng đến trang chính
        window.location.href = "/index.html";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to login");
    }
  });
} catch (error) {
  console.error("Error:", error);
}
