// Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav ul');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
  
// Cek status login untuk navbar
const loginItem = document.getElementById("login-item");
const logoutItem = document.getElementById("logout-item");
const transaksiItem = document.getElementById("transaksi-item");

const isLoggedIn = localStorage.getItem("login") === "true";
if (isLoggedIn) {
  if (loginItem) loginItem.style.display = "none";
  if (logoutItem) logoutItem.style.display = "inline-block";
  if (transaksiItem) transaksiItem.style.display = "inline-block";
} else {
  if (loginItem) loginItem.style.display = "inline-block";
  if (logoutItem) logoutItem.style.display = "none";
  if (transaksiItem) transaksiItem.style.display = "none";
}

// Fungsi Logout
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("login");
    localStorage.removeItem("produkDipilih");
    alert("Anda telah logout.");
    window.location.href = "index.html";
  });
}