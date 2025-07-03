
// Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('nav ul');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
  // Tombol Beli Produk
 // Tombol Beli Produk
const beliButtons = document.querySelectorAll(".beli-btn");

beliButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    const nama = this.dataset.nama;
    const harga = this.dataset.harga;
    const gambar = this.dataset.gambar;

    const produkDipilih = { nama, harga, gambar };
    localStorage.setItem("produkDipilih", JSON.stringify(produkDipilih));

    // Cek apakah sudah login
    if (localStorage.getItem("login") === "true") {
      window.location.href = "transaksi.html";
    } else {
      localStorage.setItem("redirectAfterLogin", "transaksi");
      window.location.href = "login.html";
    }
  });
});

// Cek status login dari localStorage
  const isLoggedIn = localStorage.getItem("login") === "true";

  const loginItem = document.getElementById("login-item");
  const logoutItem = document.getElementById("logout-item");
  const transaksiItem = document.getElementById("transaksi-item");

  if (isLoggedIn) {
    // Jika login: tampilkan Transaksi dan Logout, sembunyikan Login
    if (loginItem) loginItem.style.display = "none";
    if (logoutItem) logoutItem.style.display = "inline-block";
    if (transaksiItem) transaksiItem.style.display = "inline-block";
  } else {
    // Jika belum login: tampilkan Login, sembunyikan Logout dan Transaksi
    if (loginItem) loginItem.style.display = "inline-block";
    if (logoutItem) logoutItem.style.display = "none";
    if (transaksiItem) transaksiItem.style.display = "none";
  }

  // Event listener untuk logout
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("login");
      alert("Anda berhasil logout.");
      window.location.href = "index.html"; // atau halaman lain sesuai kebutuhan
    });
  }
