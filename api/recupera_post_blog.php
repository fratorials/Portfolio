<?php
// Impedisce l'accesso diretto se non necessario e aiuta con CORS
header("Access-Control-Allow-Origin: https://whoisfra.it"); // Sostituisci se il tuo dominio è diverso
header("Content-Type: application/json; charset=UTF-8");

// PERCORSO RELATIVO CORRETTO AL FILE AUTOLOAD DELLA LIBRERIA GOOGLE API
// Assicurati che questo percorso sia giusto dalla posizione di questo script (api/recupera_post_blog.php)
// Potrebbe essere '../libs/google-api-php-client-main/vendor/autoload.php' o simile
require_once __DIR__ . '/../libs/google-api-php-client-main/vendor/autoload.php'; // MODIFICA QUESTO PERCORSO!

// PERCORSO ASSOLUTO AL FILE JSON DEL SERVICE ACCOUNT (salvato fuori da public_html)
$serviceAccountKeyFilePath = '/public_html/.google-keys/ascendant-nova-369608-cc7edb080140.json'; // MODIFICA QUESTO PERCORSO!

// ID DELLA CARTELLA GOOGLE DRIVE DA CUI LEGGERE I FILE
$folderId = '1PGY65AyNmrHEyP8bHeTbcLl9KaAhj9Xc'; // SOSTITUISCI CON IL TUO VERO ID CARTELLA!

// Verifica che il file chiave esista
if (!file_exists($serviceAccountKeyFilePath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore interno del server: File chiave non trovato.']);
    exit;
}

try {
    $client = new Google\Client();
    $client->setAuthConfig($serviceAccountKeyFilePath);
    $client->addScope(Google\Service\Drive::DRIVE_READONLY); // Solo permessi di lettura

    $driveService = new Google\Service\Drive($client);

    $optParams = [
        'pageSize' => 20, // Quanti file recuperare (massimo)
        'fields' => 'files(id, name, webViewLink, createdTime, mimeType, iconLink)',
        'q' => "'" . $folderId . "' in parents and trashed = false", // Cerca file in quella cartella, non cestinati
        'orderBy' => 'createdTime desc' // Ordina per data creazione (più nuovi prima)
    ];
    $results = $driveService->files->listFiles($optParams);

    $files = $results->getFiles();

    // Prepara l'output JSON
    $output = [];
    if (!empty($files)) {
        foreach ($files as $file) {
            // Potremmo voler selezionare solo i campi necessari per il frontend
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

    // Stampa l'output JSON
    echo json_encode($output);

} catch (Exception $e) {
    // Log dell'errore (idealmente non mostrare dettagli all'utente in produzione)
    error_log('Errore API Google Drive: ' . $e->getMessage());

    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Impossibile recuperare i post dal blog. Riprova più tardi.']);
    exit;
}

?>