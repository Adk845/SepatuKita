
    const container = document.getElementById("list-transaksi");
    let transaksi = JSON.parse(localStorage.getItem("riwayatTransaksi")) || [];

    function renderTransaksi() {
      container.innerHTML = "";

      if (transaksi.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Belum ada transaksi.</p>";
        return;
      }

      transaksi.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("transaksi-item");
        div.innerHTML = `
          <img src="${item.gambar}" alt="${item.produk}">
          <div class="transaksi-detail">
            <h3>${item.produk}</h3>
            <p><strong>Harga:</strong> ${item.harga}</p>
            <p><strong>Nama:</strong> ${item.namaPembeli}</p>
            <p><strong>Alamat:</strong> ${item.alamat}</p>
            <p><strong>Pembayaran:</strong> ${item.metode}</p>
            <p><small>${item.tanggal}</small></p>
          </div>
          <button class="hapus-btn" onclick="hapusTransaksi(${index})">Hapus</button>
        `;
        container.appendChild(div);
      });
    }

    function hapusTransaksi(index) {
      if (confirm("Yakin ingin menghapus transaksi ini?")) {
        transaksi.splice(index, 1);
        localStorage.setItem("riwayatTransaksi", JSON.stringify(transaksi));
        renderTransaksi();
      }
    }

    renderTransaksi();

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
