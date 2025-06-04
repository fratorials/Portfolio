/* Scritto da Francesco Mariani
   Ethical Hacker, con amore, a cuore la vostra sicurezza
   Bello che sei arrivato a leggermi, ho stima di te.
*/

console.log("Aaaaah sei furbo...");
console.log("Vuoi hackerarmi vero?");


// Icone da usare (assicurati che questi file esistano nel tuo progetto)
const folderIconLarge = 'img/icona-cartella-grande.png';
const fileIconLarge = 'img/icona-file-immagine.png'; 
const folderIconSmall = 'img/icona-cartella.png';
const photoAppIcon = 'img/icona-foto.png';

// Variabili globali per la galleria
let currentPath = 'Galleria'; 
let currentPhotoList = []; 
let currentPhotoIndex = 0; 


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
        var elementVisible = 120; 
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("attivo_sotto");
        } else {
            reveals[i].classList.remove("attivo_sotto");
        }
    }
}

// --- Funzioni per Finestre Mobili e Massimizzabili ---

function initializeDraggableWindow(windowElement, titleBarElement, windowState) {
    let isDragging = false;
    let offsetX, offsetY;
    let latestEventX, latestEventY;
    let animationFrameId = null;

    function dragStart(e) {
        if (windowState.isMaximized || e.target.classList.contains('control-btn')) {
            return;
        }
        
        if (window.getComputedStyle(windowElement).position === 'static' || window.getComputedStyle(windowElement).position === 'relative') {
            const rect = windowElement.getBoundingClientRect();
            const parentModal = windowElement.closest('.modal'); 
            
            windowElement.style.position = 'absolute';
            if (parentModal) { 
                const parentRect = parentModal.getBoundingClientRect();
                windowElement.style.left = `${rect.left - parentRect.left}px`;
                windowElement.style.top = `${rect.top - parentRect.top}px`;
            } else { 
                windowElement.style.left = `${rect.left}px`;
                windowElement.style.top = `${rect.top}px`;
            }
        }

        isDragging = true;
        windowElement.classList.add('dragging');
        
        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - windowElement.offsetLeft;
            offsetY = e.touches[0].clientY - windowElement.offsetTop;
            latestEventX = e.touches[0].clientX; 
            latestEventY = e.touches[0].clientY; 
        } else { 
            offsetX = e.clientX - windowElement.offsetLeft;
            offsetY = e.clientY - windowElement.offsetTop;
            latestEventX = e.clientX; 
            latestEventY = e.clientY; 
            e.preventDefault(); 
        }
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateWindowPosition);
        }
    }

    function dragMove(e) {
        if (!isDragging || windowState.isMaximized) return;

        if (e.type === 'touchmove') {
            e.preventDefault(); 
            latestEventX = e.touches[0].clientX;
            latestEventY = e.touches[0].clientY;
        } else { 
            latestEventX = e.clientX;
            latestEventY = e.clientY;
        }
    }
    
    function updateWindowPosition() {
        if (!isDragging) {
            animationFrameId = null; 
            return;
        }

        let newX = latestEventX - offsetX;
        let newY = latestEventY - offsetY;

        const windowRect = windowElement.getBoundingClientRect(); 
        let topLimit = 0; 
        const parentModal = windowElement.closest('.modal');
        
        const limitParentWidth = parentModal ? parentModal.clientWidth : window.innerWidth;
        const limitParentHeight = parentModal ? parentModal.clientHeight : window.innerHeight;

        if (newY < topLimit) newY = topLimit;
        if (newX < 0) newX = 0; 

        if (newY + windowRect.height > limitParentHeight ) { 
             newY = limitParentHeight - windowRect.height;
        }
         if (newX + windowRect.width > limitParentWidth) { 
             newX = limitParentWidth - windowRect.width;
        }
        
        if (newY < topLimit) newY = topLimit; 
        if (newX < 0) newX = 0;     

        windowElement.style.left = `${newX}px`;
        windowElement.style.top = `${newY}px`;
        
        animationFrameId = requestAnimationFrame(updateWindowPosition);
    }

    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            windowElement.classList.remove('dragging');
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }
    }

    if (titleBarElement) {
        titleBarElement.addEventListener('mousedown', dragStart);
        titleBarElement.addEventListener('touchstart', dragStart, { passive: false }); 
    }
    
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchmove', dragMove, { passive: false }); 
    document.addEventListener('touchend', dragEnd);
}

