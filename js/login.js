document.getElementById('form-login').addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === "admin" && pass === "123") {
    localStorage.setItem("login", "true");

    // Cek apakah sebelumnya user diarahkan dari tombol beli
    const redirectTo = localStorage.getItem("redirectAfterLogin");

    alert("Login berhasil!");

    if (redirectTo === "transaksi") {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = "transaksi.html";
    } else {
      window.location.href = "index.html";
    }

  } else {
    alert("Username atau password salah.");
  }
});
