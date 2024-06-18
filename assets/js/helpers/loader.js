document.addEventListener("DOMContentLoaded", function () {
  setTimeout(hideLoader, 1000);
});
function hideLoader() {
  const loaderContainer = document.getElementById("container_loader");
  loaderContainer.style.display = "none";
  loaderContainer.style.transition = "all 0.5s";
}
