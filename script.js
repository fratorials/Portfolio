

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
let initialTextShown = false; 


function typeText(text, delay = 30) {
    if (initialTextShown) return; 

    let index = 0;
    function type() {
        if (index < text.length) {
            output.innerHTML += text[index] === '\n' ? '<br>' : text[index];
            index++;
            setTimeout(type, Math.random() * 15 + 5); 
        } else {
            initialTextShown = true; 
            enableInput(); 
        }
    }
    setTimeout(type, delay);
}


function enableInput() {
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'root@fra:~$ ';
    inputLine.appendChild(promptSpan);

    currentInput = document.createElement('input');
    currentInput.type = 'text';
    currentInput.className = 'terminal-input';
    currentInput.placeholder = 'Digita qui...';
    inputLine.appendChild(currentInput);

    terminal.appendChild(inputLine);
    currentInput.focus();
    currentInput.addEventListener('keydown', handleInput);
}

function handleInput(event) {
    if (event.key === 'Enter') {
        const commandText = currentInput.value.trim(); 
        const commandLower = commandText.toLowerCase(); 
        const currentInputLine = currentInput.parentElement; 
        currentInput.disabled = true; 
        currentInput.removeEventListener('keydown', handleInput); 


        const commandEchoDiv = document.createElement('div');
        commandEchoDiv.className = 'command-echo';
        commandEchoDiv.innerHTML = `<span class="prompt">root@fra:~$</span> ${escapeHtml(commandText)}`;

        if (currentInputLine && currentInputLine.parentNode === terminal) {
            terminal.replaceChild(commandEchoDiv, currentInputLine);
        } else {
            terminal.appendChild(commandEchoDiv);
        }

        const responseDiv = document.createElement('div');
        responseDiv.className = 'response';
        let shouldCreateNewInput = true;

        switch (commandLower) {
            case 'help':
            case 'h':
                responseDiv.innerHTML = "Comandi disponibili:<br>" +
                                      "- help: Visualizza questo messaggio di aiuto<br>" +
                                      "- info: Mostra informazioni sul sito<br>" +
                                      "- comandi: Elenca tutti i comandi disponibili<br>" +
                                      "- chi sei?: Informazioni sull'utente<br>" +
                                      "- ciao: Saluta<br>" +
                                      "- data: Mostra la data corrente<br>" +
                                      "- ora: Mostra l'ora corrente<br>" +
                                      "- versione: Mostra la versione del terminale<br>" +
                                      "- clear: Pulisce il terminale<br>" +
                                      "- exit: Esce dal terminale";
                break;
            case 'info':
                responseDiv.innerHTML = "Questo è un terminale interattivo. Puoi utilizzare i comandi disponibili per ottenere informazioni.";
                break;
            case 'comandi':
                responseDiv.innerHTML = "Lista dei comandi:<br>- help<br>- info<br>- comandi<br>- chi sei?<br>- ciao<br>- data<br>- ora<br>- versione<br>- clear<br>- exit";
                break;
            case 'chi sei?':
            case 'chi sei':
                responseDiv.innerHTML = "Sono un ethical hacker e sviluppatore web. Spero di poterti essere utile!";
                break;
            case 'ciao':
            case 'ciao!': case 'salve': case 'salve!': // Raggruppato i saluti
            case 'hello': case 'hi': case 'hey': case 'hey!':
            case 'saluti': case 'saluti!':
                responseDiv.innerHTML = "Ciao! Come posso aiutarti oggi?";
                break;
            case 'data':
                responseDiv.innerHTML = `Data corrente: ${new Date().toLocaleDateString('it-IT')}`;
                break;
            case 'ora':
                responseDiv.innerHTML = `Ora corrente: ${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
                break;
            case 'versione':
                responseDiv.innerHTML = "Terminale Interattivo v1.1.0";
                break;
            case 'clear':
                // Rimuove tutti gli eco dei comandi e le risposte precedenti.
                // Il testo iniziale nell'elemento 'output' viene conservato.
                const elementsToClear = terminal.querySelectorAll('.command-echo, .response, .final-message, .input-line');
                elementsToClear.forEach(el => {
                    // Non rimuovere l'eco del comando 'clear' appena aggiunto
                    if (el !== commandEchoDiv && el.parentElement === terminal) {
                         terminal.removeChild(el);
                    }
                });
                break;
            case 'exit':
                responseDiv.innerHTML = "Disconnessione dal terminale... Arrivederci!";
                shouldCreateNewInput = false;
                break;
            default:
                responseDiv.innerHTML = `Comando non riconosciuto: "${escapeHtml(commandText)}". Digita 'help' per la lista dei comandi.`;
        }

        if (responseDiv.innerHTML.trim() !== "") {
            terminal.appendChild(responseDiv);
        }
        if (shouldCreateNewInput) {
            enableInput(); 
        } else {
            const finalMsg = document.createElement('div');
            finalMsg.textContent = "Terminale disattivato. Ricarica la pagina per riavviare.";
            finalMsg.className = 'final-message'; 
            terminal.appendChild(finalMsg);

        }
        terminal.scrollTop = terminal.scrollHeight;
    }
}

function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
        return '';
    }
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


const initialText = `root@fra:~$ Benvenuto!\nroot@fra:~$ Inizio il mio percorso da bambino, adoravo smontare ogni cosa che avevo in casa di elettronico\nroot@fra:~$ Ora sono un ethical hacker e sviluppatore web\nroot@fra:~$ Spero di poterti essere utile!\nroot@fra:~$ Digita 'help' per visualizzare i comandi disponibili`;


function handleScroll() {
    const terminalElement = document.querySelector('.terminal'); 
    if (!terminalElement) return; 

    const windowHeight = window.innerHeight;
    const terminalTop = terminalElement.getBoundingClientRect().top;
    const elementVisibleThreshold = 120; 

    if (terminalTop < windowHeight - elementVisibleThreshold) {
        if (!initialTextShown) { 
             typeText(initialText, 500); 
        }
        window.removeEventListener('scroll', handleScroll); 
    }
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);









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


window.addEventListener('scroll', handleScrolll);

function handleScrolll() { 
    const terminal2 = document.querySelector('.terminal2'); 
    if (!terminal2) { 
        return; 
    }
    const windowHeight = window.innerHeight;
    const terminal2Top = terminal2.getBoundingClientRect().top; 
    const elementVisible = 120; 

    if (terminal2Top < windowHeight - elementVisible) {
        if (typeof updateProgress === 'function') {
             updateProgress(); 
        }
        window.removeEventListener('scroll', handleScrolll); 
    }
}

