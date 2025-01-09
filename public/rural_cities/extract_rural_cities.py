import pandas as pd

# Charger le fichier Excel en ne lisant que la colonne A, à partir de la ligne 3
fichier_excel = 'popular_cities_2.xlsx'
data = pd.read_excel(fichier_excel, usecols="A", skiprows=3, header=None)  # Ignore les 5 premières lignes, lit la colonne A

# Extraire les valeurs de la colonne (colonne A) en supprimant les valeurs manquantes et les doublons
valeurs_codegeo = data[0].dropna().tolist() # Accès à la première colonne par son index 0

# Créer le contenu JavaScript sous forme de tableau
contenu_js = f"const codegeo = {valeurs_codegeo}"

# Sauvegarder dans un fichier JavaScript
fichier_js = '../../src/api/popular_cities_2.js'
with open(fichier_js, 'w') as fichier:
    fichier.write(contenu_js)

print(f"Les valeurs de la colonne A (à partir de la ligne 6) ont été extraites dans le fichier {fichier_js}.")
