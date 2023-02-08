const toggleBtn = document.querySelector(".toggle-button");
const dashboardMenu = document.querySelector("#menu-container");

toggleBtn.addEventListener("click", function () { dashboardMenu.classList.toggle("open"); });
