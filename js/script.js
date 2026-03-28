// ================= MENU =================
const btn = document.getElementById("menuBtn")
const menu = document.getElementById("mobileMenu")

if (btn && menu) {
    btn.onclick = () => {
        menu.classList.toggle("hidden")
    }
}

// ================= PARALLAX =================
const bg = document.getElementById("bgImage")

if (bg) {
    let scale = 1.1

    setInterval(() => {
        scale += 0.0005
        bg.style.transform = `scale(${scale})`
    }, 50)
}

// ================= PARTICLES =================
const canvas = document.getElementById("particles")

if (canvas) {

    const ctx = canvas.getContext("2d")

    function resize() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    let particles = []

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            dx: (Math.random() - 0.5),
            dy: (Math.random() - 0.5)
        })
    }

    function draw() {

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach(p => {

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = "white"
            ctx.fill()

            p.x += p.dx
            p.y += p.dy

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        })

        requestAnimationFrame(draw)
    }

    draw()
}

// ================= TOP BUTTON =================
const topBtn = document.getElementById("topBtn")

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.classList.remove("opacity-0", "translate-y-5", "pointer-events-none")
        } else {
            topBtn.classList.add("opacity-0", "translate-y-5", "pointer-events-none")
        }

    })

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

// ================= FORM =================
const form = document.getElementById("form")

const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")

const firstError = document.getElementById("firstError")
const lastError = document.getElementById("lastError")
const emailError = document.getElementById("emailError")
const passError = document.getElementById("passError")
const confirmError = document.getElementById("confirmError")
const strengthText = document.getElementById("strengthText")

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function showError(input, error) {
    error.classList.remove("hidden")
    input.classList.add("border-red-500")
    shakeInput(input)
}

function hideError(input, error) {
    error.classList.add("hidden")
    input.classList.remove("border-red-500")
}

function shakeInput(input) {
    input.classList.add("shake")
    setTimeout(() => input.classList.remove("shake"), 300)
}

// 👁️ Toggle Password
function togglePassword(id, el) {
    const input = document.getElementById(id)
    input.type = input.type === "password" ? "text" : "password"
    el.textContent = input.type === "password" ? "👁️" : "🙈"
}

// 🎉 Popup
function showPopup() {
    const popup = document.getElementById("successPopup")
    popup.classList.remove("opacity-0", "pointer-events-none")
    popup.children[0].classList.remove("scale-75")
    popup.children[0].classList.add("scale-100")
}

function closePopup() {
    const popup = document.getElementById("successPopup")
    popup.classList.add("opacity-0", "pointer-events-none")
    popup.children[0].classList.remove("scale-100")
    popup.children[0].classList.add("scale-75")
}

// 🔥 Live Validation
firstName.oninput = () =>
    firstName.value.trim() === "" ? showError(firstName, firstError) : hideError(firstName, firstError)

lastName.oninput = () =>
    lastName.value.trim() === "" ? showError(lastName, lastError) : hideError(lastName, lastError)

email.oninput = () =>
    !emailPattern.test(email.value) ? showError(email, emailError) : hideError(email, emailError)

password.oninput = () => {
    if (password.value.length < 6) {
        showError(password, passError)
        strengthText.textContent = "Weak 🔴"
        strengthText.className = "text-red-500 text-sm"
    } else if (/[A-Z]/.test(password.value) && /[0-9]/.test(password.value)) {
        hideError(password, passError)
        strengthText.textContent = "Strong 🟢"
        strengthText.className = "text-green-500 text-sm"
    } else {
        hideError(password, passError)
        strengthText.textContent = "Medium 🟡"
        strengthText.className = "text-yellow-500 text-sm"
    }
}

confirm.oninput = () =>
    confirm.value !== password.value || confirm.value === ""
        ? showError(confirm, confirmError)
        : hideError(confirm, confirmError)

// 🚀 Submit
form.onsubmit = function (e) {
    e.preventDefault()

    let valid = true

    if (firstName.value.trim() === "") {
        showError(firstName, firstError)
        valid = false
    }

    if (lastName.value.trim() === "") {
        showError(lastName, lastError)
        valid = false
    }

    if (!emailPattern.test(email.value)) {
        showError(email, emailError)
        valid = false
    }

    if (password.value.length < 6) {
        showError(password, passError)
        valid = false
    }

    if (confirm.value !== password.value || confirm.value === "") {
        showError(confirm, confirmError)
        valid = false
    }

    if (valid) {
        showPopup()
        form.reset()
        strengthText.textContent = ""
    }
}