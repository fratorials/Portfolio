<?php
// NON mostrare errori dettagliati in produzione
ini_set('display_errors', 0); // Impostazione ideale per produzione
error_reporting(0);         // Impostazione ideale per produzione

// Header CORS e Content-Type
header("Access-Control-Allow-Origin: https://whoisfra.it"); // Assicurati sia il tuo dominio
header("Content-Type: application/json; charset=UTF-8");

// Autoload libreria Google
require_once __DIR__ . '/../libs/google-api-php-client-2.18.3/vendor/autoload.php';

// Percorso file chiave - USA QUELLO CORRETTO E SICURO CHE HAI FATTO FUNZIONARE!
// Presumo sia questo l'originale e più sicuro:
$serviceAccountKeyFilePath = '/home/lwwhoisf/google-keys/nova.json';
// Se invece hai fatto funzionare quello semplificato, usa:
// $serviceAccountKeyFilePath = '/home/lwwhoisf/google-keys/nova.json';

// Tentativo di leggere il file chiave
$fileContent = false;
$readError = ''; // Non serve più loggare qui, ma lo teniamo per il messaggio d'errore JSON

try {
    $fileContent = file_get_contents($serviceAccountKeyFilePath);
    if ($fileContent === false) {
        // Errore generico se file_get_contents fallisce senza eccezione
        $readError = 'Impossibile leggere il file chiave dal percorso specificato.';
        error_log('Errore recupera_post_blog.php: ' . $readError . ' Percorso: ' . $serviceAccountKeyFilePath); // Log solo per il server
    }
} catch (Throwable $t) { // Cattura eccezioni gravi
    $readError = 'Eccezione durante la lettura del file chiave.';
    error_log('Errore recupera_post_blog.php: ' . $readError . ' Eccezione: ' . $t->getMessage() . ' Percorso: ' . $serviceAccountKeyFilePath); // Log solo per il server
    $fileContent = false;
}

// Verifica se la lettura è fallita
if ($fileContent === false) {
    http_response_code(500);
    // Restituisci un errore JSON generico all'utente
    echo json_encode([
        'error' => 'Errore interno del server nell\'accesso alla configurazione.',
        // Potresti voler aggiungere un ID errore per riferimento interno, ma non i dettagli del percorso
        // 'details' => $readError // Rimosso per produzione
    ]);
    exit;
}

// ID DELLA CARTELLA GOOGLE DRIVE
$folderId = '1PGY65AyNmrHEyP8bHeTbcLl9KaAhj9Xc'; // Assicurati sia corretto

try {
    $client = new Google\Client();

    // Decodifica il contenuto JSON letto dal file chiave
    $keyData = json_decode($fileContent, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        $jsonErrorMsg = json_last_error_msg();
        error_log("Errore nel decodificare il JSON della chiave letta (" . $serviceAccountKeyFilePath . "): " . $jsonErrorMsg);
        throw new Exception("File chiave corrotto o non JSON."); // Lancia eccezione per il catch sotto
    }
    // Configura l'autenticazione usando l'array decodificato
    $client->setAuthConfig($keyData);

    // Aggiungi lo scope per la lettura da Drive
    $client->addScope(Google\Service\Drive::DRIVE_READONLY);

    // Crea il servizio Drive
    $driveService = new Google\Service\Drive($client);

    // Parametri per la ricerca file
    $optParams = [
        'pageSize' => 20,
        'fields' => 'files(id, name, webViewLink, createdTime, mimeType, iconLink)',
        'q' => "'" . $folderId . "' in parents and trashed = false",
        'orderBy' => 'createdTime desc'
    ];
    // Esegui la richiesta API
    $results = $driveService->files->listFiles($optParams);
    $files = $results->getFiles();

    // Prepara l'output JSON
    $output = [];
    if (!empty($files)) {
        foreach ($files as $file) {
             $output[] = [
                 'id' => $file->getId(),
                 'name' => $file->getName(),
                 'webViewLink' => $file->getWebViewLink(),
                 'createdTime' => $file->getCreatedTime(),
                 'mimeType' => $file->getMimeType(),
                 'iconLink' => $file->getIconLink(),
             ];
        }
    }

    // Stampa l'output JSON di successo
    echo json_encode($output);

} catch (Exception $e) {
    // Log dell'errore API per il server
    error_log('Errore API Google Drive (Exception): ' . $e->getMessage() . ' nel file ' . $e->getFile() . ' alla riga ' . $e->getLine());
    http_response_code(500);
    // Messaggio di errore generico per l'utente
    echo json_encode(['error' => 'Impossibile recuperare i post dal blog (Servizio non disponibile).']);
    exit;
} catch (Throwable $t) {
    // Log dell'errore PHP grave per il server
    error_log('Errore PHP Grave nel blocco API: ' . $t->getMessage() . ' nel file ' . $t->getFile() . ' alla riga ' . $t->getLine());
    http_response_code(500);
     // Messaggio di errore generico per l'utente
    echo json_encode(['error' => 'Errore interno del server imprevisto.']);
    exit;
}

?>