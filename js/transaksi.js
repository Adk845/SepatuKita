// Cek apakah sudah login
if (localStorage.getItem("login") !== "true") {
  alert("Silakan login terlebih dahulu.");
  localStorage.setItem("redirectAfterLogin", "transaksi.html");
  window.location.href = "login.html";
}

// Daftar produk
const produkList = [
  { nama: "Runner Pro X", harga: "Rp 350.000", gambar: "image/1.png" },
  { nama: "SpeedFlex 2.0", harga: "Rp 420.000", gambar: "image/2.png" },
  { nama: "AeroStep Elite", harga: "Rp 390.000", gambar: "image/3.png" }
];

// Ambil elemen HTML
const produkImg = document.getElementById("produk-img");
const produkNama = document.getElementById("produk-nama");
const produkHarga = document.getElementById("produk-harga");
const produkDetail = document.querySelector(".produk-detail");
const form = document.getElementById("form-transaksi");

// Ambil produk dari localStorage (jika ada)
let produk = JSON.parse(localStorage.getItem("produkDipilih"));

// Tampilkan produk atau dropdown jika belum dipilih
if (!produk) {
  const select = document.createElement("select");
  select.id = "pilih-produk";
  select.required = true;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Pilih Produk --";
  select.appendChild(defaultOption);

  produkList.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${p.nama} - ${p.harga}`;
    select.appendChild(option);
  });

  produkDetail.appendChild(select);

  select.addEventListener("change", function () {
    const selected = produkList[this.value];
    if (selected) {
      produk = selected;
      localStorage.setItem("produkDipilih", JSON.stringify(produk));
      tampilkanProduk(produk);
    }
  });
} else {
  tampilkanProduk(produk);
}

// Fungsi menampilkan produk
function tampilkanProduk(p) {
  produkImg.src = p.gambar;
  produkNama.textContent = p.nama;
  produkHarga.textContent = p.harga;
}

// Submit form transaksi
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!produk) {
    alert("Silakan pilih produk terlebih dahulu.");
    return;
  }

  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const metode = document.getElementById("metode").value;

  const transaksi = {
    namaProduk: produk.nama,
    harga: produk.harga,
    gambar: produk.gambar,
    namaPenerima: nama,
    alamat,
    metode,
    waktu: new Date().toLocaleString()
  };

  const daftarTransaksi = JSON.parse(localStorage.getItem("daftarTransaksi")) || [];
  daftarTransaksi.push(transaksi);
  localStorage.setItem("daftarTransaksi", JSON.stringify(daftarTransaksi));
  localStorage.removeItem("produkDipilih");

  alert("Pesanan berhasil dikirim!");
  window.location.href = "daftar-transaksi.html";
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
