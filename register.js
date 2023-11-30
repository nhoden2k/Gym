const form = document.querySelector("#registerForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector(
  "#passwordConfirmation"
);
const fullNameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const passwordConfirmation = passwordConfirmationInput.value;
  const fullname = fullNameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // Kiểm tra xác nhận mật khẩu
  if (password !== passwordConfirmation) {
    alert("Xác nhận mật khẩu không trùng khớp. Vui lòng kiểm tra lại.");
    return;
  }

  // Kiểm tra xem tài khoản đã tồn tại chưa
  const listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  const isExistingUser = listUser.some((user) => user.username === username);

  if (isExistingUser) {
    alert("Tài khoản đã tồn tại. Vui lòng chọn tên đăng nhập khác.");
    return;
  }

  // Kiểm tra tính hợp lệ của mật khẩu
  const isPasswordValid = validatePassword(password);
  if (!isPasswordValid) {
    alert(
      "Mật khẩu không đáp ứng yêu cầu bảo mật. Mật khẩu phải có độ dài từ 8-12 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt."
    );
    return;
  }

  // Kiểm tra tính hợp lệ của email
  const isEmailValid = validateEmail(email);
  if (!isEmailValid) {
    alert("Email không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }

  // Kiểm tra tính hợp lệ của số điện thoại
  const isPhoneValid = validatePhone(phone);
  if (!isPhoneValid) {
    alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }

  const user = {
    username,
    password,
    fullname,
    email,
    phone,
  };

  listUser.push(user);
  localStorage.setItem("listUser", JSON.stringify(listUser));
  usernameInput.value = "";
  passwordInput.value = "";
  passwordConfirmationInput.value = "";
  fullNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  alert("Đăng ký thành công");
});

function login() {
  window.location.href = "./login.html";
}

// Hàm kiểm tra tính hợp lệ của mật khẩu
function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
  return passwordRegex.test(password);
}

// Hàm kiểm tra tính hợp lệ của email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Hàm kiểm tra tính hợp lệ của số điện thoại
function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}
