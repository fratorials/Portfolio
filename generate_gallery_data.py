import os
import json
from datetime import datetime

# --- CONFIGURAZIONE ---
# Il percorso è relativo alla root del progetto (dove esegui lo script).
IMAGE_SCAN_ROOT_DIR = 'img/Galleria'

# Il nome logico della cartella radice della tua galleria (usato come chiave in fileSystem)
LOGICAL_GALLERY_ROOT_NAME = 'Galleria'

# Nome del file JavaScript che verrà generato con l'oggetto fileSystem
OUTPUT_DATA_FILE = 'gallery_data.js'

# Estensioni dei file immagine da includere (in minuscolo)
ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']
# --- FINE CONFIGURAZIONE ---

file_system_output = {}

def scan_directory_recursive(physical_dir_path, logical_path_key):
    """
    Scansiona ricorsivamente una directory per costruire la struttura per fileSystem.
    Args:
        physical_dir_path (str): Percorso fisico della directory da scansionare.
        logical_path_key (str): Chiave logica per l'oggetto fileSystem (es. "Galleria/Fotografie").
    """
    items_in_current_dir = []
    entries = []

    try:
        entries = os.listdir(physical_dir_path)
    except OSError as e:
        print(f"Attenzione: Impossibile leggere la directory {physical_dir_path}. Sarà ignorata. Errore: {e}")
        file_system_output[logical_path_key] = [] # Definisci comunque la chiave come vuota
        return

    for entry_name in entries:
        full_entry_physical_path = os.path.join(physical_dir_path, entry_name)

        try:
            if os.path.isdir(full_entry_physical_path):
                # È una sottocartella
                items_in_current_dir.append({'name': entry_name, 'type': 'folder'})
                # Chiave logica per la sottocartella
                next_logical_path_key = f"{logical_path_key}/{entry_name}"
                scan_directory_recursive(full_entry_physical_path, next_logical_path_key)
            elif os.path.isfile(full_entry_physical_path):
                # È un file
                file_extension = os.path.splitext(entry_name)[1].lower()
                if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                    # Costruisci il percorso 'src' relativo alla root del progetto, usando '/'
                    src_path = os.path.join(physical_dir_path, entry_name).replace(os.sep, '/')
                    items_in_current_dir.append({'name': entry_name, 'type': 'file', 'src': src_path})
        except OSError as e:
            print(f"Attenzione: Impossibile accedere a {full_entry_physical_path}. Sarà ignorato. Errore: {e}")
            continue
            
    file_system_output[logical_path_key] = items_in_current_dir

