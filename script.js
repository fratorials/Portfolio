

console.log("Aaaaah sei furbo...");
console.log("Vuoi hackerarmi vero?");


document.addEventListener("DOMContentLoaded", function() {
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




// Terminale Chi sono

function typeText() {
    const text = "root@fra:~$ Benvenuto!\nroot@fra:~$ Inizio il mio percorso da bambino, adoravo smontare ogni cosa che avevo in casa di elettronico\n root@fra:~$ Ora sono un ethical hacker e sviluppatore web\nroot@fra:~$ Spero di poterti essere utile!\n root@fra:~$ Digita 'fra help' per visualizzare i comandi disponibili";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            document.getElementById("output").innerHTML += text[index] === '\n' ? '<br>' : text[index];
            index++;
            setTimeout(type, Math.random() * 25 + 5);
        } else {
            enableInput();
        }
    }
    
    setTimeout(type, 1000);
}

function enableInput() {
    const terminal = document.querySelector('.terminal');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'terminal-input';
    input.placeholder = 'Digita qui...';
    terminal.appendChild(input);

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const value = input.value.trim().toLowerCase();
            if (value === 'help') {
                displayHelpMessage();
            } else if (value === 'info') {
                displayInfoMessage();
            } else if (value === 'commands') {
                displayCommandsList();
            } else if (value === 'chi sei?' || 'chi sei') {
                const response = document.createElement('div');
                response.className = 'response';
                response.innerHTML = "Chi sono???";
                terminal.appendChild(response);
                termin
            } else if (value === 'ciao'){
                const response = document.createElement('div');
                response.className = 'response';
                response.innerHTML = "Ciao!";
                terminal.appendChild(response);
            } else {
                const response = document.createElement('div');
                response.className = 'response';
                response.innerHTML = "Comando non riconosciuto. Digita 'help' per la lista dei comandi.";
                terminal.appendChild(response);
            }
            input.value = '';
        }
    });
}

function displayHelpMessage() {
    const terminal = document.querySelector('.terminal');
    const message = document.createElement('div');
    message.className = 'help-message';
    message.innerHTML = "Comandi disponibili:<br>- help: Visualizza questo messaggio di aiuto<br>- info: Mostra informazioni sul sito<br>- commands: Elenca tutti i comandi disponibili";
    terminal.appendChild(message);
    terminal.style.height = 'auto';
}

function displayInfoMessage() {
    const terminal = document.querySelector('.terminal');
    const message = document.createElement('div');
    message.className = 'info-message';
    message.innerHTML = "Questo è un terminale interattivo. Puoi utilizzare i seguenti comandi per ottenere informazioni specifiche.";
    terminal.appendChild(message);
    terminal.style.height = 'auto';
}

function displayCommandsList() {
    const terminal = document.querySelector('.terminal');
    const message = document.createElement('div');
    message.className = 'commands-list';
    message.innerHTML = "Lista dei comandi:<br>- help: Visualizza questo messaggio di aiuto<br>- info: Mostra informazioni sul sito<br>- commands: Elenca tutti i comandi disponibili";
    terminal.appendChild(message);
    terminal.style.height = 'auto';
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



// Attiva la funzione typeText quando l'elemento .terminal è visibile

window.addEventListener('scroll', handleScroll);

function handleScroll() {
    const terminal = document.querySelector('.terminal');
    const windowHeight = window.innerHeight;
    const terminalTop = terminal.getBoundingClientRect().top;
    const elementVisible = 120;

    if (terminalTop < windowHeight - elementVisible) {
        typeText();
        window.removeEventListener('scroll', handleScroll);
    } 
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