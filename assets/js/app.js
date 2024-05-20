if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/assets/js/serviceWorker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownBtn = document.getElementById("dropdownBtn");
  if (dropdown && dropdownBtn) {
    const isClickInside =
      dropdown.contains(event.target) || dropdownBtn.contains(event.target);
    if (!isClickInside) {
      dropdown.classList.remove("dropdownMenu");
    }
  }
});
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  const avatar = document.getElementById("avatar");
  const isClickInside =
    avatar.contains(event.target) || dropdown.contains(event.target);
  if (!isClickInside) {
    dropdown.classList.remove("avatarDropdown");
  }
});
function switchMode() {
  document.body.classList.toggle("switchMode");
}
document.getElementById("avatar").addEventListener("click", function (event) {
  const dropdown = document.getElementById("avatarDropdown");
  dropdown.classList.toggle("avatarDropdown");
  event.stopPropagation();
});
document
  .getElementById("avatarDropdown")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
const backTop = document.getElementById("backTop");
const navbarFixed = document.getElementById("navbarFixed");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backTop.classList.add("back-top-active");
  } else if (window.scrollY > 50) {
    navbarFixed.classList.add("nav-fixed-active");
  } else {
    backTop.classList.remove("back-top-active");
    navbarFixed.classList.remove("nav-fixed-active");
  }
});
