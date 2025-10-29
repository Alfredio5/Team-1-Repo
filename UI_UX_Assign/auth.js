// ✅ auth.js
// Global Authentication & UI Sync Logic with Role Support

// Ensure students.js is loaded FIRST

// Global state
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

// ✅ Runs on every page load
document.addEventListener("DOMContentLoaded", () => {
  injectLoginModal(); // Add modal if missing
  updateLoginDisplay(); // Display user status
});

// ✅ Handles Login/Logout Button Click
function handleLoginLogout() {
  if (loggedInUser) {
    // Logout
    loggedInUser = null;
    localStorage.removeItem("loggedInUser");
    updateLoginDisplay();
    alert("You have been logged out.");
  } else {
    // Login
    openLoginModal();
  }
}

// ✅ Update header UI based on login state
function updateLoginDisplay() {
  const loginBtn = document.getElementById("loginBtn");
  const displayName = document.getElementById("loggedInName");

  if (!loginBtn || !displayName) return; // Safety check

  if (loggedInUser) {
    displayName.textContent = `${loggedInUser.name} (${loggedInUser.role})`;
    loginBtn.textContent = "Log Out";
  } else {
    displayName.textContent = "Not Logged In";
    loginBtn.textContent = "Log In";
  }
}

// ✅ Helper to get full logged-in user object
function getLoggedInUser() {
  return loggedInUser;
}

// ✅ Injects login modal dynamically
function injectLoginModal() {
  if (document.getElementById("loginModal")) return;

  const modalHTML = `
    <div id="loginModal" class="modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); justify-content:center; align-items:center;">
      <div class="modal-content" style="background:#fff; padding:20px; border-radius:8px; width:300px; text-align:center;">
        <h3>Login</h3>
        <input type="text" id="loginUsername" placeholder="Enter Username" style="width:90%; padding:8px; margin:10px 0;" />
        <input type="password" id="loginPassword" placeholder="Enter Password" style="width:90%; padding:8px; margin:10px 0;" />
        <button onclick="login()" style="background:#6f7639; color:#fff; border:none; padding:8px 14px; border-radius:4px; cursor:pointer; font-weight:bold;">Log In</button>
        <button onclick="closeLoginModal()" style="background:#ccc; color:#000; border:none; padding:8px 14px; border-radius:4px; cursor:pointer; margin-left:10px;">Cancel</button>
        <div id="loginMessage" style="color:red; margin-top:10px;"></div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// ✅ Open Modal
function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "flex";
}

// ✅ Close Modal
function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "none";
  const loginMessage = document.getElementById("loginMessage");
  if (loginMessage) loginMessage.textContent = "";
}

// ✅ Perform Login
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const loginMessage = document.getElementById("loginMessage");

  const user = students.find(u => u.username === username && u.password === password);

  if (user) {
    loggedInUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role
    };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful!";
    setTimeout(() => {
      closeLoginModal();
      updateLoginDisplay();
      alert(`Logged in as ${loggedInUser.name} (${loggedInUser.role})`);
    }, 500);
  } else {
    loginMessage.textContent = "Invalid username or password.";
  }
}
