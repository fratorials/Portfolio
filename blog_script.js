// --- Configurazione ---
const API_KEY = 'AIzaSyCenU04d2zTKj0dWpORQKisIhG_Hh0X_Hc'; // <<< INCOLLA QUI LA TUA CHIAVE API
const FOLDER_ID = '1PGY65AyNmrHEyP8bHeTbcLl9KaAhj9Xc'; // <<< INCOLLA QUI L'ID DELLA CARTELLA DRIVE
const postsContainer = document.getElementById('blog-posts-container'); // Assicurati che l'ID corrisponda all'HTML

// --- Funzioni Google API ---

// Funzione chiamata quando la libreria GAPI è pronta
function startDriveApi() {
  gapi.client.init({
    'apiKey': API_KEY,
    // Specifica l'API di Drive v3
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  }).then(function () {
    // GAPI inizializzato con successo, ora carica i file
    fetchBlogPosts();
  }).catch(function(error) {
    // Errore durante l'inizializzazione
    console.error('Errore inizializzazione Google API Client:', error);
    displayError('Si è verificato un errore durante il caricamento del client API. Riprova più tardi.');
  });
}

// Funzione per recuperare i file dalla cartella di Drive
function fetchBlogPosts() {
  if (!gapi.client.drive) {
       console.error("L'API di Google Drive non è stata caricata.");
       displayError("Impossibile caricare l'API di Google Drive.");
       return;
   }

  gapi.client.drive.files.list({
    // Query: cerca file DENTRO la cartella specificata, che NON siano nel cestino
    q: `'${FOLDER_ID}' in parents and trashed = false`,
    // Ordina per data di creazione, i più nuovi prima
    orderBy: 'createdTime desc',
    // Campi specifici che vogliamo per ogni file (ottimizza la risposta)
    fields: 'files(id, name, webViewLink, createdTime, mimeType, iconLink)',
    // Quanti file recuperare al massimo (opzionale, max 1000, default 100)
    // pageSize: 20
  }).then(function(response) {
    // Successo! Abbiamo la lista dei file
    const files = response.result.files;
    displayBlogPosts(files); // Chiama la funzione per mostrarli
  }).catch(function(error) {
    // Errore durante la chiamata all'API di Drive
    console.error('Errore nel recuperare i file da Google Drive:', error);
    handleApiError(error); // Gestisce l'errore specifico
  });
}

// --- Funzioni per Visualizzare i Post ---

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
      titleLink.href = file.webViewLink; // Link pubblico al file su Drive
      // Pulisce un po' il nome del file per usarlo come titolo (rimuove estensioni comuni)
      titleLink.textContent = file.name.replace(/\.(pdf|docx?|gdoc)$/i, '').trim();
      titleLink.target = '_blank'; // Apri in una nuova scheda
      titleLink.rel = 'noopener noreferrer'; // Sicurezza per target="_blank"

      const metadata = document.createElement('div');
      metadata.className = 'blog-post-metadata';

      const icon = document.createElement('img');
      icon.src = file.iconLink; // Icona fornita da Google Drive
      icon.alt = `Icona ${file.mimeType}`;
      icon.className = 'file-icon';

      const dateSpan = document.createElement('span');
      dateSpan.className = 'post-date';
      try {
        // Formatta la data in modo leggibile per l'Italia
        const date = new Date(file.createdTime);
        dateSpan.textContent = `Pubblicato il: ${date.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      } catch (e) {
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
    // Nessun file trovato nella cartella
    postsContainer.innerHTML = '<p>Al momento non ci sono post nel blog.</p>';
  }
}

// Funzione per mostrare messaggi di errore nel contenitore
function displayError(message) {
    postsContainer.innerHTML = `<p style="color: red; font-weight: bold;">${message}</p>`;
}

// Funzione per interpretare errori API specifici
function handleApiError(error) {
    let userMessage = 'Errore sconosciuto durante il recupero dei post dal blog.';
    if (error.result && error.result.error) {
        const err = error.result.error;
        userMessage = `Errore API (${err.code}): ${err.message}`;
        if (err.code === 403) {
            userMessage += ' Possibili cause: Chiave API non valida, non correttamente ristretta (referrer HTTP), API Drive non abilitata nel progetto Cloud, o la cartella/file non sono pubblici ("Chiunque con il link").';
        } else if (err.code === 404) {
            userMessage += ' Controlla che l\'ID della cartella Drive sia corretto.';
        }
    }
    displayError(userMessage);
}

