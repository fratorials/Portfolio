

console.log("Aaaaah sei furbo...");
console.log("Vuoi hackerarmi vero?");


document.addEventListener("DOMContentLoaded", function() {

    // --- Logica Cookie Consent ---
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies-btn');
    const declineBtn = document.getElementById('decline-cookies-btn'); // Assicurati che l'ID esista nell'HTML

    // Verifica se il consenso è già stato dato/rifiutato
    const consentGiven = localStorage.getItem('cookie_consent_given');
    const consentDeclined = localStorage.getItem('cookie_consent_declined');

    // Se non c'è né consenso né rifiuto, mostra il banner
    if (!consentGiven && !consentDeclined && cookieBanner) {
        cookieBanner.style.display = 'flex'; // Mostra il banner (usa 'flex' se usi flexbox nel CSS)
    }

    // Event listener per il bottone "Accetta"
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // Salva il consenso in localStorage
            localStorage.setItem('cookie_consent_given', 'true');
            // Rimuovi eventuale stato di rifiuto precedente
            localStorage.removeItem('cookie_consent_declined');
            // Nascondi il banner
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            // Qui potresti caricare script che dipendono dal consenso (es. Analytics)
            // loadAnalyticsScript();
            console.log("Consenso cookie accettato.");
        });
    }

    // Event listener per il bottone "Rifiuta" (se esiste)
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            // Salva il rifiuto in localStorage
            localStorage.setItem('cookie_consent_declined', 'true');
             // Rimuovi eventuale stato di consenso precedente
            localStorage.removeItem('cookie_consent_given');
            // Nascondi il banner
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            // Assicurati che script non essenziali non vengano caricati
            console.log("Consenso cookie rifiutato.");
        });
    }

    setTimeout(function() {
        var element = document.querySelector(".avvio");
        element.style.opacity = "1";
    }, 1000);


    


    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show'); 
        });
    } else {
        console.error('Pulsante menu rotto');
    }
});


// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });



window.addEventListener("scroll", reveal);

function reveal() {
    var reveals = document.querySelectorAll(".rivela");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 120;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("attivo");
      } else {
        reveals[i].classList.remove("attivo");
      }
    }
}

function reveal2() {
    var reveals = document.querySelectorAll(".rivela_sotto");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 20;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("attivo_sotto");
      } else {
        reveals[i].classList.remove("attivo_sotto");
      }
    }
}



// Effetto crittografia testo
  
window.addEventListener("scroll", reveal2);

const hackerText = document.querySelector('.hacker-text');

hackerText.addEventListener('mouseover', () => {
    const originalText = hackerText.dataset.original;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    console.log("Figo vero? Ora dai, cercalo sul codice javascript");
    
    let interval = setInterval(() => {
        hackerText.innerText = originalText
            .split('')
            .map(letter => (Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : letter))
            .join('');
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        hackerText.innerText = originalText;
    }, 1500);
});

const hackerTextt = document.querySelector('.hacker-text-title');

hackerTextt.addEventListener('mouseover', () => {
    const originalText = hackerTextt.dataset.original;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    let interval = setInterval(() => {
        hackerTextt.innerText = originalText
            .split('')
            .map(letter => (Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : letter))
            .join('');
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        hackerTextt.innerText = originalText;
    }, 1000);
});



//Terminale interattivo

const terminal = document.querySelector('.terminal');
const output = document.getElementById('output');
let currentInput;
let initialTextShown = false; // Flag per evitare che il testo iniziale venga mostrato più volte

function typeText(text, delay = 30) {
    if (initialTextShown) return; // Impedisce l'esecuzione se il testo è già stato mostrato

    let index = 0;
    function type() {
        if (index < text.length) {
            output.innerHTML += text[index] === '\n' ? '<br>' : text[index];
            index++;
            setTimeout(type, Math.random() * 15 + 5);
        } else {
            enableInput();
            initialTextShown = true; // Imposta il flag a true dopo aver mostrato il testo
        }
    }
    setTimeout(type, delay);
}

function enableInput() {
    currentInput = document.createElement('input');
    currentInput.type = 'text';
    currentInput.className = 'terminal-input';
    currentInput.placeholder = 'Digita qui...';
    terminal.appendChild(currentInput);
    currentInput.focus();

    currentInput.addEventListener('keydown', handleInput);
}

