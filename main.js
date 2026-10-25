
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Afficher automatiquement l'année actuelle
    const yearElements = document.querySelectorAll("#current-year");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // Gestion du menu de navigation mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    function closeMenu() {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fermer le menu" : "Ouvrir le menu"
        );
    });

    // Fermer le menu après le choix d'une page
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Fermer le menu si l'utilisateur clique ailleurs
    document.addEventListener("click", (event) => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

});
