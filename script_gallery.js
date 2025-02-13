/*  Scritto da Francesco Mariani
    Ethical Hacker, con amore, a cuore la vostra sicurezza
    Bello che sei arrivato a leggermi, ho stima di te.    
 */

    console.log("Aaaaah sei furbo...");
    console.log("Vuoi hackerarmi vero?");
    
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
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
    
    window.addEventListener("scroll", reveal2);
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
                console.log('Menu toggled'); // Add console log for debugging
            });
        } else {
            console.error('Menu toggle or nav element not found');
        }
    });
    
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
      
    window.addEventListener("scroll", reveal);
    
    function reveal2() {
        var reveals = document.querySelectorAll(".rivela_sotto");
      
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 120;
      
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("attivo_sotto");
          } else {
            reveals[i].classList.remove("attivo_sotto");
          }
        }
    }
      
    
    
    const hackerText = document.querySelector('.hacker-text-title');
    
    hackerText.addEventListener('mouseover', () => {
        const originalText = hackerText.dataset.original; // Mantieni sempre il testo originale
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
            hackerText.innerText = originalText; // Ripristina sempre il testo originale
        }, 1500); // L'effetto dura 1 secondo
    });


    const cartelle = document.querySelectorAll('.cartella');

    cartelle.forEach(cartella => {
      cartella.addEventListener('click', () => {
        // Ottieni il contenitore delle immagini e l'icona della cartella
        const immagini = cartella.querySelector('.immagini');
        const icona = cartella.querySelector('img');
    
        // Verifica se la cartella è già aperta
        const aperta = immagini.style.display === 'block';
    
        // Se la cartella è chiusa, aprila
        if (!aperta) {
          immagini.style.display = 'block';
          icona.src = './img/cartella_aperta.png'; // Cambia l'icona (opzionale)
        }
        // Se la cartella è aperta, chiudila
        else {
          immagini.style.display = 'none';
          icona.src = './img/cartella_chiusa.png'; // Ripristina l'icona originale (opzionale)
        }
      });
    });