// Chờ cho tài liệu HTML được tải xong
document.addEventListener("DOMContentLoaded", function () {
  // Sau 3 giây, ẩn loader
  setTimeout(hideLoader, 3500);
});

// Hàm ẩn loader
function hideLoader() {
  const loaderContainer = document.getElementById("container_loader");
  loaderContainer.style.display = "none";
  loaderContainer.style.transition = "all 0.5s";
}