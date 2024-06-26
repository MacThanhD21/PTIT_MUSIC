const handle__BtnToggle = () => {
  const sidebar = document.querySelector(".side-bar");
  const toggleBtn1 = document.querySelector(".toggle-btn-1");
  const toggleBtn2 = document.querySelector(".toggle-btn-2");
  const logoPage = document.querySelector(".inner-logo");
  const main = document.querySelector(".main");
  let sidebarExpanded = true;
  const toggleSidebar = () => {
    sidebar.classList.toggle("active");
    toggleBtn2.classList.toggle("active");
    logoPage.classList.toggle("active");
    const newWidth = sidebarExpanded
      ? "calc(100% - 90px)"
      : "calc(100% - 250px)";
    const newLeft = sidebarExpanded ? "90px" : "250px";
    // console.log(newWidth, newLeft);
    main.style.width = newWidth;
    main.style.left = newLeft;
    sidebarExpanded = !sidebarExpanded;
  };
  toggleBtn1.addEventListener("click", toggleSidebar);
  toggleBtn2.addEventListener("click", toggleSidebar);
};
handle__BtnToggle();