function handleInput(event) {
    if (event.key === 'Enter') {
        const value = event.target.value.trim().toLowerCase();
        event.target.value = '';

        const response = document.createElement('div');
        response.className = 'response';

        switch (value) {
            case 'help':
            case 'fra help':
                response.innerHTML = "Comandi disponibili:<br>- help: Visualizza questo messaggio di aiuto<br>- info: Mostra informazioni sul sito<br>- comandi: Elenca tutti i comandi disponibili<br>- chi sei?: Informazioni sull'utente<br>- ciao: Saluta";
                break;
            case 'info':
                response.innerHTML = "Questo è un terminale interattivo. Puoi utilizzare i comandi disponibili per ottenere informazioni.";
                break;
            case 'comandi':
                response.innerHTML = "Lista dei comandi:<br>- help<br>- info<br>- comandi<br>- chi sei?<br>- ciao<br>- clear<br>- exit<br>- data<br>- ora<br>- versione";
                break;
            case 'chi sei?':
            case 'chi sei':
                response.innerHTML = "Sono un ethical hacker e sviluppatore web. Spero di poterti essere utile!";
                break;
            case 'ciao':
                response.innerHTML = "Ciao!";
                break;
            case 'data':
                response.innerHTML = new Date().toLocaleDateString();
                break;
            case 'ora':
                response.innerHTML = new Date().toLocaleTimeString();
                break;
            case 'versione':
                response.innerHTML = "Terminale V1.0_alpha";
                break;
            case 'clear':
                terminal.innerHTML = ''; // Cancella tutto
                enableInput(); // Ricrea l'input
                return; // Importante per evitare di aggiungere una risposta vuota
            case 'exit':
                response.innerHTML = "Uscita dal terminale.";
                enableInput(); // Ricrea l'input
                return;
            default:
                response.innerHTML = "Comando non riconosciuto. Digita 'fra help' per la lista dei comandi.";
        }

        terminal.insertBefore(response, currentInput);
        terminal.scrollTop = terminal.scrollHeight;
    }
}

const initialText = `root@fra:~$ Benvenuto!\nroot@fra:~$ Inizio il mio percorso da bambino, adoravo smontare ogni cosa che avevo in casa di elettronico\nroot@fra:~$ Ora sono un ethical hacker e sviluppatore web\nroot@fra:~$ Spero di poterti essere utile!\nroot@fra:~$ Digita 'fra help' per visualizzare i comandi disponibili`;

// Attiva la funzione typeText quando l'elemento .terminal è visibile
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    const terminal = document.querySelector('.terminal');
    const windowHeight = window.innerHeight;
    const terminalTop = terminal.getBoundingClientRect().top;
    const elementVisible = 120;

    if (terminalTop < windowHeight - elementVisible) {
        typeText(initialText, 500); // Passa il testo iniziale alla funzione
        window.removeEventListener('scroll', handleScroll); // Disabilita l'event listener dopo l'esecuzione
    }
}







// Terminale Installazione Curriculum

function updateProgress() {
    let progress = 0;
    const progressBar = document.getElementById("progress");
    const speedText = document.getElementById("speed");
    const output = document.getElementById("outputd");
    const messages = [
        "<p>Liceo delle Scienze Applicate...Done</p>",
        "<p>Vincere un Arduino Day...Done</p>",
        "<p style='color:#6e0000;'>Unipg chimica...Error</p>",
        "<p>Tactics tecnico del suono...Done</p>",
        "<p>17 anni di chitarra...Done</p>",
        "<p>7 anni di batteria...Done</p>",
        "<p>Corso per Web Designer...Done</p>"
    ];
    let messageIndex = 0;
    
    function update() {
        if (progress < 100) {
            let increment = 10; 
            progress += increment;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + "%";

            let maxSpeed = 1000;
            let randomSpeed = Math.random() * maxSpeed;
            let speed = parseFloat(randomSpeed.toFixed(2));
            speedText.textContent = `${speed} KB/s`;
            
            if (messageIndex < messages.length) {
                output.innerHTML += messages[messageIndex];
                output.scrollTop = output.scrollHeight;
                messageIndex++;
            }
            setTimeout(update, 500);
        } else {
            speedText.textContent = "0 KB/s";
            output.innerHTML += "<p>Installation complete. <a class='download' style='color:white;' href='https://whoisfra.it/curriculum.pdf'>Download Curriculum</a></p>";
            output.scrollTop = output.scrollHeight;
        }
    }
    setTimeout(update, 1000);
}



// Attiva la funzione updateProgress quando l'elemento .terminal2 è visibile

window.addEventListener('scroll', handleScrolll);

function handleScrolll() {
    const terminal2 = document.querySelector('.terminal2');
    const windowHeight = window.innerHeight;
    const terminal2Top = terminal2.getBoundingClientRect().top;
    const elementVisible = 120;

    if (terminal2Top < windowHeight - elementVisible) {
        updateProgress();
        window.removeEventListener('scroll', handleScrolll);
    }
}