function initializeMaximizableWindow(windowElement, maximizeButtonElement, windowState, fixedHeaderHeight = 0) {
    if (!maximizeButtonElement) return;

    maximizeButtonElement.addEventListener('click', () => {
        if (!windowState.isMaximized) {
            windowState.originalRect = {
                width: windowElement.style.width,
                height: windowElement.style.height,
                top: windowElement.style.top,
                left: windowElement.style.left,
                position: windowElement.style.position, 
                maxWidth: windowElement.style.maxWidth,
                maxHeight: windowElement.style.maxHeight,
                boxSizing: windowElement.style.boxSizing
            };
            
            windowElement.style.position = 'absolute'; 
            windowElement.style.boxSizing = 'border-box';
            windowElement.style.width = '100vw'; 
            windowElement.style.height = `calc(100vh - ${fixedHeaderHeight}px)`; 
            windowElement.style.top = `${fixedHeaderHeight}px`; 
            windowElement.style.left = '0px';
            windowElement.style.maxWidth = 'none'; 
            windowElement.style.maxHeight = 'none'; 
            
            windowElement.classList.add('maximized-window'); 
            maximizeButtonElement.textContent = '❐'; 
            windowState.isMaximized = true;
        } else {
            windowElement.style.position = windowState.originalRect.position;
            windowElement.style.width = windowState.originalRect.width;
            windowElement.style.height = windowState.originalRect.height;
            windowElement.style.top = windowState.originalRect.top;
            windowElement.style.left = windowState.originalRect.left;
            windowElement.style.maxWidth = windowState.originalRect.maxWidth;
            windowElement.style.maxHeight = windowState.originalRect.maxHeight;
            windowElement.style.boxSizing = windowState.originalRect.boxSizing;

            windowElement.classList.remove('maximized-window');
            maximizeButtonElement.textContent = '□'; 
            windowState.isMaximized = false;
        }
        if (windowElement.id === 'photo-viewer-modal-content' && typeof constrainImagePan === 'function') { 
            const photoViewerState = windowState; 
             if (photoViewerState.scale !== 1) { 
                constrainImagePan();
                applyImageTransform();
             }
        }

    });
}


// --- Esecuzione all'avvio e gestione eventi ---

