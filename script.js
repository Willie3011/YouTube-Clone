const menuButton = document.querySelectorAll(".menu-button");

menuButton.forEach(button => {
    button.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden")
})
})