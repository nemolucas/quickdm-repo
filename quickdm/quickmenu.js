const toggleBtn = document.querySelectorAll(".toggle-button");
const dashboardMenu = document.querySelector("#menu-container");

toggleBtn.forEach((button) => {
  button.addEventListener("click", function () {
    dashboardMenu.classList.toggle("open");
  });
});