document.addEventListener("DOMContentLoaded", function() {

    if (typeof fileSystem === 'undefined') {
        console.error("L'oggetto 'fileSystem' non è definito. Assicurati che 'gallery_data.js' sia caricato correttamente prima di questo script.");
        const explorerWindowCheck = document.querySelector('.explorer-window');
        if (explorerWindowCheck) {
            const fileExplorerContentCheck = document.getElementById('file-explorer-content');
            if (fileExplorerContentCheck) {
                 fileExplorerContentCheck.innerHTML = '<p style="color: red; padding: 20px;">Errore critico: Impossibile caricare i dati della galleria. Controlla la console per dettagli.</p>';
            }
        }
        return; 
    }

    setTimeout(function() {
        var element = document.querySelector(".avvio");
        if (element) { 
            element.style.opacity = "1";
        }
    }, 500); 

    // RIMOSSA LA GESTIONE DEL MENU HAMBURGER DA QUESTO SCRIPT (script_pag.js)
    // per evitare conflitti con script.js (che gestisce anche lo spostamento della finestra galleria)
    /*
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header ul');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
    */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetSelector = this.hash;
            if (targetSelector && targetSelector !== '#') {
                const target = document.querySelector(targetSelector);
                if (target) {
                    e.preventDefault(); 
                    window.scrollTo({
                        top: target.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                    // Se nav è definito globalmente o accessibile, si potrebbe chiudere qui
                    // ma dato che la gestione del menu è ora solo in script.js,
                    // quella logica di chiusura dovrebbe essere lì se necessaria.
                    // const navForScroll = document.querySelector('header ul');
                    // if (navForScroll && navForScroll.classList.contains('show')) {
                    //    navForScroll.classList.remove('show');
                    // }
                }
            }
        });
    });

    const hackerTextTitle = document.querySelector('.hacker-text-title');
    if (hackerTextTitle) {
        hackerTextTitle.addEventListener('mouseover', () => {
            const originalText = hackerTextTitle.dataset.original;
            if (!originalText) return; 
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
            }, 1000); 
        });
    }

    // --- Gestione Finestra Galleria ---
    const explorerWindow = document.querySelector('.explorer-window');
    if (explorerWindow) { 
        const fileExplorerContent = document.getElementById('file-explorer-content');
        const pathInput = document.querySelector('.path-input');
        const itemCountSpan = document.getElementById('item-count');
        const upBtn = document.querySelector('.up-btn');
        
        const explorerTitleBar = explorerWindow.querySelector('.title-bar');
        const explorerMaximizeBtn = explorerWindow.querySelector('.control-btn.maximize');
        
        let explorerWindowState = { 
            isMaximized: false, 
            originalRect: { width: '', height: '', top: '', left: '', position: '', maxWidth: '', maxHeight: '', boxSizing: '' }
        };

        initializeDraggableWindow(explorerWindow, explorerTitleBar, explorerWindowState);
        const pageHeader = document.querySelector('header');
        const pageHeaderHeight = pageHeader ? pageHeader.offsetHeight : 0;
        initializeMaximizableWindow(explorerWindow, explorerMaximizeBtn, explorerWindowState, pageHeaderHeight);

        function renderContent(path) { 
            if (!(path in fileSystem)) {
                console.error("Percorso non trovato nel file system:", path);
                if (path !== 'Galleria' && 'Galleria' in fileSystem) { 
                    renderContent('Galleria'); 
                } else {
                    if(fileExplorerContent) fileExplorerContent.innerHTML = '<p style="color: red; padding: 20px;">Errore: Impossibile caricare la galleria o percorso base non trovato.</p>';
                    if(itemCountSpan) itemCountSpan.textContent = '0 elementi';
                    if(pathInput) pathInput.value = 'Errore';
                    if(upBtn) upBtn.disabled = true;
                }
                return;
            }

            currentPath = path;
            const content = fileSystem[path]; 
            if(fileExplorerContent) fileExplorerContent.innerHTML = ''; 

            if (!content || content.length === 0) {
                if(fileExplorerContent) fileExplorerContent.innerHTML = '<p style="color: #555; padding: 20px;">Questa cartella è vuota.</p>'; 
            } else {
                content.forEach(item => {
                    const iconDiv = document.createElement('div');
                    iconDiv.className = 'icon';
                    iconDiv.dataset.type = item.type;
                    iconDiv.dataset.name = item.name; 

                    const iconImg = document.createElement('img');
                    const iconSpan = document.createElement('span');
                    iconSpan.textContent = item.name;

                    if (item.type === 'folder') {
                        iconImg.src = folderIconLarge;
                        iconImg.alt = 'Cartella';
                        const folderPath = `${path}/${item.name}`;
                        iconDiv.dataset.path = folderPath; 
                        iconDiv.addEventListener('click', () => {
                            if (folderPath in fileSystem) {
                                renderContent(folderPath)
                            } else {
                                console.error("Tentativo di aprire un percorso inesistente o non definito:", folderPath);
                                if(fileExplorerContent) fileExplorerContent.innerHTML = `<p style="color: orange; padding: 20px;">La cartella "${item.name}" non è stata trovata o è vuota.</p>`;
                            }
                        });
                    } else if (item.type === 'file') {
                        iconImg.src = fileIconLarge; 
                        iconImg.alt = 'File Immagine';
                        iconDiv.dataset.src = item.src; 
                        iconDiv.addEventListener('click', () => openPhotoViewer(item.src, item.name, path));
                    } else {
                        console.warn("Tipo di elemento non riconosciuto:", item);
                        iconImg.src = 'img/icona-sconosciuto.png'; 
                        iconImg.alt = 'Sconosciuto';
                    }

                    iconDiv.appendChild(iconImg);
                    iconDiv.appendChild(iconSpan);
                    if(fileExplorerContent) fileExplorerContent.appendChild(iconDiv);
                });
            }

            if(pathInput) pathInput.value = path.replace(/\//g, ' > '); 
            if(itemCountSpan) itemCountSpan.textContent = `${content ? content.length : 0} elementi`;
            if (upBtn) upBtn.disabled = path === 'Galleria'; 
        }
        
        if (upBtn) {
            upBtn.addEventListener('click', () => {
                if (currentPath === 'Galleria') return;
                const parts = currentPath.split('/');
                parts.pop();
                renderContent(parts.join('/'));
            });
        }
        
        if ('Galleria' in fileSystem) {
            renderContent(currentPath); 
        } else {
            console.error("Il percorso radice 'Galleria' non è definito in fileSystem. Controlla gallery_data.js");
            const feContent = document.getElementById('file-explorer-content');
            if(feContent) feContent.innerHTML = '<p style="color: red; padding: 20px;">Errore: Impossibile trovare la configurazione per la galleria principale.</p>';
            const icSpan = document.getElementById('item-count');
            if(icSpan) icSpan.textContent = '0 elementi';
            const pInput = document.querySelector('.path-input');
            if(pInput) pInput.value = 'Errore di configurazione';
            const uBtn = document.querySelector('.up-btn');
            if(uBtn) uBtn.disabled = true;
        }
    } 

    // --- Gestione Finestra Visualizzatore Foto ---
    const photoViewerModal = document.getElementById('photo-viewer-modal'); 
    if (photoViewerModal) {
        const photoViewerWindowContent = photoViewerModal.querySelector('.modal-content.photo-viewer-window'); 
        const photoArea = photoViewerWindowContent.querySelector('.photo-area'); 
        
        if (!photoViewerWindowContent || !photoArea) {
            console.error("Elementi del visualizzatore foto non trovati!");
            return;
        }

        const modalImage = document.getElementById('modal-image'); 
        const closeModalBtn = photoViewerWindowContent.querySelector('#close-modal-btn'); 
        const prevPhotoBtn = photoViewerWindowContent.querySelector('#prev-photo-btn');
        const nextPhotoBtn = photoViewerWindowContent.querySelector('#next-photo-btn');
        const photoTitle = photoViewerWindowContent.querySelector('#photo-title');

        const photoViewerTitleBar = photoViewerWindowContent.querySelector('.title-bar.photo-title-bar');
        const photoViewerMaximizeBtn = photoViewerWindowContent.querySelector('.control-btn.maximize');

        let photoViewerState = { 
            isMaximized: false, 
            originalRect: { width: '', height: '', top: '', left: '', position: '', maxWidth: '', maxHeight: '', boxSizing: '' },
            scale: 1,
            translateX: 0,
            translateY: 0,
            isPanningImage: false,
            panImageStartX: 0,
            panImageStartY: 0,
            initialPinchDistance: null,
            initialScaleForPinch: 1,
            lastTap: 0, 
            tapTimeout: null 
        };

        initializeDraggableWindow(photoViewerWindowContent, photoViewerTitleBar, photoViewerState);
        initializeMaximizableWindow(photoViewerWindowContent, photoViewerMaximizeBtn, photoViewerState, 0); 

        function applyImageTransform() {
            if (modalImage) {
                modalImage.style.transformOrigin = '0 0'; 
                modalImage.style.transform = `translate(${photoViewerState.translateX}px, ${photoViewerState.translateY}px) scale(${photoViewerState.scale})`;
                modalImage.style.transition = 'none'; 
            }
        }
        
        function resetImageZoomAndPan() {
            photoViewerState.scale = 1;
            photoViewerState.translateX = 0;
            photoViewerState.translateY = 0;
            applyImageTransform();
        }

        function constrainImagePan() {
            if (!modalImage || !photoArea) return;

            const scaledWidth = modalImage.naturalWidth * photoViewerState.scale;
            const scaledHeight = modalImage.naturalHeight * photoViewerState.scale;
            const areaWidth = photoArea.clientWidth;
            const areaHeight = photoArea.clientHeight;

            let minX = areaWidth - scaledWidth;
            let maxX = 0;
            if (scaledWidth <= areaWidth) { 
                minX = (areaWidth - scaledWidth) / 2; 
                maxX = (areaWidth - scaledWidth) / 2;
            }
            
            let minY = areaHeight - scaledHeight;
            let maxY = 0;
            if (scaledHeight <= areaHeight) { 
                minY = (areaHeight - scaledHeight) / 2; 
                maxY = (areaHeight - scaledHeight) / 2;
            }

            photoViewerState.translateX = Math.max(minX, Math.min(photoViewerState.translateX, maxX));
            photoViewerState.translateY = Math.max(minY, Math.min(photoViewerState.translateY, maxY));
        }


        window.openPhotoViewer = function(imageSrc, imageName, folderPath) { 
            if (!fileSystem[folderPath]) {
                console.error("Percorso della cartella non trovato per il visualizzatore foto:", folderPath);
                return;
            }
            currentPhotoList = (fileSystem[folderPath] || [])
                .filter(item => item.type === 'file')
                .map(item => ({ src: item.src, name: item.name }));

            currentPhotoIndex = currentPhotoList.findIndex(photo => photo.src === imageSrc);
            if (currentPhotoIndex === -1 || currentPhotoList.length === 0) {
                console.error("Impossibile trovare l'immagine o la lista è vuota.");
                return; 
            };
            
            resetImageZoomAndPan(); 
            updatePhotoViewer(); 
            photoViewerModal.style.display = 'flex'; 

            requestAnimationFrame(() => { 
                const rect = photoViewerWindowContent.getBoundingClientRect();
                const parentRect = photoViewerModal.getBoundingClientRect(); 

                photoViewerWindowContent.style.position = 'absolute';
                photoViewerWindowContent.style.left = `${rect.left - parentRect.left}px`;
                photoViewerWindowContent.style.top = `${rect.top - parentRect.top}px`;
                if (!photoViewerWindowContent.style.width) {
                    photoViewerWindowContent.style.width = `${rect.width}px`;
                }
                if (!photoViewerWindowContent.style.height) {
                    photoViewerWindowContent.style.height = `${rect.height}px`;
                }
                applyImageTransform(); 
            });
        }

        function updatePhotoViewer() {
            if (currentPhotoList.length === 0 || currentPhotoIndex < 0 || currentPhotoIndex >= currentPhotoList.length) {
                closeModal();
                return;
            }
            const currentPhoto = currentPhotoList[currentPhotoIndex];
            if (modalImage) {
                resetImageZoomAndPan();
                modalImage.src = currentPhoto.src;
                modalImage.alt = currentPhoto.name;
            }
            if (photoTitle) photoTitle.textContent = currentPhoto.name;
            if (prevPhotoBtn) prevPhotoBtn.disabled = currentPhotoIndex === 0;
            if (nextPhotoBtn) nextPhotoBtn.disabled = currentPhotoIndex === currentPhotoList.length - 1;
        }

        function closeModal() {
            photoViewerModal.style.display = 'none'; 
            if (modalImage) modalImage.src = ''; 
            currentPhotoList = [];
            resetImageZoomAndPan(); 
            
            if (photoViewerState.isMaximized && photoViewerMaximizeBtn) {
                 photoViewerMaximizeBtn.click(); 
            }
        }
        
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

        function handleImageMouseMove(e) {
            if (!photoViewerState.isPanningImage) return;
            e.preventDefault();
            photoViewerState.translateX = e.clientX - photoViewerState.panImageStartX;
            photoViewerState.translateY = e.clientY - photoViewerState.panImageStartY;
            constrainImagePan();
            applyImageTransform();
        }

        function handleImageMouseUp() {
            if (photoViewerState.isPanningImage) {
                photoViewerState.isPanningImage = false;
                if(modalImage) modalImage.style.cursor = 'grab';
            }
        }
        document.addEventListener('mousemove', handleImageMouseMove);
        document.addEventListener('mouseup', handleImageMouseUp);


        if (photoArea && modalImage) {
            modalImage.style.cursor = 'grab'; 

            photoArea.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomIntensity = 0.1;
                const minScale = 0.25;
                const maxScale = 4;
                const oldScale = photoViewerState.scale;

                const rect = photoArea.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const imageXBeforeZoom = (mouseX - photoViewerState.translateX) / oldScale;
                const imageYBeforeZoom = (mouseY - photoViewerState.translateY) / oldScale;
                
                if (e.deltaY < 0) { 
                    photoViewerState.scale = Math.min(maxScale, oldScale * (1 + zoomIntensity));
                } else { 
                    photoViewerState.scale = Math.max(minScale, oldScale * (1 - zoomIntensity));
                }

                photoViewerState.translateX = mouseX - (imageXBeforeZoom * photoViewerState.scale);
                photoViewerState.translateY = mouseY - (imageYBeforeZoom * photoViewerState.scale);
                
                constrainImagePan();
                applyImageTransform();
            }, { passive: false });


            modalImage.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return; 
                
                const scaledWidth = modalImage.naturalWidth * photoViewerState.scale;
                const scaledHeight = modalImage.naturalHeight * photoViewerState.scale;
                const areaWidth = photoArea.clientWidth;
                const areaHeight = photoArea.clientHeight;

                if (scaledWidth <= areaWidth && scaledHeight <= areaHeight) {
                    return;
                }
                
                photoViewerState.isPanningImage = true;
                modalImage.style.cursor = 'grabbing';
                photoViewerState.panImageStartX = e.clientX - photoViewerState.translateX;
                photoViewerState.panImageStartY = e.clientY - photoViewerState.translateY;
                e.preventDefault(); 
            });

            let lastTouchX = null;
            let lastTouchY = null;

            photoArea.addEventListener('touchstart', (e) => {
                const scaledWidth = modalImage.naturalWidth * photoViewerState.scale;
                const scaledHeight = modalImage.naturalHeight * photoViewerState.scale;
                const areaWidth = photoArea.clientWidth;
                const areaHeight = photoArea.clientHeight;

                if (e.touches.length === 1 && (scaledWidth > areaWidth || scaledHeight > areaHeight) ) { 
                    photoViewerState.isPanningImage = true;
                    lastTouchX = e.touches[0].clientX;
                    lastTouchY = e.touches[0].clientY;
                } else if (e.touches.length === 2) { 
                    photoViewerState.isPanningImage = false; 
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    photoViewerState.initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
                    photoViewerState.initialScaleForPinch = photoViewerState.scale;

                    const rect = photoArea.getBoundingClientRect();
                    const pinchCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                    const pinchCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
                    photoViewerState.pinchOriginX = (pinchCenterX - photoViewerState.translateX) / photoViewerState.scale;
                    photoViewerState.pinchOriginY = (pinchCenterY - photoViewerState.translateY) / photoViewerState.scale;
                }

                const currentTime = new Date().getTime();
                const tapLength = currentTime - photoViewerState.lastTap;
                clearTimeout(photoViewerState.tapTimeout);
                if (tapLength < 300 && tapLength > 0) { 
                    resetImageZoomAndPan();
                    e.preventDefault(); 
                } else {
                    photoViewerState.tapTimeout = setTimeout(() => {
                        clearTimeout(photoViewerState.tapTimeout);
                    }, 300);
                }
                photoViewerState.lastTap = currentTime;

            }, { passive: false });

            photoArea.addEventListener('touchmove', (e) => {
                e.preventDefault(); 
                if (photoViewerState.isPanningImage && e.touches.length === 1) { 
                    const deltaX = e.touches[0].clientX - lastTouchX;
                    const deltaY = e.touches[0].clientY - lastTouchY;
                    photoViewerState.translateX += deltaX;
                    photoViewerState.translateY += deltaY;
                    lastTouchX = e.touches[0].clientX;
                    lastTouchY = e.touches[0].clientY;
                    constrainImagePan();
                    applyImageTransform();
                } else if (e.touches.length === 2 && photoViewerState.initialPinchDistance != null) { 
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    const currentPinchDistance = Math.sqrt(dx * dx + dy * dy);
                    const scaleMultiplier = currentPinchDistance / photoViewerState.initialPinchDistance;
                    
                    photoViewerState.scale = Math.max(0.25, Math.min(photoViewerState.initialScaleForPinch * scaleMultiplier, 4));

                    const rect = photoArea.getBoundingClientRect();
                    const pinchCenterX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                    const pinchCenterY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

                    photoViewerState.translateX = pinchCenterX - photoViewerState.pinchOriginX * photoViewerState.scale;
                    photoViewerState.translateY = pinchCenterY - photoViewerState.pinchOriginY * photoViewerState.scale;

                    constrainImagePan();
                    applyImageTransform();
                }
            }, { passive: false });

            photoArea.addEventListener('touchend', (e) => {
                if (photoViewerState.isPanningImage && e.touches.length === 0) { 
                    photoViewerState.isPanningImage = false;
                }
                if (e.touches.length < 2) { 
                    photoViewerState.initialPinchDistance = null;
                }
                 if (e.touches.length === 0) { 
                    lastTouchX = null;
                    lastTouchY = null;
                } else if (e.touches.length === 1) { 
                    lastTouchX = e.touches[0].clientX;
                    lastTouchY = e.touches[0].clientY;
                }
            });

            photoArea.addEventListener('dblclick', () => {
                resetImageZoomAndPan();
            });
        }
        
        if (prevPhotoBtn) {
            prevPhotoBtn.addEventListener('click', () => {
                if (!prevPhotoBtn.disabled) { 
                    currentPhotoIndex--;
                    updatePhotoViewer(); 
                }
            });
        }
        if (nextPhotoBtn) {
            nextPhotoBtn.addEventListener('click', () => {
                if (!nextPhotoBtn.disabled) { 
                    currentPhotoIndex++;
                    updatePhotoViewer(); 
                }
            });
        }

        document.addEventListener('keydown', (event) => {
            if (photoViewerModal.style.display === 'flex') { 
                if (event.key === 'ArrowLeft' && prevPhotoBtn && !prevPhotoBtn.disabled) {
                    prevPhotoBtn.click(); 
                } else if (event.key === 'ArrowRight' && nextPhotoBtn && !nextPhotoBtn.disabled) {
                    nextPhotoBtn.click(); 
                } else if (event.key === 'Escape' && closeModalBtn) {
                    closeModalBtn.click(); 
                }
            }
        });
    }
}); 

window.addEventListener("scroll", reveal);
window.addEventListener("scroll", reveal2);