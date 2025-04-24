/**
 * cookie-consent.js
 * Gestione del banner e delle preferenze per il consenso cookie
 * using localStorage.
 */

document.addEventListener('DOMContentLoaded', function() {

    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies-btn');
    const declineBtn = document.getElementById('decline-cookies-btn');
    const changeConsentLink = document.getElementById('change-cookie-consent'); // Link nel footer

    // --- Funzioni per gestire localStorage ---
    const setConsentGiven = () => {
        localStorage.setItem('cookie_consent_given', 'true');
        localStorage.removeItem('cookie_consent_declined');
        hideBanner();
        console.log("Consenso cookie accettato.");
        // Qui potresti caricare script futuri che dipendono dal consenso
        // loadOptionalScripts();
    };

    const setConsentDeclined = () => {
        localStorage.setItem('cookie_consent_declined', 'true');
        localStorage.removeItem('cookie_consent_given');
        hideBanner();
        console.log("Consenso cookie rifiutato.");
    };

    const resetConsent = () => {
        localStorage.removeItem('cookie_consent_given');
        localStorage.removeItem('cookie_consent_declined');
        showBanner();
        console.log("Preferenze cookie resettate.");
    };

    const hideBanner = () => {
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
        }
    };

    const showBanner = () => {
         if (cookieBanner) {
            cookieBanner.style.display = 'flex'; // O 'block' a seconda del tuo CSS
        }
    };

    // --- Logica all'avvio ---
    const consentGiven = localStorage.getItem('cookie_consent_given');
    const consentDeclined = localStorage.getItem('cookie_consent_declined');

    if (!consentGiven && !consentDeclined) {
        // Se non c'è né consenso né rifiuto, mostra il banner
        showBanner();
    } else {
        // Altrimenti, assicurati che sia nascosto
        hideBanner();
        // Se il consenso era stato dato, esegui eventuali script opzionali all'avvio
        // if (consentGiven) {
        //    loadOptionalScripts();
        // }
    }

    // --- Event Listeners ---
    if (acceptBtn) {
        acceptBtn.addEventListener('click', setConsentGiven);
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', setConsentDeclined);
    }

    // Listener per il link "Modifica Consenso" nel footer
    if (changeConsentLink) {
        changeConsentLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previene il comportamento predefinito del link (#)
            resetConsent();
        });
    }

});

// Esempio di funzione per caricare script opzionali (es. Analytics)
// function loadOptionalScripts() {
//     console.log("Caricamento script opzionali (es. Analytics)...");
//     // Aggiungi qui il codice per caricare Google Analytics o altri script
//     // che richiedono il consenso. Esempio:
//     // var script = document.createElement('script');
//     // script.src = 'url_analytics.js';
//     // document.head.appendChild(script);
// }