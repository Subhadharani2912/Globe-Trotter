const token = localStorage.getItem("token");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

if (token) {
  loginBtn.classList.add("hidden");
  signupBtn.classList.add("hidden");
  dashboardBtn.classList.remove("hidden");
}
