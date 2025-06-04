import os
import shutil
from tkinter import filedialog, Tk
from PIL import Image

def select_folder(title="Seleziona una cartella"):
    """
    Apre una finestra di dialogo per selezionare una cartella.
    """
    root = Tk()
    root.withdraw()  # Nasconde la finestra principale di Tkinter
    root.attributes('-topmost', True) # Mette la finestra di dialogo in primo piano
    folder_path = filedialog.askdirectory(title=title)
    root.destroy()
    return folder_path

def batch_convert_images():
    """
    Funzione principale per la conversione batch delle immagini.
    """
    print("--- Script di Conversione Immagini Batch ---")

    # 1. Seleziona la cartella di input
    input_folder = select_folder("Seleziona la cartella con le immagini da convertire")
    if not input_folder:
        print("Nessuna cartella di input selezionata. Uscita.")
        return
    print(f"Cartella di input: {input_folder}")

    # 2. Seleziona la cartella di output
    output_folder = select_folder("Seleziona la cartella di destinazione per le immagini convertite")
    if not output_folder:
        print("Nessuna cartella di output selezionata. Uscita.")
        return
    print(f"Cartella di output: {output_folder}")

    # Assicurati che la cartella di output esista, altrimenti creala
    if not os.path.exists(output_folder):
        try:
            os.makedirs(output_folder)
            print(f"Cartella di output creata: {output_folder}")
        except Exception as e:
            print(f"Errore durante la creazione della cartella di output: {e}")
            return

    # 3. Scegli il formato di output
    supported_formats = {"jpeg", "jpg", "png", "webp", "gif", "bmp", "tiff", "tif"}
    while True:
        output_format_input = input(f"Inserisci il formato di output desiderato (es. {', '.join(sorted(list(supported_formats)))}): ").lower().strip()
        if output_format_input in supported_formats:
            break
        else:
            print(f"Formato non supportato. Scegli tra: {', '.join(sorted(list(supported_formats)))}")

    # Pillow usa "JPEG" per .jpg
    output_format_pil = "JPEG" if output_format_input in ["jpg", "jpeg"] else output_format_input.upper()
    output_extension = ".jpg" if output_format_input in ["jpg", "jpeg"] else f".{output_format_input}"

    # Impostazioni di qualità (opzionali, ma utili per alcuni formati)
    quality_setting = 90 # Default, usato per JPEG e WebP
    if output_format_pil in ["JPEG", "WEBP"]:
        try:
            user_quality = input(f"Inserisci la qualità per {output_format_pil} (1-100, default 90): ").strip()
            if user_quality:
                quality_setting = int(user_quality)
                if not (1 <= quality_setting <= 100):
                    quality_setting = 90
                    print("Qualità non valida, impostata a 90.")
        except ValueError:
            print("Input qualità non valido, impostata a 90.")
            quality_setting = 90


    # 4. Crea la cartella di backup per i file originali
    backup_folder_name = "original_images_backup"
    backup_folder_path = os.path.join(input_folder, backup_folder_name)
    if not os.path.exists(backup_folder_path):
        try:
            os.makedirs(backup_folder_path)
            print(f"Cartella di backup creata: {backup_folder_path}")
        except Exception as e:
            print(f"Errore durante la creazione della cartella di backup: {e}")
            # Non è fatale, lo script può continuare ma il backup potrebbe fallire

    # 5. Processa le immagini
    processed_originals_for_backup = []
    failed_conversions = []
    skipped_files = []

    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.heic', '.heif')
    print(f"\nInizio elaborazione immagini dalla cartella: {input_folder}")

    for item_name in os.listdir(input_folder):
        item_path = os.path.join(input_folder, item_name)

        # Salta la cartella di backup stessa e altre sottocartelle
        if os.path.isdir(item_path):
            if item_path != backup_folder_path:
                 print(f"Saltata sottocartella: {item_name}")
            skipped_files.append(item_name + " (cartella)")
            continue

        # Controlla se è un file immagine supportato
        if item_name.lower().endswith(image_extensions):
            base_name, _ = os.path.splitext(item_name)
            output_file_name = f"{base_name}{output_extension}"
            output_file_path = os.path.join(output_folder, output_file_name)

            try:
                print(f"Conversione di: {item_name} -> {output_file_name}...")
                img = Image.open(item_path)

                # Gestione della trasparenza per la conversione a formati che non la supportano (es. JPEG)
                if output_format_pil == "JPEG" and img.mode in ('RGBA', 'LA', 'P'):
                    if img.mode == 'P': # Palette mode, converti prima a RGBA
                        img = img.convert("RGBA")
                    
                    # Crea uno sfondo bianco e incolla l'immagine sopra
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    # Usa il canale alfa come maschera se presente
                    if img.mode == 'RGBA':
                         alpha_channel = img.split()[-1]
                         background.paste(img, mask=alpha_channel)
                    else: # Per 'LA' o altri modi con alfa implicita
                         background.paste(img, mask=img.split()[-1]) # Potrebbe necessitare di aggiustamenti
                    img = background
                elif img.mode != 'RGB' and output_format_pil not in ['PNG', 'WEBP', 'GIF', 'TIFF']:
                    # Per altri formati di output che potrebbero preferire RGB
                    img = img.convert('RGB')

                # Salva l'immagine convertita
                save_params = {}
                if output_format_pil == "JPEG":
                    save_params['quality'] = quality_setting
                    save_params['optimize'] = True
                elif output_format_pil == "PNG":
                    save_params['optimize'] = True
                    save_params['compress_level'] = 6 # Buon compromesso tra dimensione e tempo
                elif output_format_pil == "WEBP":
                    save_params['quality'] = quality_setting
                    # save_params['lossless'] = False # Per WebP lossy, puoi renderlo un'opzione
                
                img.save(output_file_path, output_format_pil, **save_params)
                print(f"  Salvato come: {output_file_path}")
                processed_originals_for_backup.append(item_path)

            except Exception as e:
                print(f"  ERRORE durante la conversione di {item_name}: {e}")
                failed_conversions.append(item_name)
        else:
            # print(f"Saltato file non immagine o non supportato: {item_name}")
            if item_name != backup_folder_name: # Non loggare la cartella di backup come file saltato
                skipped_files.append(item_name)


    # 6. Sposta i file originali processati con successo nella cartella di backup
    if processed_originals_for_backup:
        print(f"\nSpostamento dei file originali processati in: {backup_folder_path}")
        for original_file_path in processed_originals_for_backup:
            original_file_name = os.path.basename(original_file_path)
            destination_backup_path = os.path.join(backup_folder_path, original_file_name)
            
            # Controlla se il file esiste ancora nel percorso originale prima di spostarlo
            if os.path.exists(original_file_path):
                try:
                    shutil.move(original_file_path, destination_backup_path)
                    print(f"  Spostato: {original_file_name} -> {backup_folder_name}/")
                except Exception as e:
                    print(f"  ERRORE durante lo spostamento di {original_file_name} in backup: {e}")
            else:
                print(f"  File originale non trovato (forse già spostato o eliminato): {original_file_name}")


    # 7. Riepilogo
    print("\n--- Riepilogo Conversione ---")
    print(f"Immagini originali processate con successo: {len(processed_originals_for_backup)}")
    if failed_conversions:
        print(f"Conversioni fallite: {len(failed_conversions)}")
        for f_file in failed_conversions:
            print(f"  - {f_file}")
    if skipped_files:
        # Filtra la cartella di backup dal conteggio dei file saltati se è stata elencata
        actual_skipped = [f for f in skipped_files if f != backup_folder_name and f != backup_folder_name + " (cartella)"]
        if actual_skipped:
            print(f"File/cartelle saltati (non immagini o non elaborati): {len(actual_skipped)}")
            # for s_file in actual_skipped:
            # print(f"  - {s_file}") # Può essere molto lungo, quindi commentato
    print("-----------------------------")
    print("Conversione batch completata.")

if __name__ == "__main__":
    batch_convert_images()
