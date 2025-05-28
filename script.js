

console.log("Aaaaah sei furbo...");
console.log("Vuoi hackerarmi vero?");


document.addEventListener("DOMContentLoaded", function() {
    // --- Fade-in iniziale (con controllo esistenza elemento) ---
    setTimeout(function() {
        var element = document.querySelector(".avvio");
        if (element) { 
            element.style.opacity = "1";
        }
    }, 1000);

    // --- Gestione Menu Hamburger e Spostamento Finestra Galleria ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header ul');

    if (menuToggle && nav) {
        console.log("Menu toggle e nav trovati. Aggiungo listener."); // DEBUG
        menuToggle.addEventListener('click', () => {
            console.log("--- Menu toggle CLICCATO ---"); // DEBUG

            // Aggiunge o toglie la classe 'show' per mostrare/nascondere il menu
            nav.classList.toggle('show'); 
            console.log(`Classe 'show' su nav ${nav.classList.contains('show') ? 'AGGIUNTA' : 'RIMOSSA'}.`); // DEBUG

            // --- LOGICA SPOSTAMENTO FINESTRA ---
            const explorerWindow = document.querySelector('.explorer-window');
            
            if (explorerWindow) {
                 console.log("Finestra .explorer-window TROVATA."); // DEBUG
            } else {
                 console.log("Finestra .explorer-window NON trovata su questa pagina."); // DEBUG
                 return; // Esci se la finestra non c'è
            }

            // Controlla se il menu è ora aperto
            if (nav.classList.contains('show')) {
                console.log("Menu è APERTO. Provo a spostare la finestra."); // DEBUG
                const menuBottomPosition = 370; // Posizione calcolata
                console.log(`Imposto explorerWindow.style.top a: ${menuBottomPosition}px`); // DEBUG
                
                // Applica il nuovo stile 'top' alla finestra explorer
                explorerWindow.style.top = `${menuBottomPosition}px`; 
                console.log(`Valore di explorerWindow.style.top ORA: ${explorerWindow.style.top}`); // DEBUG
                
            } else {
                 console.log("Menu è CHIUSO."); // DEBUG
                // OPZIONALE: Logica per riportare su la finestra (attualmente non attiva)
                // console.log("Non riporto la finestra su automaticamente."); 
            }
            // --- FINE LOGICA SPOSTAMENTO FINESTRA ---

        });
    } else {
         console.log("Menu toggle o nav non trovati all'avvio."); // DEBUG (Non dovrebbe succedere sulla galleria)
    }

}); // --- FINE BLOCCO DOMContentLoaded --- 

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



window.addEventListener('scroll', handleScroll);
// Funzione per effetto rivela allo scroll (più robusta)
function handleScroll() { 
    var reveals = document.querySelectorAll(".rivela");

    // Se non ci sono elementi .rivela, esci subito
    if (!reveals || reveals.length === 0) {
        // console.log("handleScroll: Nessun elemento .rivela trovato, esco."); // Debug (opzionale)
        return; 
    }

    var windowHeight = window.innerHeight;
    var elementVisible = 120; 

    for (var i = 0; i < reveals.length; i++) {
        var currentElement = reveals[i]; // Metti l'elemento corrente in una variabile

        // AGGIUNGI CONTROLLO CRITICO: Assicurati che l'elemento esista e sia un nodo valido prima di usarlo
        if (!currentElement || typeof currentElement.getBoundingClientRect !== 'function') {
             // console.log(`handleScroll: Elemento all'indice ${i} non valido, salto.`); // Debug (opzionale)
             continue; // Salta al prossimo elemento del ciclo
        }

        // Ora possiamo usare getBoundingClientRect in sicurezza
        var elementTop = currentElement.getBoundingClientRect().top; 

        if (elementTop < windowHeight - elementVisible) {
            currentElement.classList.add("attivo");
        } else {
            currentElement.classList.remove("attivo");
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



// --- Effetto Crittografia Testo (con controllo esistenza elemento) ---

// Effetto per elementi con classe .hacker-text
const hackerText = document.querySelector('.hacker-text');

if (hackerText) { // Controlla se l'elemento esiste
    hackerText.addEventListener('mouseover', () => {
        const originalText = hackerText.dataset.original;
        if (!originalText) return; // Esce se manca data-original
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        console.log("Figo vero? Ora dai, cercalo sul codice javascript"); // Log originale

        let interval = setInterval(() => {
            hackerText.innerText = originalText
                .split('')
                .map(letter => (Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : letter))
                .join('');
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            hackerText.innerText = originalText;
        }, 1500); // Durata effetto
    });
} // Fine if (hackerText)

// Effetto per elementi con classe .hacker-text-title (es. nell'header)
const hackerTextt = document.querySelector('.hacker-text-title');

if (hackerTextt) { // Controlla se l'elemento esiste
    hackerTextt.addEventListener('mouseover', () => {
        const originalText = hackerTextt.dataset.original;
         if (!originalText) return; // Esce se manca data-original
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
        }, 1000); // Durata effetto
    });
} // Fine if (hackerTextt)



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

// Funzione per attivare animazioni (es. terminale CV) quando visibili
function handleScrolll() { 
    // Seleziona l'elemento specifico (es. terminal2 per CV)
    const terminal2 = document.querySelector('.terminal2'); 
    
    // AGGIUNGI CONTROLLO: Se l'elemento .terminal2 non esiste in questa pagina, esci
    if (!terminal2) { 
        return; 
    }

    // Se l'elemento esiste, procedi con la logica originale
    const windowHeight = window.innerHeight;
    // Ora è sicuro chiamare getBoundingClientRect perché terminal2 esiste
    const terminal2Top = terminal2.getBoundingClientRect().top; 
    const elementVisible = 120; // Soglia di visibilità

    if (terminal2Top < windowHeight - elementVisible) {
        // Chiama la funzione che fa partire l'animazione (es. updateProgress)
        // Assicurati che anche updateProgress() controlli se i suoi elementi esistono!
        if (typeof updateProgress === 'function') { // Controlla se la funzione esiste
             updateProgress(); 
        }
        // Rimuovi il listener se l'animazione deve partire solo una volta
        window.removeEventListener('scroll', handleScrolll); 
    }
}

// Assicurati che l'event listener nel tuo script usi questo nome di funzione:
// window.addEventListener('scroll', handleScrolll);
