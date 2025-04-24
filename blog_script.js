// blog_script.js - Modificato per usare il Proxy PHP

// NOTA: Le variabili API_KEY e FOLDER_ID sono state rimosse.
// NOTA: La libreria Google API Client (gapi) non viene più caricata o inizializzata qui.

const postsContainer = document.getElementById('blog-posts-container'); // Assicurati che l'ID corrisponda all'HTML

// --- Funzione per recuperare i file chiamando il nostro backend PHP ---
function fetchBlogPosts() {
    const phpProxyUrl = '/api/recupera_post_blog.php'; // URL del nostro script PHP

    if (!postsContainer) {
        console.error("Elemento contenitore blog non trovato.");
        return;
    }

    postsContainer.innerHTML = '<p style="color: #ccc;">Caricamento post del blog...</p>'; // Messaggio di caricamento

    fetch(phpProxyUrl)
        .then(response => {
            if (!response.ok) {
                // Se la risposta HTTP non è OK (es. errore 500 dal PHP)
                // Prova a leggere un eventuale messaggio di errore JSON dal backend
                return response.json().then(errData => {
                    throw new Error(`Errore HTTP ${response.status}: ${errData.error || response.statusText}`);
                }).catch(() => {
                    // Se non c'è corpo JSON o non è valido, usa l'errore di status
                     throw new Error(`Errore HTTP ${response.status}: ${response.statusText}`);
                });
            }
            return response.json(); // Converte la risposta in JSON
        })
        .then(files => {
            // Successo! Abbiamo l'array di file dal PHP
            // files qui dovrebbe avere la struttura che il PHP invia
            // es: [{id: '...', name: '...', webViewLink: '...', ...}]
            displayBlogPosts(files); // Chiama la funzione esistente per mostrarli
        })
        .catch(error => {
            // Errore durante la fetch o nella risposta JSON
            console.error('Errore nel recuperare i post tramite proxy PHP:', error);
            // Mostra un messaggio di errore all'utente
            displayError(`Si è verificato un errore (${error.message}). Impossibile caricare i post.`);
        });
}

// --- Funzioni per Visualizzare i Post (mantenute dall'originale) ---

// Funzione per mostrare i post nel contenitore HTML
function displayBlogPosts(files) {
  // Svuota il contenitore prima di aggiungere i nuovi post
  postsContainer.innerHTML = '';

  if (files && files.length > 0) {
    files.forEach(file => {
      // Crea gli elementi HTML per ciascun file
      const postItem = document.createElement('div');
      postItem.className = 'blog-post-item'; // Per lo stile CSS

      const titleLink = document.createElement('a');
      // Usa webViewLink fornito dal backend PHP
      titleLink.href = file.webViewLink;
      // Pulisce un po' il nome del file per usarlo come titolo (rimuove estensioni comuni)
      titleLink.textContent = file.name.replace(/\.(pdf|docx?|gdoc)$/i, '').trim();
      titleLink.target = '_blank'; // Apri in una nuova scheda
      titleLink.rel = 'noopener noreferrer'; // Sicurezza per target="_blank"

      const metadata = document.createElement('div');
      metadata.className = 'blog-post-metadata'; //

      const icon = document.createElement('img');
      // Usa iconLink fornito dal backend PHP
      icon.src = file.iconLink;
      icon.alt = `Icona ${file.mimeType}`;
      icon.className = 'file-icon'; //

      const dateSpan = document.createElement('span');
      dateSpan.className = 'post-date'; //
      try {
        // Formatta la data (createdTime) fornita dal backend PHP
        const date = new Date(file.createdTime);
        dateSpan.textContent = `Pubblicato il: ${date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      } catch (e) {
        console.warn("Formato data non valido per il file:", file.name, e);
        dateSpan.textContent = 'Data non disponibile';
      }

      metadata.appendChild(icon);
      metadata.appendChild(dateSpan);

      postItem.appendChild(titleLink);
      postItem.appendChild(metadata);

      // Aggiunge l'elemento del post al contenitore principale
      postsContainer.appendChild(postItem);
    });
  } else {
    // Nessun file trovato nella cartella o restituito dal PHP
    postsContainer.innerHTML = '<p>Al momento non ci sono post nel blog.</p>';
  }
}

// Funzione per mostrare messaggi di errore nel contenitore (mantenuta dall'originale)
function displayError(message) {
    if (postsContainer) {
        postsContainer.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
    } else {
        console.error("Impossibile mostrare l'errore, contenitore non trovato:", message);
    }
}

// --- Esecuzione all'avvio ---
// Chiama la funzione per caricare i post quando il DOM è pronto
document.addEventListener('DOMContentLoaded', fetchBlogPosts);