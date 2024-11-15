import os

# Ruta de la carpeta
ruta_carpeta = 'source/'

# Obtener una lista de archivos en la carpeta
archivos = os.listdir(ruta_carpeta)

# Filtrar solo archivos (excluir carpetas)
archivos = [archivo for archivo in archivos if os.path.isfile(os.path.join(ruta_carpeta, archivo))]

print("Archivos en la carpeta:")
for archivo in archivos:
    print(archivo)
