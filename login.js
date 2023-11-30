const form = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  const check = listUser.findIndex(
    (item) => item.username === username && item.password === password
  );

  if (check >= 0) {
    localStorage.setItem("userInfo", JSON.stringify(listUser[check]));
    window.location.href = "./staff.html";
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu");
  }
});

function register() {
  window.location.href = "./register.html";
}

function isPasswordValid(password) {
  if (password.length < 8 || password.length > 12) {
    return false;
  }

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

  if (!(hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar)) {
    return false;
  }

  const username = usernameInput.value;
  if (password.toLowerCase().includes(username.toLowerCase())) {
    return false;
  }

  return true;
}

function checkPasswordValidity() {
  const password = passwordInput.value;
  const isValid = isPasswordValid(password);

  if (!isValid) {
    alert(
      "Mật khẩu không đáp ứng yêu cầu bảo mật. Mật khẩu phải có độ dài từ 8-12 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt. Mật khẩu không được chứa thông tin cá nhân."
    );
  }
}

form.addEventListener("submit", checkPasswordValidity);