def main():
    """
    Funzione principale dello script.
    """
    print(f"Inizio scansione della directory base delle immagini: {IMAGE_SCAN_ROOT_DIR}")

    # Converte il percorso base in un percorso assoluto per maggiore robustezza
    # e poi lo normalizza per gestire correttamente i separatori di percorso
    top_level_physical_scan_path = os.path.normpath(os.path.abspath(IMAGE_SCAN_ROOT_DIR))
    
    top_level_items_for_gallery_root = []
    initial_root_entries = []

    if not os.path.exists(top_level_physical_scan_path):
        print(f"ERRORE CRITICO: La directory base {IMAGE_SCAN_ROOT_DIR} (risolta in {top_level_physical_scan_path}) non esiste.")
        print("Assicurati che la directory specificata in IMAGE_SCAN_ROOT_DIR esista.")
        return # Esce se la directory base non è accessibile

    try:
        initial_root_entries = os.listdir(top_level_physical_scan_path)
    except OSError as e:
        print(f"ERRORE CRITICO: Impossibile leggere la directory base delle immagini: {top_level_physical_scan_path}")
        print(f"Errore: {e}")
        print("Assicurati che lo script abbia i permessi per leggerla.")
        return

    for entry_name in initial_root_entries:
        full_entry_physical_path = os.path.join(top_level_physical_scan_path, entry_name)
        
        try:
            if os.path.isdir(full_entry_physical_path):
                # Questa è una sottocartella direttamente sotto IMAGE_SCAN_ROOT_DIR
                # (es. 'grafica', 'foto' se IMAGE_SCAN_ROOT_DIR è 'img/galleria')
                top_level_items_for_gallery_root.append({'name': entry_name, 'type': 'folder'})
                # La chiave logica per questa sottocartella
                logical_path_key_for_subfolder = f"{LOGICAL_GALLERY_ROOT_NAME}/{entry_name}"
                # Scansiona ricorsivamente questa sottocartella
                scan_directory_recursive(full_entry_physical_path, logical_path_key_for_subfolder)
            elif os.path.isfile(full_entry_physical_path):
                # File direttamente sotto IMAGE_SCAN_ROOT_DIR
                file_extension = os.path.splitext(entry_name)[1].lower()
                if file_extension in ALLOWED_IMAGE_EXTENSIONS:
                    # Usa IMAGE_SCAN_ROOT_DIR per il path relativo corretto per 'src'
                    src_path = os.path.join(IMAGE_SCAN_ROOT_DIR, entry_name).replace(os.sep, '/')
                    top_level_items_for_gallery_root.append({'name': entry_name, 'type': 'file', 'src': src_path})
        except OSError as e:
            print(f"Attenzione: Impossibile accedere a {full_entry_physical_path} nella root. Sarà ignorato. Errore: {e}")
            continue

    # Aggiungi l'array di primo livello all'oggetto file_system_output
    file_system_output[LOGICAL_GALLERY_ROOT_NAME] = top_level_items_for_gallery_root

    # Genera il contenuto per il file di output
    # Usiamo json.dumps per una formattazione leggibile, che è molto simile alla sintassi degli oggetti JS.
    # Nota: JSON non supporta commenti, quindi li aggiungiamo come stringhe.
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    output_content = (
        f"// File generato automaticamente da generate_gallery_data.py il {timestamp}\n"
        f"// Non modificare manualmente questo file se intendi rigenerarlo con lo script.\n"
        f"const fileSystem = {json.dumps(file_system_output, indent=4, ensure_ascii=False)};\n"
    )

    try:
        with open(OUTPUT_DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(output_content)
        print(f"\nFile '{OUTPUT_DATA_FILE}' generato con successo!")
        print("--------------------------------------------------------------------")
        print("ISTRUZIONI IMPORTANTI:")
        print(f"1. Assicurati di includere '{OUTPUT_DATA_FILE}' nel tuo HTML PRIMA del tuo script principale della galleria:")
        print(f"   <script src=\"{OUTPUT_DATA_FILE}\"></script>")
        print("\n2. NOMI DELLE CARTELLE:")
        print("   I nomi visualizzati per le cartelle nella galleria (es. 'Fotografie', 'Progetti Grafici')")
        print("   corrispondono ai nomi effettivi delle directory fisiche scansionate (es. 'foto', 'grafica').")
        print("   Se desideri nomi visualizzati diversi dai nomi delle directory fisiche:")
        print("     a) L'opzione più semplice è RINOMINARE le tue cartelle fisiche per farle corrispondere ai nomi desiderati.")
        print("        (es. rinomina la cartella 'foto' in 'Fotografie'). Lo script le rileverà automaticamente.")
        print(f"     b) Oppure, puoi modificare manualmente il file '{OUTPUT_DATA_FILE}' DOPO la generazione,")
        print("        ma ricorda che queste modifiche manuali verranno SOVRASCRITTE la prossima volta che esegui lo script.")
        print("     c) Per una soluzione più avanzata, potresti modificare questo script per includere una mappa")
        print("        dei nomi fisici ai nomi logici desiderati.")
        print("--------------------------------------------------------------------")

    except IOError as e:
        print(f"\nERRORE CRITICO: Impossibile scrivere il file di output '{OUTPUT_DATA_FILE}'.")
        print(f"Errore: {e}")

if __name__ == '__main__':
    main()
