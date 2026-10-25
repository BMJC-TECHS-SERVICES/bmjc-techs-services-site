
"use strict";

const BMJC_WHATSAPP = "242040113325";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#quote-form");
    const notice = document.querySelector("#form-notice");
    const whatsappLink = document.querySelector("#contact-whatsapp");

    // Vérifier si le numéro WhatsApp est configuré
    const isConfigured = /^\d{8,15}$/.test(BMJC_WHATSAPP);

    if (whatsappLink && isConfigured) {
        whatsappLink.href = `https://wa.me/${BMJC_WHATSAPP}`;
        whatsappLink.target = "_blank";
        whatsappLink.rel = "noopener noreferrer";
    }

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        if (!isConfigured) {
            notice.textContent =
                "Le numéro WhatsApp de l'entreprise doit encore être configuré.";
            return;
        }

        const name = document.querySelector("#client-name").value.trim();
        const phone = document.querySelector("#client-phone").value.trim();
        const service = document.querySelector("#client-service").value;
        const message = document.querySelector("#client-message").value.trim();

        const text = [
            "Bonjour BMJC TECHS CONGO,",
            "",
            "Je souhaite demander un devis.",
            `Nom : ${name}`,
            `Téléphone : ${phone}`,
            `Service demandé : ${service}`,
            `Description du projet : ${message}`
        ].join("\n");

        const url = new URL(`https://wa.me/${BMJC_WHATSAPP}`);
        url.searchParams.set("text", text);

        notice.textContent =
            "WhatsApp va s'ouvrir. Vérifiez votre demande avant de l'envoyer.";

        window.open(url.toString(), "_blank", "noopener,noreferrer");
    });

    // Préselectionner le service demandé depuis un lien
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");

    const serviceAliases = {
        videosurveillance: "Vidéosurveillance",
        reseaux: "Réseaux informatiques",
        clotures: "Clôtures électriques",
        maintenance: "Maintenance informatique"
    };

    const serviceSelect = document.querySelector("#client-service");

    if (requestedService && serviceAliases[requestedService]) {
        serviceSelect.value = serviceAliases[requestedService];
    }
});
