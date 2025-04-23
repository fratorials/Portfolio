/* Scritto da Francesco Mariani
    Ethical Hacker, con amore, a cuore la vostra sicurezza
    Bello che sei arrivato a leggermi, ho stima di te.
 */

    console.log("Aaaaah sei furbo...");
    console.log("Vuoi hackerarmi vero?");
    
    // ---------- INIZIO DEFINIZIONE FILE SYSTEM (!!! DA PERSONALIZZARE !!!) ----------
    const fileSystem = {
        'Galleria': [
            { name: 'Progetti Grafici', type: 'folder' },
            { name: 'Fotografie', type: 'folder' },
            { name: 'Web Design', type: 'folder' }
        ],
        'Galleria/Progetti Grafici': [
            // MODIFICA QUESTO: Inserisci i tuoi file grafici qui
            // Esempio:
            { name: 'Logo_Sito.png', type: 'file', src: 'img/galleria/grafica/Logo_Sito.png' },
            { name: 'Biglietto_Visita.jpg', type: 'file', src: 'img/galleria/grafica/Biglietto_Visita.jpg' },
        ],
        'Galleria/Fotografie': [
            // MODIFICA QUESTO: Inserisci le tue foto qui
            // Esempio:
            { name: 'Panorama_Alpi.jpg', type: 'file', src: 'img/galleria/foto/Panorama_Alpi.jpg' },
            { name: 'Ritratto_Notturno.jpg', type: 'file', src: 'img/galleria/foto/Ritratto_Notturno.jpg' },
            { name: 'Dettaglio_Fiore.png', type: 'file', src: 'img/galleria/foto/Dettaglio_Fiore.png' },
        ],
        'Galleria/Web Design': [
            // MODIFICA QUESTO: Inserisci i tuoi screenshot web qui
            // Esempio:
            { name: 'Homepage_WhoisFra.png', type: 'file', src: 'img/galleria/web/Homepage_WhoisFra.png' },
            { name: 'Sezione_Contatti.png', type: 'file', src: 'img/galleria/web/Sezione_Contatti.png' }
        ]
        // Aggiungi altre cartelle principali o sottocartelle se necessario
    };
    // ---------- FINE DEFINIZIONE FILE SYSTEM ----------
    
    // Icone da usare (assicurati che questi file esistano nel tuo progetto)
    const folderIconLarge = 'img/icona-cartella-grande.png';
    const fileIconLarge = 'img/icona-file-immagine.png'; // <<< ASSICURATI DI AVERE QUESTA ICONA!
    const folderIconSmall = 'img/icona-cartella.png';
    const photoAppIcon = 'img/icona-foto.png';
    
    // Variabili globali per la galleria
    let currentPath = 'Galleria'; // Percorso iniziale (usato solo se la galleria è sulla pagina)
    let currentPhotoList = []; // Lista delle foto nella cartella corrente per la navigazione
    let currentPhotoIndex = 0; // Indice della foto visualizzata nella modale
    
    
    // --- Funzioni Generali (dal tuo codice originale) ---
    
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
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
            var elementVisible = 120; // Era 20 nel tuo originale, 120 potrebbe essere meglio
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("attivo_sotto");
            } else {
                reveals[i].classList.remove("attivo_sotto");
            }
        }
    }
    
    // --- Esecuzione all'avvio e gestione eventi ---
    
    document.addEventListener("DOMContentLoaded", function() {
    
        // Fade-in generale della pagina
        setTimeout(function() {
            var element = document.querySelector(".avvio");
            if (element) { // Verifica se l'elemento esiste
               element.style.opacity = "1";
            }
        }, 500); // Ridotto leggermente per velocità
    
        // Gestione menu hamburger
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('header ul');
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('show');
                // console.log('Menu toggled');
            });
        } else {
            // Non mostrare errore se siamo in una pagina senza menu completo, es. galleria
            // console.error('Menu toggle or nav element not found');
        }
    
        // Smooth scroll per link interni alla pagina
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetSelector = this.hash;
                 // Verifica se è un link semplice # o se l'elemento esiste
                if (targetSelector && targetSelector !== '#') {
                    const target = document.querySelector(targetSelector);
                    if (target) {
                         e.preventDefault(); // Previene solo se l'elemento esiste
                        window.scrollTo({
                            top: target.offsetTop - 80, // Aggiunto piccolo offset per header fisso
                            behavior: 'smooth'
                        });
                        // Chiudi il menu mobile se è aperto dopo il click
                        if (nav && nav.classList.contains('show')) {
                            nav.classList.remove('show');
                        }
                    }
                }
            });
        });
    
        // Effetto Hacker Text (solo se l'elemento esiste)
        const hackerTextTitle = document.querySelector('.hacker-text-title');
        if (hackerTextTitle) {
            hackerTextTitle.addEventListener('mouseover', () => {
                const originalText = hackerTextTitle.dataset.original;
                if (!originalText) return; // Esce se non c'è testo originale
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                let interval = setInterval(() => {
                    hackerTextTitle.innerText = originalText
                        .split('')
                        .map(letter => (Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : letter))
                        .join('');
                }, 50);
    
                setTimeout(() => {
                    clearInterval(interval);
                    hackerTextTitle.innerText = originalText;
                }, 1000); // Durata effetto ridotta
            });
        }
    
        // --- INIZIO LOGICA SPECIFICA PER LA GALLERIA ---
        // Eseguiamo questa parte solo se troviamo gli elementi della galleria nella pagina
    
        const explorerWindow = document.querySelector('.explorer-window');
    
        if (explorerWindow) { // Verifica se siamo nella pagina della galleria
    
            // --- Selezione Elementi DOM Galleria ---
            const fileExplorerContent = document.getElementById('file-explorer-content');
            const pathInput = document.querySelector('.path-input');
            const itemCountSpan = document.getElementById('item-count');
            const backBtn = document.querySelector('.back-btn'); // Non implementato completamente
            const upBtn = document.querySelector('.up-btn');
            const photoViewerModal = document.getElementById('photo-viewer-modal');
            const modalImage = document.getElementById('modal-image');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const prevPhotoBtn = document.getElementById('prev-photo-btn');
            const nextPhotoBtn = document.getElementById('next-photo-btn');
            const photoTitle = document.getElementById('photo-title');
    
            // --- Funzione per Renderizzare il Contenuto ---
            function renderContent(path) {
                // Verifica se il path esiste nel file system prima di procedere
                if (!(path in fileSystem)) {
                     console.error("Percorso non trovato nel file system:", path);
                     // Potresti mostrare un messaggio all'utente o resettare a 'Galleria'
                     // Per ora, non facciamo nulla per evitare loop se 'Galleria' stesso manca
                     if (path !== 'Galleria') {
                         renderContent('Galleria'); // Torna alla root se un sotto-percorso non esiste
                     } else {
                          fileExplorerContent.innerHTML = '<p style="color: red;">Errore: Impossibile caricare la galleria.</p>';
                          itemCountSpan.textContent = '0 elementi';
                          pathInput.value = 'Errore';
                          upBtn.disabled = true;
                     }
                     return;
                }
    
                currentPath = path;
                const content = fileSystem[path]; // Ora siamo sicuri che path esista
                fileExplorerContent.innerHTML = ''; // Pulisce l'area
    
                if (!content || content.length === 0) {
                     fileExplorerContent.innerHTML = '<p style="color: #555; padding: 20px;">Questa cartella è vuota.</p>'; // Messaggio cartella vuota
                } else {
                    content.forEach(item => {
                        const iconDiv = document.createElement('div');
                        iconDiv.className = 'icon';
                        iconDiv.dataset.type = item.type;
                        iconDiv.dataset.name = item.name; // Memorizza il nome
    
                        const iconImg = document.createElement('img');
                        const iconSpan = document.createElement('span');
                        iconSpan.textContent = item.name;
    
                        if (item.type === 'folder') {
                            iconImg.src = folderIconLarge;
                            iconImg.alt = 'Cartella';
                            const folderPath = `${path}/${item.name}`;
                            iconDiv.dataset.path = folderPath; // Path della sottocartella
                            // Event listener per aprire cartella (singolo click)
                            iconDiv.addEventListener('click', () => {
                                 // Verifica che il sotto-percorso esista prima di navigare
                                 if (folderPath in fileSystem) {
                                     renderContent(folderPath)
                                 } else {
                                     console.error("Tentativo di aprire un percorso inesistente:", folderPath);
                                     alert(`La cartella "${item.name}" sembra non esistere o è vuota nel sistema.`);
                                 }
                            });
                        } else if (item.type === 'file') {
                            iconImg.src = fileIconLarge; // Icona generica per file immagine
                            iconImg.alt = 'File Immagine';
                            iconDiv.dataset.src = item.src; // Path reale dell'immagine
                            // Event listener per aprire foto (singolo click)
                            iconDiv.addEventListener('click', () => openPhotoViewer(item.src, item.name, path));
                        } else {
                            console.warn("Tipo di elemento non riconosciuto:", item);
                            iconImg.src = 'img/icona-sconosciuto.png'; // Icona fallback?
                            iconImg.alt = 'Sconosciuto';
                        }
    
                        iconDiv.appendChild(iconImg);
                        iconDiv.appendChild(iconSpan);
                        fileExplorerContent.appendChild(iconDiv);
                    });
                 }
    
                // Aggiorna barra indirizzi e stato
                pathInput.value = path.replace(/\//g, ' > '); // Mostra percorso con separatori
                itemCountSpan.textContent = `${content.length} elementi`;
                upBtn.disabled = path === 'Galleria'; // Disabilita 'Su' se siamo nella root
            }
    
            // --- Funzione per Aprire il Visualizzatore Foto ---
            function openPhotoViewer(imageSrc, imageName, folderPath) {
                currentPhotoList = (fileSystem[folderPath] || [])
                                     .filter(item => item.type === 'file')
                                     .map(item => ({ src: item.src, name: item.name }));
    
                currentPhotoIndex = currentPhotoList.findIndex(photo => photo.src === imageSrc);
                if (currentPhotoIndex === -1 || currentPhotoList.length === 0) {
                     console.error("Impossibile trovare l'immagine o la lista è vuota.");
                     alert("Errore nell'apertura dell'immagine.");
                     return; // Non aprire la modale se c'è un errore
                };
    
                updatePhotoViewer();
                photoViewerModal.style.display = 'flex';
            }
    
            // --- Funzione per Aggiornare il Visualizzatore Foto (immagine e pulsanti) ---
            function updatePhotoViewer() {
                 if (currentPhotoList.length === 0 || currentPhotoIndex < 0 || currentPhotoIndex >= currentPhotoList.length) {
                     closeModal();
                     return;
                 }
                const currentPhoto = currentPhotoList[currentPhotoIndex];
                modalImage.src = currentPhoto.src;
                modalImage.alt = currentPhoto.name;
                photoTitle.textContent = currentPhoto.name;
                prevPhotoBtn.disabled = currentPhotoIndex === 0;
                nextPhotoBtn.disabled = currentPhotoIndex === currentPhotoList.length - 1;
            }
    
            // --- Funzione per Chiudere la Modale ---
            function closeModal() {
                photoViewerModal.style.display = 'none';
                modalImage.src = '';
                currentPhotoList = [];
            }
    
            // --- Event Listeners Pulsanti Navigazione Galleria ---
            upBtn.addEventListener('click', () => {
                if (currentPath === 'Galleria') return;
                const parts = currentPath.split('/');
                parts.pop();
                renderContent(parts.join('/'));
            });
    
            // --- Event Listeners Modale Foto ---
            closeModalBtn.addEventListener('click', closeModal);
            photoViewerModal.addEventListener('click', (event) => {
                 if (event.target === photoViewerModal) {
                     closeModal();
                 }
            });
            prevPhotoBtn.addEventListener('click', () => {
                if (!prevPhotoBtn.disabled) { // Controlla se il bottone è abilitato
                    currentPhotoIndex--;
                    updatePhotoViewer();
                }
            });
            nextPhotoBtn.addEventListener('click', () => {
                 if (!nextPhotoBtn.disabled) { // Controlla se il bottone è abilitato
                    currentPhotoIndex++;
                    updatePhotoViewer();
                 }
            });
    
             // --- Keyboard navigation for photo viewer ---
             document.addEventListener('keydown', (event) => {
                // Assicurati che la modale esista e sia visibile
                if (photoViewerModal && photoViewerModal.style.display === 'flex') {
                    if (event.key === 'ArrowLeft' && !prevPhotoBtn.disabled) {
                        prevPhotoBtn.click(); // Simula il click sul bottone
                    } else if (event.key === 'ArrowRight' && !nextPhotoBtn.disabled) {
                        nextPhotoBtn.click(); // Simula il click sul bottone
                    } else if (event.key === 'Escape') {
                        closeModalBtn.click(); // Simula il click sul bottone
                    }
                }
            });
            // --- LOGICA PER FINESTRA MOVIBILE ---

        const titleBar = explorerWindow.querySelector('.title-bar'); // Seleziona la barra del titolo
        let isDragging = false;
        let offsetX, offsetY; // Offset del mouse rispetto all'angolo della finestra

        // Evento MOUSE DOWN sulla barra del titolo
        titleBar.addEventListener('mousedown', (e) => {
            // Ignora click sui pulsanti della finestra
            if (e.target.classList.contains('control-btn')) {
                return;
            }
            isDragging = true;
            // Calcola l'offset: posizione mouse - posizione angolo finestra
            offsetX = e.clientX - explorerWindow.offsetLeft;
            offsetY = e.clientY - explorerWindow.offsetTop;
            explorerWindow.classList.add('dragging'); // Aggiungi classe per stile cursore
            // Impedisce la selezione di testo durante il drag
            e.preventDefault();
        });

        // Evento MOUSE MOVE su tutto il documento (rileva movimento anche fuori dalla finestra)
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return; // Esci se non stiamo trascinando

            // Nuova posizione = posizione mouse - offset iniziale
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // ----- Controllo Limiti (Opzionale ma consigliato) -----
            const parentRect = explorerWindow.parentElement.getBoundingClientRect(); // O document.body
            const windowRect = explorerWindow.getBoundingClientRect();

            // Limite superiore (es. 0 o altezza header)
            const topLimit = 0; // Cambia se hai un header fisso da non sovrapporre
            if (newY < topLimit) newY = topLimit;

            // Limite sinistro
            if (newX < 0) newX = 0;

            // Limite inferiore (non uscire in basso)
            // Considera l'altezza della finestra per non farla scomparire in basso
            if (newY + windowRect.height > parentRect.height) {
                 newY = parentRect.height - windowRect.height;
            }
            // Assicurati che non diventi negativo se la finestra è più alta del parent
             if (newY < topLimit) newY = topLimit;


            // Limite destro (non uscire a destra)
             // Considera la larghezza della finestra
            if (newX + windowRect.width > parentRect.width) {
                newX = parentRect.width - windowRect.width;
            }
             // Assicurati che non diventi negativo se la finestra è più larga del parent
            if (newX < 0) newX = 0;
            // ----- Fine Controllo Limiti -----


            // Applica la nuova posizione
            explorerWindow.style.left = `${newX}px`;
            explorerWindow.style.top = `${newY}px`;
        });

        // Evento MOUSE UP su tutto il documento (rilascio del mouse ovunque)
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                explorerWindow.classList.remove('dragging'); // Rimuovi classe stile cursore
            }
        });

        // --- FINE LOGICA FINESTRA MOVIBILE ---
    
            // --- Render Iniziale Galleria ---
            renderContent(currentPath);
    
        } // --- FINE BLOCCO if (explorerWindow) ---
    
    }); // --- FINE DOMContentLoaded ---
    
    
    // --- Listener per effetti scroll (valido per tutte le pagine) ---
    window.addEventListener("scroll", reveal);
    window.addEventListener("scroll", reveal2);



    