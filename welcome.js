function openModal(type) {
    document.getElementById(`${type}-modal`).style.display = 'flex';
}

function closeModal(type) {
    document.getElementById(`${type}-modal`).style.display = 'none';
}

function login() {
    const user = document.getElementById("login-user").value.trim();
    const pass = document.getElementById("login-pass").value.trim();

    if (!user || !pass) {
        alert("Please fill in all fields!");
        return;
    }

    const storedUser = localStorage.getItem(user);

    if (!storedUser) {
        alert("User not found! Please sign up first.");
        return;
    }

    const data = JSON.parse(storedUser);
    if (data.password === pass) {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", user); // ✅ save current user
        window.location.href = "index.html"; // ✅ redirect to main page
    } else {
        alert("Incorrect password!");
    }
}


function signup() {
    const user = document.getElementById("signup-user").value.trim();
    const pass = document.getElementById("signup-pass").value.trim();

    if (!user || !pass) {
        alert("Please fill in all fields!");
        return;
    }

    if (localStorage.getItem(user)) {
        alert("Username already exists!");
        return;
    }

    const userData = {
        username: user,
        password: pass
    };

    localStorage.setItem(user, JSON.stringify(userData));
    alert("Account created successfully!");
    closeModal('signup');
}