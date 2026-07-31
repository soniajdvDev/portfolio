# 1. Usamos una versión oficial y ligera de Python como base
FROM python:3.12-slim

# 2. Le decimos a Docker en qué carpeta de su "mini-ordenador" vamos a trabajar
WORKDIR /app

# 3. Copiamos el archivo de requisitos de TU ordenador al contenedor
COPY requirements.txt .

# 4. Instalamos las librerías dentro del contenedor
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiamos el resto de tus archivos (main.py) al contenedor
COPY . .

# 6. Exponemos el puerto 8000 para que podamos conectarnos a él
EXPOSE 8000

# 7. El comando final que ejecutará el contenedor al encenderse (igual que hacías tú en la terminal)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
